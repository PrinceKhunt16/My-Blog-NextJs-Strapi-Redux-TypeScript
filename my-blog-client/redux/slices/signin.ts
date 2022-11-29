import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ISigninSliceUserState {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    username: string,
    about: string
}

export interface ISigninSliceProps {
    isSignedIn: boolean,
    error: string | null,
    message: string | null,
    id: number | null,
    url: string
}

export interface ISigninSliceAfterImageState {
    id: number | null,
    url: string
}

type ISigninSliceImageState = string | Blob

const initialState: ISigninSliceProps = {
    isSignedIn: false,
    error: null,
    message: null,
    id: null,
    url: ''
}

export const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setDefaultSignIn: (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = null
            state.id = null
            state.url = ''
        }
    },
    extraReducers(builder) {
        builder.addCase(signinUserText.pending, (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = null
        }),
        builder.addCase(signinUserText.fulfilled, (state, action) => {
            localStorage.setItem('jwt', action.payload.jwt)
            state.id = action.payload.user.id
            state.isSignedIn = false,
            state.message = 'You good to go 1'
            state.error = null
        }),
        builder.addCase(signinUserText.rejected, (state) => {
            state.isSignedIn = false
            state.message = null
            state.error = 'Email or Username are already taken'
        }),
        builder.addCase(signinUserImage.pending, (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = null
        }),
        builder.addCase(signinUserImage.fulfilled, (state) => {
            state.isSignedIn = false
            state.message = 'You good to go 2'
            state.error = null
        }),
        builder.addCase(signinUserImage.rejected, (state) => {
            state.isSignedIn = false
            state.message = null
            state.error = 'Your selected image should be less than 1 mb'
        }),
        builder.addCase(signinUserImageUrlUpdate.pending, (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = null
        }),
        builder.addCase(signinUserImageUrlUpdate.fulfilled, (state) => {
            state.isSignedIn = true
            state.message = 'Your account has been created.'
            state.error = null
            state.url = ''
            state.id = null
        }),
        builder.addCase(signinUserImageUrlUpdate.rejected, (state) => {
            state.isSignedIn = false
            state.message = null
            state.error = 'Email or Username are already taken'
            state.url = ''
            state.id = null
        })
    },
})

export const { setDefaultSignIn } = signinSlice.actions

export default signinSlice.reducer

export const signinUserText = createAsyncThunk('signin/createUserText', async (data: ISigninSliceUserState) => {
    const d = new FormData()
    d.set("username", data.username)
    d.set("firstname", data.firstname)
    d.set("lastname", data.lastname)
    d.set("email", data.email)
    d.set("password", data.password)
    d.set("about", data.about)

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
        }
    }

    const response = await axios.post(`http://localhost:1337/api/auth/local/register`, data, config)
    return response.data
})

export const signinUserImage = createAsyncThunk('signin/createUserImage', async (image: ISigninSliceImageState, { dispatch }) => {
    const d = new FormData()
    d.append('files', image)

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
        }
    }

    const response = await axios.post(`http://localhost:1337/api/upload`, d, config)

    dispatch(signinUserImageUrlUpdate(response.data[0].url))
})

export const signinUserImageUrlUpdate = createAsyncThunk('signin/updateUserImageUrl', async ( url: string | Blob, { getState }) => {
    const { signin } = getState() as any
    const d = new FormData()
    d.set("avatarurl", url)

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
        }
    }

    const response = await axios.put(`http://localhost:1337/api/users/${signin.id}`, d, config)
    return response.data
})
