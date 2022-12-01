import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from "qs";
import { ParsedUrlQuery } from "querystring";
import { fetchArticlesAxios } from "../../http";
import { IArticleSliceData, IQueryOptions } from "../../types";

export interface IArticleSliceProps {
  data: IArticleSliceData | null,
  error: string,
  isLoading: boolean
}

const initialState: IArticleSliceProps = {
  data: null,
  error: "",
  isLoading: false,
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    }),
    builder.addCase(fetchArticles.rejected, (state) => {
      state.data = null;
      state.isLoading = false;
    });
  },
});

export default articlesSlice.reducer;

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async (query: ParsedUrlQuery) => {
  const options: Partial<IQueryOptions> = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    pagination: {
      page: query.page ? +query.page : 1,
      pageSize: 9,
    },
  };
  
  if (query.search) {
    options.filters = {
      Title: {
        $containsi: query.search,
      },
    };
  } else {
    if(query.category){
      options.filters = {
        Category: {
          slug: query.category,
        },
      }
    }
  }

  const queryString = qs.stringify(options)

  const data = await fetchArticlesAxios(queryString)
  return data.data;
});
