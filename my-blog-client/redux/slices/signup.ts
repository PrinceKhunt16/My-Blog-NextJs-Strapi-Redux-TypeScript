import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ISignupSliceUserState {
    email: string,
    password: string
}

export interface ISignupSliceState {
    isSignedUp: boolean,
    error: null | string,
    message: null | string
}

const initialState: ISignupSliceState = {
    isSignedUp: false,
    error: null,
    message: null
}

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signupUser.pending, (state) => {
            state.isSignedUp = false,
            state.error = null,
            state.message = null
        }),
        builder.addCase(signupUser.fulfilled, (state) => {
            state.isSignedUp = true,
            state.message = 'You are signed up'
            state.error = null
        }),
        builder.addCase(signupUser.rejected, (state) => {
            state.isSignedUp = false,
            state.message = null
            state.error = 'Invalid user credentials'
        })
    },
})

export default signupSlice.reducer

export const signupUser = createAsyncThunk('signup/fetchUser', async (data: ISignupSliceUserState) => {
    const d = new FormData()
    d.set("identifier", data.email)
    d.set("password", data.password)

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
        }
    }

    const response = await axios.post(`http://localhost:1337/api/auth/local`, d, config)

    const { jwt } = response.data
    localStorage.setItem('jwt', JSON.stringify(jwt))
})