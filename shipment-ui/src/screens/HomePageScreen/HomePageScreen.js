import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import ShipmentScreen from "../ShipmentScreen/ShipmentScreen";
import "./HomePageScreen.css";

export default function HomePageScreen() {
  const cookies = new Cookies();
  const history = useHistory();
  const routeLogin = () => history.push("/login");

  const isLoggedIn = () => {
    return !!cookies.get("login-cookie");
  };

  if (!isLoggedIn()) {
    routeLogin();
  }

  return <ShipmentScreen />;
}
