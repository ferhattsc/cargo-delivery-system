import axios from "axios";
import React, { useState } from "react";
import { RiKeyFill, RiUser3Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { ENDPOINT } from "../../utils/constants";
import "./ChangePasswordScreen.css";

export default function ChangePasswordScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const history = useHistory();
  const routeHomepage = () => history.push("/");
  const notifyError = () =>
    toast.error("Şifre değiştirme esnasında bir hata meydana geldi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const register = () => {
    const cookies = new Cookies();
    axios
      .post(ENDPOINT + "/user/change-password", {
        username,
        password,
        newPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          cookies.set("login-cookie", username, { path: "/" });
          routeHomepage();
        }
      })
      .catch(() => {
        notifyError();
      });
  };

  return (
    <div className="register-screen">
      <div className="register-screen-card">
        <div className="welcome-text">
          <span>Şifre Değiştir</span>
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
        <CustomInput
          onChange={setNewPassword}
          icon={<RiKeyFill color="white" />}
          placeholder="Yeni Şifre"
        />
        <CustomButton onClick={register} text="Şifre Değiştir" />
      </div>
      <ToastContainer />
    </div>
  );
}
