import axiosInstance from "@/api/axiosInstance";
import SplashScreen from "@/components/SplashScreen";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "./productControl.scss";

const ProductControl = ({ setList, productList, setPage }) => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const handleSelect = (i, category_id) => {
    setPage(1)
    setIndex(i);
    if (!category_id) {
      setList(productList);
    } else {
      setList(productList.filter((p) => p.product_category === category_id));
    }
  };
  const getAllCategories = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/getAllCategories");
    if (res) {
      setCategoryList([
        {
          category_name: "Toàn bộ sản phẩm",
          id: null,
        },
        ...res.data.result,
      ]);
      setLoading(false);
    } else {
      toast.error("Get all categories failed", {
        position: "bottom-right",
        duration: 2000,
      });
      setLoading(false);
    }
  };
  const setSearch = (name) => {
    console.log(name)
    setList(productList.filter((p) => p.product_name.includes(name)))
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container box">
      <div className="d-flex justify-content-between mt-3 mb-3">
        <div className="d-flex">
          {categoryList.map((l, i) => (
            <div
              key={i}
              className={index === i ? "filter filter-selected" : "filter"}
              onClick={() => handleSelect(i, l.id)}
            >
              <p>{l.category_name}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm tên sản phẩm"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      <SplashScreen open={loading} />
    </div>
  );
};

export default ProductControl;
