import axiosInstance from "@/api/axiosInstance";
import readImg from "@/utils/readImg";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import SplashScreen from "./SplashScreen";
import "./modalProductDetail.scss";
import ReactHtmlParser from "react-html-parser";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { addToCart } from "@/modules/Cart/redux/cartSlice";

const sizeData = [
  {
    value: 1,
    name: "Size M",
  },
  {
    value: 2,
    name: "Size L",
  },
  {
    value: 3,
    name: "Size XL",
  },
  {
    value: 4,
    name: "Size XXL",
  },
];

const ModalProductDetail = ({ productId, openModal, handleCloseModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({});
  const getProductById = async (id) => {
    setLoading(true);
    const res = await axiosInstance.get(`getProductById?id=${id}`);
    if (res) {
      setProductData(res?.data?.result);
    } else {
      toast.error("Get product failed", {
        duration: 2000,
        position: "bottom-right",
      });
    }
    setLoading(false);
  };
  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const discountQuantity = () => {
    if (Number(quantity) > 1) {
      setQuantity((prev) => Number(prev) - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity((prev) => Number(prev) + 1);
  };
  useEffect(() => {
    if (typeof productId === "number") {
      getProductById(productId);
    }
    // eslint-disable-next-line
  }, [productId]);

  useEffect(() => {
    setSize(0);
    setQuantity(1);
    // eslint-disable-next-line
  }, [openModal]);
  const addProductToCart = () => {
    if (!size) {
      toast.error("Vui lòng chọn size", {
        position: "bottom-center",
        duration: 3000,
      });
    } else if (
      quantity >
      productData.product_detail.find((p) => p.product_size === Number(size))
        .product_quantity
    ) {
      toast.error("Không thể mua quá số lượng có sẵn", {
        position: "bottom-center",
        duration: 3000,
      });
    } 
    else if (Number(quantity) === 0) {
      toast.error("Vui lòng chọn ít nhất 1 sản phẩm", {
        position: "bottom-center",
        duration: 3000,
      });
    } else {
      dispatch(
        addToCart({
          ...productData,
          product_size: size,
          product_quantity: quantity,
        })
      );
      toast.success("Đã thêm sản phẩm vào giỏ", {
        position: "bottom-center",
        duration: 3000,
      });
      handleCloseModal();
    }
  };
  return (
    <div>
      <Modal
        show={openModal}
        onHide={handleCloseModal}
        className="modal-detail"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="d-flex justify-content-center product-img mt-4">
                <img
                  src={readImg(
                    productData.product_image ? productData.product_image : ""
                  )}
                  alt="Product"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 product">
              <div className="product-name mt-4">
                <h4>{productData.product_name}</h4>
                <p className="mt-3">
                  Giá tiền:
                  <span className="px-2 fw-bold">
                    {productData.product_price
                      ? productData.product_price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      : ""}
                  </span>
                </p>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col-lg-3 col-md-3 col-sm-6">Chọn size</div>
                <div className="col-lg-9 col-md-9 col-sm-6">
                  <div className="mx-3">
                    <Select
                      id="status"
                      value={size ? size : ""}
                      onChange={handleChangeSize}
                      size="small"
                      fullWidth
                      placeholder="Chọn size"
                    >
                      {sizeData.map((size) => (
                        <MenuItem key={size.value} value={size.value}>
                          {size.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col-lg-3 col-md-3 col-sm-6">Số lượng</div>
                <div className="col-lg-9 col-md-9 col-sm-6">
                  <div className="mx-3 quantity d-flex">
                    <button
                      className="btn"
                      onClick={() => discountQuantity()}
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleChangeQuantity}
                      className="form-control"
                      min="1"
                    />
                    <button className="btn" onClick={() => increaseQuantity()}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-4 mb-4">{`Có sẵn: ${
                size
                  ? `${
                      productData.product_detail.find(
                        (p) => p.product_size === Number(size)
                      ).product_quantity
                    } sản phẩm`
                  : ""
              }`}</p>
              <div className="product-des mt-5">
                {productData.product_des
                  ? ReactHtmlParser(productData.product_des)
                  : ""}
              </div>
            </div>
          </div>
          <div className="row mt-5"></div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-warning"
            onClick={() => addProductToCart()}
          >
            Thêm vào giỏ hàng
          </button>
        </Modal.Footer>
      </Modal>
      <SplashScreen open={loading} />
    </div>
  );
};

export default ModalProductDetail;
