package com.ferhat.shipmentapi.dijkstra;

public class Vertex {
  private final String id;
  private final String name;
  private final Double lat;
  private final Double lng;

  public Vertex(String id, String name, Double lat, Double lng) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public Double getLat() {
    return lat;
  }

  public Double getLng() {
    return lng;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Vertex other = (Vertex) obj;
    if (id == null) {
      if (other.id != null) return false;
    } else if (!id.equals(other.id)) return false;
    return true;
  }

  @Override
  public String toString() {
    return name;
  }
}
