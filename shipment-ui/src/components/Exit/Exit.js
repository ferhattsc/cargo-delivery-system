import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import CustomButton from "../CustomButton/CustomButton";
import "./Exit.css";

export default function Exit() {
  const history = useHistory();
  const cookies = new Cookies();

  const onClick = () => {
    cookies.remove("login-cookie");
    history.push("/login");
  };

  return (
    <div className="exit">
      <CustomButton text="Çıkış" onClick={onClick}></CustomButton>
    </div>
  );
}
