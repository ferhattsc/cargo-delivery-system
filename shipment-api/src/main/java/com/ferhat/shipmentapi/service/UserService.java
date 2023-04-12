package com.ferhat.shipmentapi.service;

import com.ferhat.shipmentapi.dto.UserChangePasswordRequestDTO;
import com.ferhat.shipmentapi.dto.UserCreateRequestDTO;
import com.ferhat.shipmentapi.dto.UserLoginRequestDTO;
import com.ferhat.shipmentapi.model.User;
import com.ferhat.shipmentapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public Boolean login(UserLoginRequestDTO request) {
    User user =
        userRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Kullanıcı adı veya şifre hatalı"));
    return request.getPassword().equalsIgnoreCase(user.getPassword());
  }

  public User changePassword(UserChangePasswordRequestDTO request) {
    Objects.requireNonNull(request.getNewPassword(), "Yeni şifre boş olamaz");
    User user =
        userRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    if (!request.getPassword().equalsIgnoreCase(user.getPassword())) {
      throw new RuntimeException("Hatalı şifre girdiniz");
    }
    user.setPassword(request.getNewPassword());
    return userRepository.save(user);
  }

  public User create(UserCreateRequestDTO request) {
    Objects.requireNonNull(request.getUsername(), "Kullanıcı adı boş olamaz");
    Objects.requireNonNull(request.getPassword(), "Şifre boş olamaz");

    Optional<User> alreadyCreatedUser = userRepository.findByUsername(request.getUsername());
    if (alreadyCreatedUser.isPresent()) {
      throw new RuntimeException("Kullanıcı mevcut");
    }

    User newUser =
        User.builder().username(request.getUsername()).password(request.getPassword()).build();
    return userRepository.save(newUser);
  }
}
