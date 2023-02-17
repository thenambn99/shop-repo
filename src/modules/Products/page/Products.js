import React from 'react'
import ProductList from '../components/ProductList'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getProductList } from '@/modules/Home/redux/homeActions';
import { useState } from 'react';
import ProductControl from '../components/ProductControl';

const Products = () => {
  const dispatch = useDispatch()
  const { productList, listLoading } = useSelector((state) => state.home);
  const [page, setPage] = useState(1);
  const [listClone, setListClone] = useState([]);

  useEffect(() => {
    dispatch(getProductList());
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setListClone(productList);
    // eslint-disable-next-line
  }, [listLoading]);
  return (
    <div>
      <ProductControl setList={setListClone} productList={productList} setPage={setPage} />
      <ProductList listClone={listClone} page={page} setPage={setPage} />
    </div>
  )
}

export default Products
