import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategoriesAxios } from "../../http";

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

export const fetchCategories = createAsyncThunk("category/fetchCategory", async () => {
  const data = await fetchCategoriesAxios()
  return data.data.data;
});
