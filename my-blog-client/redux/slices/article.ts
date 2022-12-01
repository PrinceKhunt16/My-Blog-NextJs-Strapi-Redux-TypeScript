import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ParsedUrlQuery } from "querystring";
import qs from "qs"
import { IArticle, IArticleSliceData } from "../../types";
import { fetchArticlesAxios } from "../../http";

export interface IArticleSliceProps {
  data: IArticle | null,
  usersData: IArticleSliceData | null,
  error: string,
  isLoading: boolean,
  username: string
}

const initialState: IArticleSliceProps = {
  data: null,
  error: '',
  isLoading: false,
  username: '',
  usersData: null
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.username = action.payload.attributes.author.data.attributes.username
      state.data = action.payload;
    }),
    builder.addCase(fetchArticle.rejected, (state) => {
      state.data = null;
      state.isLoading = false;
    }),
    builder.addCase(fetchArticlesOfUser.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchArticlesOfUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersData = action.payload;
    }),
    builder.addCase(fetchArticlesOfUser.rejected, (state) => {
      state.data = null;
      state.isLoading = false;
    })
  },
});

export default articleSlice.reducer;

export const fetchArticle = createAsyncThunk("article/fetchArticle", async (query: ParsedUrlQuery) => {
  const queryString = qs.stringify({
      populate: ['Image', 'author.avatar'],
      filters: {
        Slug: {
          $eq: query.article,
        },
      },
  })

  const data = await fetchArticlesAxios(queryString)
  return data.data.data[0]
})

export const fetchArticlesOfUser = createAsyncThunk("article/fetchArticlesOfUser", async ( _, { getState }) => {
  const { article } = getState() as any

  const options = {
    sort: ['id:desc'],
    filters: {
      author: {
        username: article.username
      },
    }
  } 

  const queryString = qs.stringify(options)

  const data = await fetchArticlesAxios(queryString)
  return data.data
})