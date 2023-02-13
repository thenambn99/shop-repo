import axiosInstance from "@/api/axiosInstance";
import SplashScreen from "@/components/SplashScreen";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

const Coupon = () => {
  const [loading, setLoading] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const getAllCoupons = async () => {
    setLoading(true);
    const res = await axiosInstance.get("getAllCoupons");
    if (res) {
      setCouponList(res.data.result);
      setLoading(false);
    } else {
      toast.error("Get coupon failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllCoupons();
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ margin: "50px 150px", minHeight: "177px" }}>
      <div>Mã khuyến mại của Shop</div>
      <table className="table table-hover align-middle mt-3">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mã giảm giá</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái mã</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {couponList.map((coupon) => (
            <tr key={coupon.id} style={{ height: "50px" }}>
              <td>{coupon.coupon_name}</td>
              <td>{coupon.coupon_code}</td>
              <td>{dayjs(`${coupon.coupon_start}`).format("DD-MM-YYYY")}</td>
              <td>{dayjs(`${coupon.coupon_end}`).format("DD-MM-YYYY")} </td>
              <td>
                {dayjs(`${coupon.coupon_end}`).diff(dayjs(), "d") >= 0 ? (
                  <div style={{ color: "green" }}>Còn hạn</div>
                ) : (
                  <div style={{ color: "red" }}>Hết hạn</div>
                )}
              </td>
              <td>
                {coupon.coupon_type === 1
                  ? `Giảm giá ${coupon.coupon_value}%`
                  : `Giảm giá ${coupon.coupon_value.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SplashScreen open={loading} />
    </div>
  );
};

export default Coupon;
