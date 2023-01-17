import { CONSTS } from "@/consts";
import { removeProduct } from "@/modules/Cart/redux/cartSlice";
import readImg from "@/utils/readImg";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./modalCart.scss";

const ModalCart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const remove = (id, size) => {
    dispatch(removeProduct({id: id, size: size}));
  };
  return (
    <div className="mt-3 mx-3">
      {cart.map((p, i) => (
        <div className="row mt-3" key={i}>
          <div className="col-lg-4 col-sm-4 col-md-4">
            <img
              src={p ? readImg(p.product_image) : ""}
              alt=""
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-8">
            <span>{`${p.product_name} (${
              CONSTS.PRODUCT_SIZE[p.product_size]
            })`}</span>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <div>SL: </div>
              <div className="fw-bold mx-2">
                {p.product_quantity} x{" "}
                {p.product_price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="delete-icon" onClick={() => remove(p.id, p.product_size)}>
                <i className="bi bi-trash3"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModalCart;
