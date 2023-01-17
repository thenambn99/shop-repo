// import { Modal, Slide } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "./cart.scss";
import ModalCart from "../modalCart/ModalCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const numOfCart = cart.length
  const navigate = useNavigate()
  let count = 0;
  const total = cart.reduce((acc, curr) => {
    count = acc + curr.product_quantity * curr.product_price;
    return count;
  }, count);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const goToShoppingCart = () => {
    navigate("shopping-cart")
    handleCloseModal()
  }
  return (
    <div className="icon align-items-center">
      <div>
        <span className="icon-cart" value={numOfCart} onClick={handleOpenModal}>
          <i className="bi bi-cart2 mx-3"></i>
        </span>
      </div>
      <Modal className="modal-cart" show={openModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Giỏ hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalCart />
        </Modal.Body>
        <Modal.Footer>
          <div>
            Tổng:{" "}
            <span className="fw-bold">
              {total.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <Button variant="warning" onClick={() => goToShoppingCart()}>
            Xem chi tiết giỏ hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
