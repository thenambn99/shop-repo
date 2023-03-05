import { CONSTS } from "@/consts";
import readImg from "@/utils/readImg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  discountProduct,
  increaseProduct,
  removeProduct,
  resetCart
} from "../redux/cartSlice";
import swal from "sweetalert";
import "./shoppingCart.scss";
import { getAuth } from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

const ShoppingCart = () => {
  const [loading, setLoading] = useState(false);
  const [isChangeCode, setIsChangeCode] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const [coupon, setCoupon] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const auth = JSON.parse(getAuth());
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
    }).then((willDelete) => {
      if (willDelete) {
        setCoupon(null)
        setIsChangeCode(false)
        setCouponCode('')
        dispatch(removeProduct({ id: id, size: size }));
      }
    });
  };

  const handleChangeCouponCode = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCode = async () => {
    setTotal(subTotal);
    setLoading(true);
    const res = await axiosInstance.post("getCouponByCode", {
      code: couponCode,
    });
    if (res.data.success) {
      if (dayjs(res.data.result.coupon_end).diff(dayjs(), "d") >= 0 && dayjs(res.data.result.coupon_start).diff(dayjs(), "d") <= 0) {
        setCoupon(res.data.result);
        toast.success("Áp dụng mã thành công", {
          position: "bottom-right",
          duration: 2000,
        });
        if (res.data.result.coupon_type === 1) {
          setTotal(total - (total * res.data.result.coupon_value) / 100);
        }
        if (res.data.result.coupon_type === 2) {
          setTotal(total - res.data.result.coupon_value);
        }
        setIsChangeCode(true)
      } else {
        toast.error("Mã đã hết hạn hoặc chưa đến thời gian sử dụng", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("Không có mã phù hợp", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const changeCode = () => {
    setTotal(subTotal)
    setIsChangeCode(false)
    setCoupon(null)
  }

  const createOrder = async (params) => {
    setLoading(true)
    const res = await axiosInstance.post('createOrder', params)
    if (res.data.success) {
      toast.success("Gửi đơn hàng thành công", {
        position: "bottom-center",
        duration: 2000
      })
      setLoading(false)
      dispatch(resetCart())
      navigate("/payment")
    } else {
      toast.error("Có lỗi từ hệ thống, vui lòng thử lại", {
        position: "bottom-center",
        duration: 2000
      })
    }
    setLoading(false)
  }

  const handlePay = () => {
    if (!auth) {
      swal({
        title: "Vui lòng đăng nhập để thanh toán",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          navigate("/login");
        }
      });
    }

    if (cart.length < 1) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ", {
        position: "bottom-center",
        duration: 3000
      })
      return
    }
    const productList = cart.map((p) => {
      return {
        product_id: p.id,
        product_size: p.product_size,
        product_quantity: p.product_quantity
      }
    })
    const params = {
      user_id: auth.id,
      order_status: 1,
      order_date: new Date(),
      total_price: total,
      cart: productList
    }
    swal({
      title: "Bạn có chắc chắn muốn đặt hàng?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        createOrder(params)
      }
    });
  };

  useEffect(() => {
    setTotal(subTotal)
  }, [subTotal])
  
  useEffect(() => {
    setTotal(subTotal);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
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
                            disabled={p.product_quantity === 1 || isChangeCode}
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
                            disabled={isChangeCode}
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
                value={couponCode}
                onChange={handleChangeCouponCode}
                disabled={isChangeCode}
              />
              <div className="d-flex justify-content-center mt-4">
                {isChangeCode ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => changeCode()}
                  >
                    Đổi mã giảm giá
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => applyCode()}
                  >
                    Áp dụng mã giảm giá
                  </button>
                )}
              </div>
              <p className="mt-4">
                Dự kiến:{" "}
                {subTotal.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </p>
              <span>
                {coupon
                  ? coupon.coupon_type === 1
                    ? `Giảm giá: ${coupon.coupon_value}%`
                    : `Giảm giá: ${coupon.coupon_value.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}`
                  : "Giảm giá:"}
              </span>
              <p className="mt-4">Tổng tiền phải trả: </p>
              <p className="fw-bold d-flex justify-content-center">
                {total
                  ? total.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  : ""}
              </p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-warning" onClick={() => handlePay()}>
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SplashScreen open={loading} />
    </div>
  );
};

export default ShoppingCart;
