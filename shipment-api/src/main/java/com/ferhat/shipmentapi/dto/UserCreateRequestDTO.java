package com.ferhat.shipmentapi.dto;

import lombok.Data;

@Data
public class UserCreateRequestDTO {
    private String username;
    private String password;
}
