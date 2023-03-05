import axiosInstance from "@/api/axiosInstance";
import { CONSTS } from "@/consts";
import readImg from "@/utils/readImg";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import SplashScreen from "./SplashScreen";

const ModalOrderDetail = ({ orderId, openModal, handleCloseModal }) => {
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const getOrderDetail = async (orderId) => {
    setLoading(true);
    const res = await axiosInstance.post("getOrderDetail", { id: orderId });
    if (res.data.success) {
      setOrderDetail(res.data.result);
    } else {
      toast.error("Get order detail failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (openModal) {
      getOrderDetail(orderId);
    }
    // eslint-disable-next-line
  }, [openModal]);
  return (
    <div>
      <Modal
        show={openModal}
        onHide={handleCloseModal}
        className="modal-detail"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-hover align-middle table-sm">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Giá tiền </th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.map((o) => (
                <tr key={o.id}>
                  <td>{o.product_name}</td>
                  <td>
                    {
                      <img
                        src={readImg(o.product_image)}
                        alt="Product"
                        style={{ maxWidth: "100px", maxHeight: "120px" }}
                      />
                    }
                  </td>
                  <td>
                    {o.product_price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{CONSTS.PRODUCT__SIZE[o.product_size - 1].name}</td>
                  <td>{o.product_quantity}</td>
                  <td>
                    {(o.product_quantity * o.product_price).toLocaleString(
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
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-warning"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <SplashScreen open={loading} />
    </div>
  );
};

export default ModalOrderDetail;
