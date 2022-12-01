import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signinImageAxios, signinUserTextAxios } from "../../http";

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
    message: string,
    id: number | null
}

export interface ISigninSliceAfterImageState {
    id: number | null,
    url: string
}

type ISigninSliceImageState = string | Blob

const initialState: ISigninSliceProps = {
    isSignedIn: false,
    error: null,
    message: '',
    id: null
}

export const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setDefaultSignIn: (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = ''
            state.id = null
        }
    },
    extraReducers(builder) {
        builder.addCase(signinUserText.pending, (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = ''
        }),
        builder.addCase(signinUserText.fulfilled, (state, action) => {
            localStorage.setItem('jwt', action.payload.jwt)
            state.id = action.payload.user.id
            state.isSignedIn = false,
            state.message = 'Text data is posted.'
            state.error = null
        }),
        builder.addCase(signinUserText.rejected, (state) => {
            state.isSignedIn = false
            state.message = ''
            state.error = 'Email or Username are already taken.'
        }),
        builder.addCase(signinUserImage.pending, (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = ''
        }),
        builder.addCase(signinUserImage.fulfilled, (state) => {
            state.isSignedIn = false
            state.message = 'Your avatar posted.'
            state.error = null
        }),
        builder.addCase(signinUserImage.rejected, (state) => {
            state.isSignedIn = false
            state.message = ''
            state.error = 'Your selected image should be png or jpg.'
        }),
        builder.addCase(signinUserImageUrlUpdate.pending, (state) => {
            state.isSignedIn = false
            state.error = null
            state.message = ''
        }),
        builder.addCase(signinUserImageUrlUpdate.fulfilled, (state) => {
            state.isSignedIn = true
            state.message = 'Your account has been created.'
            state.error = null
            state.id = null
        }),
        builder.addCase(signinUserImageUrlUpdate.rejected, (state) => {
            state.isSignedIn = false
            state.message = ''
            state.error = 'Email or Username are already taken.'
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

    const response = await signinUserTextAxios(d)
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

    const response = await signinImageAxios(signin.id, d)
    return response.data
})
