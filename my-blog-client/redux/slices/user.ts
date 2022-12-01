import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserAxios } from "../../http";
import { IUser } from "../../types";

export interface IUserSliceProps {
  isUser: boolean;
  isLoading: boolean;
  data: IUser | null;
}

const initialState: IUserSliceProps = {
  isUser: false,
  isLoading: false,
  data: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
      state.isUser = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true
      state.isUser = false
    }),
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
      state.isUser = true
    }),
    builder.addCase(fetchUser.rejected, (state) => {
      state.isUser = false
      state.isLoading = false
    })
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const jwt = localStorage.getItem('jwt')

  if(jwt){
    const obj = JSON.parse(window.atob(jwt.split('.')[1]))

    try {
      const { data } = await fetchUserAxios(obj.id)
      const { avatarurl, email, username, id, about, articles } = data
      return { avatarurl, email, username, id, about, articles }
    } catch (e) {
      throw 404
    }
  } else {
    throw 404
  }
})