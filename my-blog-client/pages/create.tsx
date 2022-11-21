import axios, { AxiosResponse } from "axios"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { ICategory, ICollectionResponse } from "../types"
import { fetchCategories } from '../http'
import { UserContext } from "./_app"

interface IPropTypes {
    categories: {
        items: ICategory[]
    }
}

export default function Create({ categories }: IPropTypes) {
    const { userData } = useContext(UserContext)
    const [category, setCategory] = useState(null)
    const [image, setImage] = useState('')
    const [imagePreview, setImagePrivew] = useState('')
    const [blog, setBlog] = useState({
        Title: '',
        Body: '',
        shortDescription: '',
        Slug: ''
    })
    const router = useRouter()

    const makeSlug = (title: string) => {
        return title.split(' ').map(str => str.toLowerCase()).join('-')
    }

    const handleTextData = async () => {
        const slug = makeSlug(blog.Title)

        setBlog({
            ...blog,
            Slug: slug
        })

        const postresponse = await axios.post(`http://localhost:1337/api/articles`, {
            data: blog
        })

        const response = await axios.put(`http://localhost:1337/api/articles/${postresponse.data.data.id}/?populate=categories&users`, {
            data: {
                Category: [category],
                author: [userData.id]
            },
        })

        return postresponse
    }

    const handleImageData = async () => {
        const data = new FormData()
        data.append('files', image)
        const response = await axios.post(`http://localhost:1337/api/upload`, data)
        return response
    }

    const handleImageAfterText = async (id: number, url: string) => {
        const response = await axios.put(`http://localhost:1337/api/articles/${id}/?populate=imageurl`, {
            data: {
                imageurl: url
            }
        })
        return response
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const textResponse = await handleTextData()
            const fileResponse = await handleImageData()
            const response = await handleImageAfterText(textResponse.data.data.id, fileResponse.data[0].url)
            router.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (e: any) => {
        if (e.target.name === "Image" && e.target.files[0]) {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) setImagePrivew(reader.result)
            }

            reader.readAsDataURL(e.target.files[0])

            setImagePrivew(e.target.files[0])

            const file = e.target.files[0]
            const blob = file.slice(0, file.size, 'image/png')
            const nameChnagedFile = new File([blob], `${Date.now()}`, { type: 'image/png' })

            setImage(nameChnagedFile)
        } else {
            setBlog({ ...blog, [e.target.name]: e.target.value })
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-3 w-60" onSubmit={(e) => handleSubmit(e)} >
                <input type="text" name="Title" placeholder="Title" onChange={(e) => handleChange(e)} />
                <input type="file" name="Image" onChange={(e) => handleChange(e)} />
                <textarea name="Body" placeholder="Body" onChange={(e) => handleChange(e)} />
                <input type="text" name="shortDescription" placeholder="Short Discription" onChange={(e) => handleChange(e)} />
                <select onChange={(e) => setCategory(+e.target.value)}>
                    <option value="">Category</option>
                    {categories.items.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.attributes.Title}
                        </option>
                    ))}
                </select>
                <button type="submit">Create</button>
            </form>
            <div>
                {imagePreview &&
                    <img src={imagePreview} alt="" />
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> = await fetchCategories()

    return {
        props: {
            categories: {
                items: categories.data
            }
        }
    }
}