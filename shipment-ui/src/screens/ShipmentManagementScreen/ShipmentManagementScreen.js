import axios from "axios";
import L, { Icon } from "leaflet";
import "leaflet-routing-machine";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Exit from "../../components/Exit/Exit";
import { ENDPOINT } from "../../utils/constants";
import "./ShipmentManagementScreen.css";

const courier = new Icon({
  iconUrl: "/courier.svg",
  iconSize: [35, 35],
});

function RouteController(props) {
  const { waypoints } = props;
  const map = useMap();
  L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: true,
  }).addTo(map);
  return null;
}

function CourierController(props) {
  const { position, setPosition } = props;
  useMapEvents({
    click({ latlng }) {
      const { lat, lng } = latlng;
      setPosition([lat, lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={courier}></Marker>
  );
}

export default function ShipmentManagementScreen() {
  const [mapCenter] = useState([40.996793, 29.053974]);
  const [records, setRecords] = useState([]);
  const [route, setRoute] = useState([]);
  const [courierPosition, setCourierPosition] = useState(null);

  const onClickFindRoute = () => {
    axios
      .post(ENDPOINT + "/shipment/shortest-path", {
        lat: courierPosition[0],
        lng: courierPosition[1],
      })
      .then(({ data }) => {
        const wayPoints = data.map((point) => L.latLng(point.lat, point.lng));
        setRoute(wayPoints);
      });
  };

  const shipmentMarkers = records.map((shipment) => (
    <Marker key={shipment.id} position={[shipment.x, shipment.y]}></Marker>
  ));

  useEffect(() => {
    console.log("useeffect");
    axios.get(ENDPOINT + "/shipment").then((response) => {
      setRecords(response.data);
    });
  }, []);

  return (
    <div className="shipment-management-screen">
      <div className="shipment-management-screen-card">
        <div className="shipment-management-screen-card-map">
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
            {shipmentMarkers}
            <CourierController
              position={courierPosition}
              setPosition={setCourierPosition}
            />
            <RouteController waypoints={route} />
          </MapContainer>
        </div>
        <div className="shipment-management-screen-card-shipment">
          <button onClick={onClickFindRoute}>Rotayı Bul</button>
          <Exit></Exit>
        </div>
      </div>
    </div>
  );
}
