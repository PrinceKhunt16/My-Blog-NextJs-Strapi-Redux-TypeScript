import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IWriteSliceWriteState {
    blog: {
        Title: string,
        Body: string,
        shortDescription: string,
        imageurl: string,
        Slug: string
    },
    category: string
}

export interface IWriteSliceProps {
    writtenDown: boolean,
    error: string | null,
    message: string,
    id: number | null
}

type IWriteSliceImageState = string | Blob

const initialState: IWriteSliceProps = {
    writtenDown: false,
    error: null,
    message: '',
    id: null
}

export const writeSlice = createSlice({
    name: 'write',
    initialState,
    reducers: {
        setDefaultWrite: (state) => {
            state.writtenDown = false
            state.error = null
            state.message = '',
            state.id = null
        }
    },
    extraReducers(builder) {
        builder.addCase(writeUserText.pending, (state) => {
            state.writtenDown = false
            state.error = null
            state.message = ''
        }),
        builder.addCase(writeUserText.fulfilled, (state, action) => {
            state.writtenDown = false
            state.id = action.payload.data.id
            state.message = 'Text data posted.',
            state.error = null
        }),
        builder.addCase(writeUserText.rejected, (state) => {
            state.writtenDown = false
            state.message = ''
            state.error = 'This is a blog above the title so you have something else.'
        }),
        builder.addCase(writeImage.pending, (state) => {
            state.writtenDown = false
            state.error = null
            state.message = ''
        }),
        builder.addCase(writeImage.fulfilled, (state) => {
            state.writtenDown = false
            state.message = 'Your blog image posted.'
            state.error = null
        }),
        builder.addCase(writeImage.rejected, (state) => {
            state.writtenDown = false
            state.error = 'Your selected image should be png or jpg.'
            state.message = ''
        }),
        builder.addCase(writeImageUrlUpdate.pending, (state) => {
            state.writtenDown = false
            state.error = null
            state.message = ''
        }),
        builder.addCase(writeImageUrlUpdate.fulfilled, (state) => {
            state.writtenDown = true
            state.message = 'Your blog has been posted.'
            state.error = null
            state.id = null
        }),
        builder.addCase(writeImageUrlUpdate.rejected, (state) => {
            state.writtenDown = false
            state.error = 'This is a blog above the title so you have something else.'
            state.message = ''
            state.id = null
        })
    },
})

export const { setDefaultWrite } = writeSlice.actions

export default writeSlice.reducer

export const writeUserText = createAsyncThunk('write/createWriteText', async (data: IWriteSliceWriteState, { getState, dispatch }) => {
    const { user } = getState() as any

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
        }
    }

    const postresponse = await axios.post(`http://localhost:1337/api/articles`, { data: data.blog }, config)

    const response = await axios.put(`http://localhost:1337/api/articles/${postresponse.data.data.id}/?populate=categories&users`,
        {
            data: {
                Category: [data.category],
                author: [user.data.id]
            }
        },
        config
    )

    return postresponse.data
})

export const writeImage = createAsyncThunk('write/createBlogImage', async (image: IWriteSliceImageState, { dispatch }) => {
    const d = new FormData()
    d.append('files', image)

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
        }
    }

    const response = await axios.post(`http://localhost:1337/api/upload`, d, config)

    dispatch(writeImageUrlUpdate(response.data[0].url))
})

export const writeImageUrlUpdate = createAsyncThunk('write/usersBlogInPutImageUrl', async ( url: string | Blob, { getState }) => {
    const { write } = getState() as any

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
        }
    }

    const response = await axios.put(`http://localhost:1337/api/articles/${write.id}/?populate=imageurl`,
        {
            data: {
                imageurl: url
            }
        },
        config
    )
    return response.data
})
