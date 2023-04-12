package com.ferhat.shipmentapi.dto;

import lombok.Data;

@Data
public class UserLoginRequestDTO {
  private String username;
  private String password;
}
