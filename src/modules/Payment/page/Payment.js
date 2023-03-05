import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAuth } from "@/utils/localStorage";
import SplashScreen from "@/components/SplashScreen";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-hot-toast";
import { CONSTS } from "@/consts";
import swal from "sweetalert";
import ModalOrderDetail from "@/components/ModalOrderDetail";

const Payment = () => {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [orderId, setOrderId] = useState()
  const auth = JSON.parse(getAuth());
  const getPaymentList = async () => {
    setLoading(true);
    const res = await axiosInstance.post("getPaymentList", {
      user_id: auth.id,
    });
    if (res.data.success) {
      setPayment(res.data.result)
    } else {
      toast.error("Có lỗi xảy ra, không lấy được thông tin đơn hàng của bạn", {
        position: "bottom-center",
        duration: 2000
      })
    }
    setLoading(false)
  };

  const cancelOrder = async (id) => {
    setLoading(true)
    const res = await axiosInstance.post("cancelOrder", {id: id})
    if (res.data.success) {
      toast.success("Bạn đã hủy đơn hàng thành công", {
        position: "bottom-right",
        duration: 2000
      })
      getPaymentList()
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau", {
        position: "bottom-center",
        duration: 2000
      })
    }
    setLoading(false)
  }

  const handleCancelOrder = (orderId) => {
    swal({
      title: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        cancelOrder(orderId)
      }
    });
  };

  const handleOpenModal = (id) => {
    setOrderId(id)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  useEffect(() => {
    getPaymentList()
    // eslint-disable-next-line 
  }, [])
  return (
    <div style={{ margin: "50px 150px", minHeight:"177px" }}>
      <div className="mb-3">Đơn hàng của bạn</div>
      <table className="table table-hover align-middle table-sm">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày mua</th>
            <th>Số tiền</th>
            <th>Trạng thái đơn hàng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {payment.map((p) => (
            <tr key={p.id} style={{ height: "50px" }}>
              <td>{p.order_code}</td>
              <td>{dayjs(`${p.order_date}`).format("DD-MM-YYYY")}</td>
              <td>
                {p.total_price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>
                {CONSTS.ORDER_STATUS[p.order_status]}
              </td>
              <td>
                <div className="d-flex flex-row-reverse">
                  <div className="px-2">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleCancelOrder(p.id)}
                      disabled={p.order_status > 2}
                    >
                      Hủy đơn hàng
                    </button>
                  </div>
                  <div onClick={() => handleOpenModal(p.id)}>
                    <button className="btn btn-secondary"><i className="bi bi-eye"></i></button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalOrderDetail orderId={orderId} openModal={openModal} handleCloseModal={handleCloseModal} />
      <SplashScreen open={loading} />
    </div>
  );
};

export default Payment;
