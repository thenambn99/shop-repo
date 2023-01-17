import React from "react";
import { Link } from "react-router-dom";
import NotFoundPagePng from "@/assets/imgs/pageNotFound.png"

const NotFoundPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <img
        src={NotFoundPagePng}
        alt="not-found"
      />
      <div>
        <Link to="/">Go Home Page</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
