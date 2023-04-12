package com.ferhat.shipmentapi.service;

import com.ferhat.shipmentapi.dijkstra.DijkstraAlgorithm;
import com.ferhat.shipmentapi.dijkstra.Edge;
import com.ferhat.shipmentapi.dijkstra.Graph;
import com.ferhat.shipmentapi.dijkstra.Vertex;
import com.ferhat.shipmentapi.dto.ShipmentCreateRequestDTO;
import com.ferhat.shipmentapi.dto.ShortestPathRequest;
import com.ferhat.shipmentapi.model.LatLng;
import com.ferhat.shipmentapi.model.Shipment;
import com.ferhat.shipmentapi.model.User;
import com.ferhat.shipmentapi.repository.ShipmentRepository;
import com.ferhat.shipmentapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShipmentService {

  private final UserRepository userRepository;
  private final ShipmentRepository shipmentRepository;

  public Shipment create(ShipmentCreateRequestDTO request) {
    User user =
        userRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    Shipment shipment = new Shipment();
    shipment.setUser(user);
    shipment.setAddress(request.getAddress());
    shipment.setX(request.getX());
    shipment.setY(request.getY());
    shipment.setStatus(request.getStatus());
    return shipmentRepository.save(shipment);
  }

  public void delete(Long id) {
    shipmentRepository.deleteById(id);
  }

  public List<Shipment> findByUser(String username) {
    User user =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    return shipmentRepository.findByUser(user);
  }

  public List<Shipment> findAll() {
    return shipmentRepository.findAll();
  }

  public List<LatLng> findShortestPath(ShortestPathRequest request) {
    List<Shipment> shipments = shipmentRepository.findAll();
    List<Vertex> nodes = new ArrayList<>();
    List<Edge> edges = new ArrayList<>();

    for (Shipment shipment : shipments) {
      Vertex location =
          new Vertex(
              shipment.getId().toString(),
              shipment.getId().toString(),
              shipment.getX(),
              shipment.getY());
      nodes.add(location);
    }
    for (Vertex node : nodes) {
      for (Vertex innerNode : nodes) {
        if (!node.getId().equals(innerNode.getId())) {
          String laneId = "edge_" + node.getId() + "_" + innerNode.getId();
          addLane(edges, laneId, node, innerNode);
        }
      }
    }

    Vertex kurye = new Vertex("kurye", "kurye", request.getLat(), request.getLng());
    nodes.add(kurye);
    for (Vertex node : nodes) {
      if (!node.getId().equals(kurye.getId())) {
        String laneId = "edge_kurye_" + node.getId();
        addLane(edges, laneId, kurye, node);
      }
    }

    Graph graph = new Graph(nodes, edges);
    DijkstraAlgorithm dijkstra = new DijkstraAlgorithm(graph);
    dijkstra.execute(kurye);
    Vertex destination = getLongDistanceNode(kurye, nodes);
    LinkedList<Vertex> path = dijkstra.getPath(destination);

    List<LatLng> result =
        path.stream()
            .map(vertex -> new LatLng(vertex.getLat(), vertex.getLng()))
            .collect(Collectors.toList());
    result.add(new LatLng(destination.getLat(), destination.getLng()));
    return result;
  }

  private void addLane(List<Edge> edges, String laneId, Vertex source, Vertex dest) {
    Edge lane = new Edge(laneId, source, dest, getDistanceFromLatLonInKm(source, dest));
    edges.add(lane);
  }

  private int getDistanceFromLatLonInKm(Vertex v1, Vertex v2) {
    int R = 6371; // Radius of the earth in km
    double dLat = deg2rad(v2.getLat() - v1.getLat()); // deg2rad below
    double dLon = deg2rad(v2.getLng() - v1.getLng());
    double a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(v1.getLat()))
                * Math.cos(deg2rad(v2.getLat()))
                * Math.sin(dLon / 2)
                * Math.sin(dLon / 2);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    double d = R * c; // Distance in km
    return (int) (d * 1000);
  }

  private Double deg2rad(Double deg) {
    return deg * (Math.PI / 180);
  }

  private Vertex getLongDistanceNode(Vertex source, List<Vertex> nodes) {
    int distance = 0;
    Vertex result = source;
    for (Vertex node : nodes) {
      if (!source.equals(node)) {
        int calculatedDistance = getDistanceFromLatLonInKm(source, node);
        if (calculatedDistance > distance) {
          distance = calculatedDistance;
          result = node;
        }
      }
    }
    return result;
  }
}
