package com.ferhat.shipmentapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentCreateRequestDTO {

  private String username;

  @NotEmpty(message = "Adres boş olamaz")
  private String address;

  @NotNull(message = "X kordinatı boş olamaz")
  private Double x;

  @NotNull(message = "Y kordinatı boş olamaz")
  private Double y;

  private String status;

}
