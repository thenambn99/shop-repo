import React from "react";
import shopIcon from "@/assets/imgs/shop-icon.png";
import { Link, NavLink } from "react-router-dom";
import Cart from "./cartHeader/Cart";
import User from "./userProfile/User";

const headerMenu = [
  {
    path: "/",
    name: "Trang chủ",
  },
  {
    path: "/products",
    name: "Sản phẩm",
  },
  // {
  //   path: "/shopping-cart",
  //   name: "Đơn hàng"
  // },
  {
    path: "/about",
    name: "Giới thiệu",
  },
  {
    path: "/contact",
    name: "Liên hệ",
  },
];

const Header = () => {
  return (
    <div className="position-fixed w-100 header">
      <div className="d-flex container h-100">
        <div className="d-flex align-items-center logo">
          <Link
            className="d-flex align-items-center"
            to="/"
            preventScrollReset={true}
          >
            <img src={shopIcon} alt="" />
            SHOP
          </Link>
        </div>
        <div className="menu d-flex align-items-center">
          {headerMenu.map((menu) => (
            <NavLink to={menu.path} key={menu.name}>
              {({ isActive }) => (
                <div className="mx-3">
                  <span className={isActive ? "active" : ""}>{menu.name}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
        <div className="d-flex align-items-center flex-row-reverse flex-grow-1">
          <Cart />
          <User />
        </div>
      </div>
    </div>
  );
};

export default Header;
