package com.ferhat.shipmentapi.controller;

import com.ferhat.shipmentapi.dto.ShipmentCreateRequestDTO;
import com.ferhat.shipmentapi.dto.ShortestPathRequest;
import com.ferhat.shipmentapi.model.LatLng;
import com.ferhat.shipmentapi.model.Shipment;
import com.ferhat.shipmentapi.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("shipment")
@RequiredArgsConstructor
@CrossOrigin
public class ShipmentController {

  private final ShipmentService shipmentService;

  @PostMapping
  public ResponseEntity<Shipment> create(@Valid @RequestBody ShipmentCreateRequestDTO request) {
    return ResponseEntity.ok(shipmentService.create(request));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
    shipmentService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("{username}")
  public ResponseEntity<List<Shipment>> get(@PathVariable("username") String username) {
    List<Shipment> shipments = shipmentService.findByUser(username);
    return ResponseEntity.ok(shipments);
  }

  @GetMapping
  public ResponseEntity<List<Shipment>> getAll() {
    List<Shipment> shipments = shipmentService.findAll();
    return ResponseEntity.ok(shipments);
  }

  @PostMapping("shortest-path")
  public ResponseEntity<List<LatLng>> enKısaYol(@RequestBody ShortestPathRequest request) {
    List<LatLng> route = shipmentService.findShortestPath(request);
    return ResponseEntity.ok(route);
  }
}
