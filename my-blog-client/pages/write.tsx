import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ICategory, ICollectionResponse } from "../types"
import Loading from "../components/Loading"
import { checkText, isJWTIsValid } from "../utils"
import Toast from "../components/Toast"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { writeImage, writeUserText } from "../redux/slices/write"
import { logout } from "../redux/slices/user"

interface IPropTypes {
    categories: {
        items: ICategory[]
    }
}

export default function Write({ categories }: IPropTypes) {
    const { isUser, isLoading } = useSelector((state: RootState) => state.user)
    const { error, message } = useSelector((state: RootState) => state.write)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const [dis, setDis] = useState<boolean>(false)
    const [image, setImage] = useState<string>('')
    const [imagePreview, setImagePrivew] = useState<string | ArrayBuffer | null>(null)
    const [blog, setBlog] = useState({ Title: '', Body: '', shortDescription: '', imageurl: '', Slug: '', Category: '0', author: -1 })

    const checkUserData = () => {
        const title = checkText(blog.Title, 10, 150)
        const body = checkText(blog.Body, 300, 20000)
        const shortDescription = checkText(blog.shortDescription, 150, 300)
        const category = blog.Category === '0'

        if (imagePreview === null) Toast('For Blog Image choosen file should be jpg file.')
        if (!title) Toast('Title should be 10 to 150 characters.')
        if (!shortDescription) Toast('Short Description should be 130 to 300 characters.')
        if (!body) Toast('Body should be minimum 300 characters.')
        if (category) Toast('Category should be selected.')

        return title && body && shortDescription && category && imagePreview !== null
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setDis(true)

        if (!checkUserData()) {
            setDis(false)
            return
        }

        const dummy = blog.Title
        const slug = dummy.split(' ').map(str => str.toLowerCase()).join('-')
        blog.Slug = slug

        if (!isJWTIsValid()) {
            localStorage.removeItem('jwt')
            dispatch(logout())
            router.push('/signup')
        } else {
            await dispatch(writeUserText(blog))
            await dispatch(writeImage(image))
        }
    }

    const handleChange = (e: any) => {
        console.log(e.target.name)
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

    useEffect(() => {
        if (dis) {
            if (error) {
                setDis(false)
                Toast(error)
            }

            if (message === 'Your blog has been posted.') {
                Toast(message)
                setDis(false)
                router.push('/')
            }
        }
    }, [error, message])

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
            router.push('/')
        }
    }, [])

    return (
        <div className="screen-height flex items-center justify-center">
            {isLoading && (
                <div className="screen-height flex items-center justify-center">
                    <Loading />
                </div>
            )}
            {isUser && !isLoading && (
                <div className="w-[420px] my-20 rounded-lg bg-[#53bd9530]">
                    <form className="flex flex-col p-8" onSubmit={(e) => handleSubmit(e)} >
                        <h1 className="tracking-[0.2px] font-caveat text-3xl text-center text-gray-700 mb-6">Write Blog</h1>
                        <input className="tracking-[0.2px] bg-transparent mb-1 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="text" name="Title" placeholder="Title" onChange={(e) => handleChange(e)} />
                        <p className="text-gray-600 mb-4 font-semibold text-xs">Title should be 10 to 150 characters.</p>
                        <div className="signin flex gap-2">
                            {imagePreview &&
                                <img className="h-10 w-20 object-cover border border-[#53bd95]" src={imagePreview} alt="" />
                            }
                            <input className="mb-1 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="file" name="Image" onChange={(e) => handleChange(e)} />
                        </div>
                        <p className="text-gray-600 mb-4 font-semibold text-xs">Blog Image should be jpg file.</p>
                        <input className="tracking-[0.2px] bg-transparent mb-1 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="text" name="shortDescription" placeholder="Short Discription" onChange={(e) => handleChange(e)} />
                        <p className="text-gray-600 mb-4 font-semibold text-xs">Short Description should be 130 to 300 characters.</p>
                        <textarea className="tracking-[0.2px] write-textarea bg-transparent mb-1 px-2 h-28 focus:outline-none text-gray-600 border border-[#53bd95] resize-none" name="Body" placeholder="Body" onChange={(e) => handleChange(e)} />
                        <p className="text-gray-600 mb-4 font-semibold text-xs">Body should be minimum 300 characters. </p>
                        <select className="tracking-[0.2px] bg-transparent mb-1 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" name="Category" onChange={(e) => handleChange(e)}>
                            <option className="bg-[#53bd9530]" value="0">Category</option>
                            {categories.items.map((category) => {
                                return (
                                    <option className="bg-[#53bd9530]" key={category.id} value={category.id}>
                                        {category.attributes.Title}
                                    </option>
                                )
                            })}
                        </select>
                        <p className="text-gray-600 mb-4 font-semibold text-xs">Category should be selected.</p>
                        <div className="mt-5 flex items-center justify-center bottom-0 left-0 w-full p-2">
                            <button className={` ${dis && 'disabled'} text-gray-700 tracking-[0.2px] mt-4 h-[40px] w-20 text-xs font-bold rounded-full bg-[#53bd9560]`} type="submit">POST</button>
                        </div>
                    </form>
                </div>
            )
            }
        </div>
    )
}

export async function getServerSideProps() {
    const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`)

    return {
        props: {
            categories: {
                items: categories.data
            }
        }
    }
}