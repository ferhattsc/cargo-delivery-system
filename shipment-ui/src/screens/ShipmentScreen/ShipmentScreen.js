import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Cookies from "universal-cookie";
import ShipmentRecordMap from "../../components/ShipmentRecordMap/ShipmentRecordMap";
import { ENDPOINT } from "../../utils/constants";
import "./ShipmentScreen.css";

export default function ShipmentScreen() {
  const cookies = new Cookies();
  const username = cookies.get("login-cookie");

  const [address, setAddress] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [status, setStatus] = useState("");
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    axios.get(ENDPOINT + "/shipment/" + username).then((res) => {
      if (res.status === 200) {
        let responseShipments = [];
        for (let data of res.data) {
          responseShipments.push({
            id: data.id,
            address: data.address,
            x: data.x,
            y: data.y,
            status: data.status,
          });
        }
        setShipments(responseShipments);
      }
    });
  }, [username]);

  const remove = (event) => {
    const id = event.target.id;
    axios.delete(ENDPOINT + "/shipment/" + id).then((res) => {
      console.log(res);
      if (res.status === 204) {
        window.location.reload();
      }
    });
  };

  const addRecord = () => {
    axios
      .post(ENDPOINT + "/shipment", {
        username,
        address,
        x,
        y,
        status,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  };

  const shipmentRows = shipments.map((shipment) => (
    <tr key={shipment.id} className="shipment-row">
      <td>{shipment.id}</td>
      <td>{shipment.address}</td>
      <td>{shipment.x}</td>
      <td>{shipment.y}</td>
      <td>{shipment.status}</td>
      <td>
        <div className="operations">
          <Button id={shipment.id} variant="light" onClick={remove}>
            Sil
          </Button>
        </div>
      </td>
    </tr>
  ));

  const setLocation = useCallback((lat, lng) => {
    setX(lat);
    setY(lng);
  }, []);

  return (
    <div className="shipment-screen">
      <div className="shipment-screen-card">
        <div className="shipment-screen-card-records">
          <div className="shipment-screen-card-records-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Adres</th>
                  <th>X Kordinatı</th>
                  <th>Y Kordinatı</th>
                  <th>Durum</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {shipmentRows}
                <tr>
                  <td></td>
                  <td>
                    <input
                      className="transparent-input"
                      type="text"
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="transparent-input"
                      type="text"
                      value={x}
                      onChange={(event) => setX(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="transparent-input"
                      type="text"
                      value={y}
                      onChange={(event) => setY(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="transparent-input"
                      type="text"
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                    />
                  </td>
                  <td>
                    <div className="operations">
                      <Button variant="light" onClick={addRecord}>
                        Ekle
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <ShipmentRecordMap setLocationLatLng={setLocation} />
      </div>
    </div>
  );
}
