import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import SplashScreen from "@/components/SplashScreen";
import { useState } from "react";
import { setAccessToken, setAuth } from "@/utils/localStorage";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const requestLogin = async (data) => {
    setLoading(true);
    const res = await axiosInstance.post("login", data);
    if (res.data.success) {
      setAccessToken(res.data?.accessToken);
      setAuth(res.data?.result);
      navigate("/");
    } else {
      toast.error(`${res.data.message}`, {
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
    },
    onSubmit: (values) => {
      // console.log(values);
      requestLogin(values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row form-group required mb-3">
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
        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-warning float-end">
            Đăng nhập
          </button>
        </div>
        <div className="d-flex justify-content-center mt-2">Hoặc</div>
        <div className="row mt-3 mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="d-flex justify-content-center login-tab">
              <i className="bi bi-meta mx-2"></i> Facebook
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="d-flex justify-content-center login-tab">
              <i className="bi bi-google mx-2"></i> Google
            </div>
          </div>
        </div>
      </form>
      <SplashScreen open={loading} />
    </div>
  );
};

export default LoginPage;
