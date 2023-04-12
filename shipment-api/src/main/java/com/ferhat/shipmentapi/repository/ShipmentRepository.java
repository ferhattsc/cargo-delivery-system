package com.ferhat.shipmentapi.repository;

import com.ferhat.shipmentapi.model.Shipment;
import com.ferhat.shipmentapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
  List<Shipment> findByUser(User user);

  List<Shipment> findByIdIn(List<Long> ids);
}
