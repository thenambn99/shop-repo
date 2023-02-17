import readImg from "@/utils/readImg";
import React from "react";
import { useState } from "react";
import ModalProductDetail from "@/components/ModalProductDetail";
import usePagination from "@/utils/Pagination";
import { Pagination } from "@mui/material";
import "@/modules/Home/components/productOverView.scss";
import { useEffect } from "react";


const ProductList = ({listClone, page, setPage}) => {
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState({});

  const PER_PAGE = 16;
  const count = Math.ceil(listClone.length / PER_PAGE);
  const _DATA = usePagination(listClone, PER_PAGE);
  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    window.scrollTo(0, 0);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (productId) => {
    setProductId(productId);
    setOpenModal(true);
  };
  useEffect(() => {
    _DATA.jump(page)
    // eslint-disable-next-line
  }, [listClone])
  return (
    <div className="container">
      <div className="row">
        {_DATA.currentData().map((p) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={p.id}>
            <div className="d-flex justify-content-center position-relative product-img mt-4">
              <img
                src={readImg(p.product_image)}
                alt="Product"
                style={{ width: "100%" }}
              />
              <div className="text-center position-absolute btn-buy">
                <button
                  className="btn btn-warning"
                  onClick={() => handleOpenModal(p.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
            <div className="text-center mt-2">
              <span>{p.product_name}</span>
            </div>
            <div className="text-center fw-bold">
              <span>
                {p.product_price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ModalProductDetail
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        productId={productId}
      />
      <div className="d-flex justify-content-center mb-4 mt-5">
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default ProductList;
