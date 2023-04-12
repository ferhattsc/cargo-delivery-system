import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import Exit from "../Exit/Exit";
import "./ShipmentRecordMap.css";

function LocationMarker({ setLocationLatLng }) {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click({ latlng }) {
      const { lat, lng } = latlng;
      setLocationLatLng(lat, lng);
      setPosition([lat, lng]);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

export default function ShipmentRecordMap(props) {
  const [mapCenter] = useState([40.996793, 29.053974]);
  const { setLocationLatLng } = props;
  return (
    <div className="shipment-record-map">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setLocationLatLng={setLocationLatLng} />
      </MapContainer>
      <Exit></Exit>
    </div>
  );
}
