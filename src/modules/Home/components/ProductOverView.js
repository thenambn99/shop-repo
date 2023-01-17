import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../redux/homeActions";
import "./productOverView.scss"
import { useNavigate } from "react-router-dom";
import ModalProductDetail from "@/components/ModalProductDetail";
import readImg from "@/utils/readImg";

const ProductOverView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { productList, listLoading } = useSelector((state) => state.home);
  const [listClone, setListClone] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState({})
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (productId) => {
    setProductId(productId)
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(getProductList());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setListClone(productList.slice(0, 16));
    // eslint-disable-next-line
  }, [listLoading]);

  const handleLoadMore = () => {
    navigate("/products")
  }
  // const loadProductDetail = (id) => {
  //   navigate(`/products/${id}`)
  // }
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
          <h2>TỔNG QUAN SẢN PHẨM</h2>
        </div>
      </div>
      <div className="row">
        {listClone.map((p) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={p.id}>
            <div className="d-flex justify-content-center position-relative product-img mt-4">
              <img
                src={readImg(p.product_image)}
                alt="Product"
                style={{ width: "100%" }}
              />
            <div className="text-center position-absolute btn-buy">
              <button className="btn btn-warning" onClick={() => handleOpenModal(p.id)}>Xem chi tiết</button>
            </div>
            </div>
            <div className="text-center mt-2">
              <span>{p.product_name}</span>
            </div>
            <div className="text-center fw-bold">
              <span>{p.product_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5 mb-5">
        <button className="btn btn-light" onClick={() => handleLoadMore()}>XEM THÊM</button>
      </div>
      <ModalProductDetail openModal={openModal} handleCloseModal={handleCloseModal} productId={productId}/>
    </div>
  );
};

export default ProductOverView;
