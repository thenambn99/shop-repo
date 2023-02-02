import React from "react";
import Img4 from "@/assets/imgs/slide-04.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.scss"
import LoginPage from "../components/LoginPage/LoginPage";
import Register from "../components/Register/Register";
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const goToSignIn = () => {
    navigate("/login")
  }
  const goToSignUp = () => {
    navigate("/register")
  } 
  return (
    <div className="position-relative">
      <div>
        <img src={Img4} alt="" style={{ width: "100%" }} />
      </div>
      <div
        className="row position-absolute tab"
        style={{ top: "40px", right: "100px", backgroundColor: "#fff" }}
      >
        <div className="col-lg-6 col-md-6 col-sm-12 mt-2" onClick={() => goToSignIn()}>
          <div
            className={
              location.pathname === "/login" ? "login-tab-active" : "login-tab"
            }
          >
            Đăng nhập
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-2" onClick={() => goToSignUp()}>
          <div
            className={
              location.pathname === "/register"
                ? "login-tab-active"
                : "login-tab"
            }
          >
            Đăng ký
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          {location.pathname === "/login" ? <LoginPage></LoginPage> : <Register></Register>}
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Login;
