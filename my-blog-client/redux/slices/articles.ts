import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
import { ParsedUrlQuery } from "querystring";
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

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (query: ParsedUrlQuery) => {
    const options: Partial<IQueryOptions> = {
      populate: ["author.avatar"],
      sort: ["id:desc"],
      pagination: {
        page: query.page ? +query.page : 1,
        pageSize: 9,
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`,
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

    const queryString = qs.stringify(options);

    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?${queryString}`,
      config
    );

    return data.data;
  }
);
