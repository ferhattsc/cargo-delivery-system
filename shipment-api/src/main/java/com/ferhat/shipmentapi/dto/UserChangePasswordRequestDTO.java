package com.ferhat.shipmentapi.dto;

import lombok.Data;

@Data
public class UserChangePasswordRequestDTO {
  private String username;
  private String password;
  private String newPassword;
}
