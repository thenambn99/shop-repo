import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import axiosInstance from "@/api/axiosInstance";
import SplashScreen from "@/components/SplashScreen";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const registerUser = async (data) => {
    setLoading(true);
    const res = await axiosInstance.post("/register", data);
    if (res.data?.success) {
      toast.success("Register user successed", {
        position: "bottom-right",
        duration: 2000,
      });
    } else {
      toast.error(res.data?.message, {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phone_number: "",
      address: "",
    },
    onSubmit: (values) => {
      registerUser(values)
      navigate("/login")
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row form-group required">
          <div className="col-sm-12 col-md-12 mt-2">
            <label htmlFor="name">
              <span className="label-text">Tên</span>
            </label>
            <div className="input-group">
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 mt-2">
            <label htmlFor="phone_number">
              <span className="label-text">Số điện thoại</span>
            </label>
            <div className="input-group">
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                className="form-control"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 mt-2">
            <label htmlFor="address">
              <span className="label-text">Địa chỉ</span>
            </label>
            <div className="input-group">
              <input
                id="address"
                name="address"
                type="text"
                className="form-control"
                value={formik.values.address}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 mt-2">
            <label htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <div className="input-group">
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 mt-2">
            <label htmlFor="password">
              <span className="label-text">Mật khẩu</span>
            </label>
            <div className="input-group">
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3 mb-3">
          <button type="submit" className="btn btn-warning float-end">
            Đăng ký
          </button>
        </div>
      </form>
      <SplashScreen open={loading} />
    </div>
  );
};

export default Register;
