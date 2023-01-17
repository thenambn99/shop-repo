import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProductList = createAsyncThunk(
  'getProductList',
  async () => {
    try {
      const res = await axiosInstance.get("getProductList")
      return res.data
    }
    catch (e) {
      throw e
    }
  }
)