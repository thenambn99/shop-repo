import { CONSTS } from "@/consts";
import readImg from "@/utils/readImg";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  discountProduct,
  increaseProduct,
  removeProduct,
} from "../redux/cartSlice";
import swal from 'sweetalert'
import "./shoppingCart.scss";
const ShoppingCart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let count = 0;
  const subTotal = cart.reduce((acc, curr) => {
    count = acc + curr.product_quantity * curr.product_price;
    return count;
  }, count);
  const increase = (id, size) => {
    dispatch(increaseProduct({ id: id, size: size }));
  };
  const discount = (id, size) => {
    dispatch(discountProduct({ id: id, size: size }));
  };
  const remove = (id, size) => {
    swal({
      title: "Bỏ sản phẩm này khỏi giỏ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(removeProduct({ id: id, size: size }));
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container shopping-cart">
      <div className="mt-5">
        <h4>Đơn hàng của bạn</h4>
      </div>
      <div className="row mt-5">
        <div className="col-lg-9 col-md-9 col-sm-6">
          {cart.length >= 1 ? (
            <div className="table-responsive-sm">
              <table className="table table-bordered align-middle">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th style={{ width: "5%" }}>Ảnh</th>
                    <th>Size</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th></th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <span>{p.product_name}</span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <div className="img">
                            <img
                              src={readImg(p.product_image)}
                              alt=""
                              style={{ height: "100%" }}
                            />
                          </div>
                          <div className=""></div>
                        </div>
                      </td>
                      <td>{CONSTS.PRODUCT_SIZE[p.product_size]}</td>
                      <td>
                        {p.product_price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>
                        <div className="mx-3 quantity d-flex">
                          <button
                            className="btn"
                            onClick={() => discount(p.id, p.product_size)}
                            disabled={p.product_quantity === 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={p.product_quantity}
                            readOnly
                            className="form-control"
                            min="1"
                          />
                          <button
                            className="btn"
                            onClick={() => increase(p.id, p.product_size)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div
                          className="delete-icon"
                          onClick={() => remove(p.id, p.product_size)}
                        >
                          <i
                            className="bi bi-trash3"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </div>
                      </td>
                      <td>
                        {(p.product_price * p.product_quantity).toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>Bạn chưa thêm sản phẩm nào</div>
          )}
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6">
          <div className="cart-total">
            <div className="total-header mt-3 d-flex justify-content-center">
              <span className="fw-bold">THANH TOÁN</span>
            </div>
            <div className="mx-3 px-3 mt-4">
              <input
                type="text"
                className="form-control mt-4"
                placeholder="Điền mã giảm giá nếu có"
              />
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary">Áp dụng mã giảm giá</button>
              </div>
              <p className="mt-4">
                Dự kiến:{" "}
                {subTotal.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </p>
              <span>Giảm giá:</span>
              <p className="mt-4">Tổng tiền phải trả:</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-warning">Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
