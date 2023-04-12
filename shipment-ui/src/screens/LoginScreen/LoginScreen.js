import axios from "axios";
import React, { useState } from "react";
import { RiKeyFill, RiUser3Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { ENDPOINT } from "../../utils/constants";
import "./LoginScreen.css";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const routeRegister = () => history.push("/register");
  const routeChangePassword = () => history.push("/change-password");
  const routeHomepage = () => history.push("/");
  const routeShipmentManagement = () => history.push("/shipment-management");

  const notifyError = () =>
    toast.error("Giriş esnasında bir hata meydana geldi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const login = () => {
    const cookies = new Cookies();

    axios
      .post(ENDPOINT + "/user/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data) {
          cookies.set("login-cookie", username, { path: "/" });
          routeHomepage();
        } else {
          notifyError();
        }
      });
  };

  return (
    <div className="login-screen">
      <div className="login-screen-card">
        <div className="welcome-text">
          <span>Hoş Geldiniz</span>
        </div>
        <CustomInput
          onChange={setUsername}
          icon={<RiUser3Fill color="white" />}
          placeholder="Kullanıcı Adı"
        />
        <CustomInput
          onChange={setPassword}
          icon={<RiKeyFill color="white" />}
          placeholder="Şifre"
        />
        <div className="register-changepassword">
          <span onClick={routeRegister}>Kayıt Ol</span>
          <span onClick={routeChangePassword}>Şifre Değiştir</span>
          <span onClick={routeShipmentManagement}>Kargo Yönetimi</span>
        </div>
        <CustomButton onClick={login} text="Giriş" />
      </div>
      <ToastContainer />
    </div>
  );
}
