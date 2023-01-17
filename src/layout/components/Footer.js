import React from "react";
import "./footer.scss";
const Footer = () => {
  return (
    <div className="footer w-100">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="row mx-4 mt-5">
            <div className="col-lg-6 col-md-6">
              <p>MUA HÀNG TRỰC TUYẾN</p>
              <p>0123456789</p>
              <p>hakuna@matata.com</p>
            </div>
            <div className="col-lg-6 col-md-6">
              <p>HOTLINE GÓP Ý</p>
              <p>0987654321</p>
              <p>cskh@hkm.com</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="row mx-4 mt-5">
            <div className="col-lg-4 col-md-4">
              <h4>Thông tin</h4>
              <p>Giới thiệu</p>
              <p>Tuyển dụng</p>
            </div>
            <div className="col-lg-4 col-md-4">
              <h4>Chính sách</h4>
              <p>Chính sách đổi hàng</p>
              <p>Chính sách bảo hành</p>
              <p>Chính sách bảo mật</p>
              <p>Chính sách hoàn tiền</p>
            </div>
            <div className="col-lg-4 col-md-4">
              <h4>FAQS</h4>
              <p>Thanh toán vận chuyển</p>
              <p>Kiểm tra thông tin đơn hàng</p>
              <p>Câu hỏi thường gặp</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4 pb-5">
        <div className="footer-icon">
          <i className="bi bi-meta"></i>
        </div>
        <div className="footer-icon">
          <i className="bi bi-instagram"></i>
        </div>
        <div className="footer-icon">
          <i className="bi bi-linkedin"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
