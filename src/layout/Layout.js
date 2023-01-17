import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="content-layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
