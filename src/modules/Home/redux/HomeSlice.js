import { createSlice } from '@reduxjs/toolkit'
import { getProductList } from './homeActions'
import { toast } from "react-hot-toast";


const initialState = {
  productList: [],
  listLoading: false
}

const HomeSlice = createSlice({
  name: "Home Page",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending , state => {
        state.listLoading = true
      })
      .addCase(getProductList.fulfilled, (state, action) =>{
        state.productList = action.payload.result
        state.listLoading = false
      })
      .addCase(getProductList.rejected, (state) => {
        state.listLoading = false;
        toast.error("Get product list failed", {
          position: "bottom-right",
          duration: 2000,
        });
      })
  }
})


export default HomeSlice
