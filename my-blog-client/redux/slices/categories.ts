import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  error: "",
  isLoading: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchCategories.fulfilled , (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    }),
    builder.addCase(fetchCategories.rejected, (state) => {
      state.data = null;
    });
  },
});

export default categoriesSlice.reducer;

export const fetchCategories = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`,
      },
    };

    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`,
      config
    );

    return data.data.data;
  }
);
