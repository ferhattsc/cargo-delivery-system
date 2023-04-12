package com.ferhat.shipmentapi.controller;

import com.ferhat.shipmentapi.dto.UserChangePasswordRequestDTO;
import com.ferhat.shipmentapi.dto.UserCreateRequestDTO;
import com.ferhat.shipmentapi.dto.UserLoginRequestDTO;
import com.ferhat.shipmentapi.model.User;
import com.ferhat.shipmentapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

  private final UserService userService;

  @PostMapping
  public ResponseEntity<User> create(@RequestBody UserCreateRequestDTO request) {
    return ResponseEntity.ok(userService.create(request));
  }

  @PostMapping("login")
  public ResponseEntity<Boolean> login(@RequestBody UserLoginRequestDTO request) {
    return ResponseEntity.ok(userService.login(request));
  }

  @PostMapping("change-password")
  public ResponseEntity<User> changePassword(@RequestBody UserChangePasswordRequestDTO requestDTO) {
    return ResponseEntity.ok(userService.changePassword(requestDTO));
  }
}
