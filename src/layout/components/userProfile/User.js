import React, { useState } from "react";
import { getAuth, removeAccessToken, removeAuth } from "@/utils/localStorage";
import "./user.scss";
import { useNavigate } from "react-router-dom";
const User = () => {
  const [isHover, setIsHover] = useState(false);
  const auth = JSON.parse(getAuth());
  const navigate = useNavigate()
  const handleLogOut = () => {
    removeAccessToken()
    removeAuth()
    navigate("login")
  }

  const handleLogin = () => {
    navigate("login")
  }
  return (
    <>
      {auth ? (
        <div className="d-flex align-items-center">
          <div>
            <span>{auth.name}</span>
          </div>
          <div className="user" onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <span className="user-icon">
              <i
                className="bi bi-person-fill mx-3 user-icon"
                style={{ transform: "translateY(2px)", display: "block" }}
              ></i>
            </span>
            {isHover && (
              <div className="user-dropdown">
                <div className="mb-2 mt-1 px-2 option">Đơn mua</div>
                <div className="mb-1 px-2 option" onClick={() => handleLogOut()}>Đăng xuất</div>
              </div>
            )}
          </div>
        </div>
      ) : (<div className="fw-bold login" onClick={() => handleLogin()}>
        Đăng nhập
      </div>)}
    </>
  );
};

export default User;
