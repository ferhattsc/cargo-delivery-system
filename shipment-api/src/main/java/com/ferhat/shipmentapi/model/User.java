package com.ferhat.shipmentapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "shipment_user")
public class User {

  @Id
  @GeneratedValue
  @Column(name = "MüsteriID")
  private Long id;

  @Column(name = "MüsteriAdi")
  private String username;

  @Column(name = "password")
  private String password;

  @OneToMany(mappedBy = "user")
  private List<Shipment> shipments;
}
