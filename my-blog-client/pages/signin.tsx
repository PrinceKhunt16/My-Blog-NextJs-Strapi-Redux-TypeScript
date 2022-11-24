import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { IAppContextTypes } from "../types"
import { checkEmail, checkText } from "../utils"
import { AppContext } from "./_app"

export default function Signup() {
    const { isLoggedIn } = useContext(AppContext) as IAppContextTypes
    const router = useRouter()
    const [avatar, setAvatar] = useState<string | Blob>('')
    const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>(null)
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        username: '',
        about: ''
    })

    const handleTextData = async () => {
        const data = new FormData()

        data.set("username", user.username)
        data.set("firstname", user.firstname)
        data.set("lastname", user.lastname)
        data.set("email", user.email)
        data.set("password", user.password)
        data.set("about", user.about)

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
            }
        }

        const response = await axios.post(`http://localhost:1337/api/auth/local/register`, data, config)
        return response
    }

    const handleImageData = async () => {
        const data = new FormData()
        data.append('files', avatar)

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
            }
        }

        const response = await axios.post(`http://localhost:1337/api/upload`, data, config)
        return response
    }

    const handleImageAfterText = async (id: number, url: string) => {
        const data = new FormData()
        data.set("avatarurl", url)

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
            }
        }

        const response = await axios.put(`http://localhost:1337/api/users/${id}`, data, config)
        return response
    }

    const checkUserData = () => {
        const email = checkEmail(user.email)
        const password = checkText(user.password, 8, 20)
        const about = checkText(user.about, 60, 150)
        const username = checkText(user.username, 3, 30)
        const firstname = checkText(user.firstname, 3, 15)
        const lastname = checkText(user.lastname, 3, 15)
        return email && password && about && avatarPreview !== null && username && firstname && lastname 
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!checkUserData()) {
            console.log('snackbar for unvalid user credentials')
            return
        }

        try {
            const textResponse = await handleTextData()
            const fileResponse = await handleImageData()
            const response = await handleImageAfterText(textResponse.data.user.id, fileResponse.data[0].url)

            router.push('/signup')
        } catch (e) {
            console.log('snackbar for error')
        }
    }

    const handleChange = (e: any) => {
        if (e.target.name === "avatar" && e.target.files[0]) {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) setAvatarPreview(reader.result)
            }

            reader.readAsDataURL(e.target.files[0])

            setAvatar(e.target.files[0])
            const file = e.target.files[0]
            const blob = file.slice(0, file.size, 'image/png')
            const nameChnagedFile = new File([blob], `${Date.now()}`, { type: 'image/png' })

            setAvatar(nameChnagedFile)
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            router.push('/')
        }
    }, [])

    return (
        <>
            {
                !isLoggedIn &&
                <div className="screen-height h-full flex items-center justify-center">
                    <div className="w-[400px] my-20 rounded-lg bg-[#53bd9530]">
                        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col p-8">
                            <h1 className="font-caveatbrush text-2xl text-center text-gray-600 mb-6">Sign in</h1>
                            <input className="bg-transparent mb-5 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} />
                            <input className="bg-transparent mb-5 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="text" name="firstname" placeholder="Firstname" onChange={(e) => handleChange(e)} />
                            <input className="bg-transparent mb-5 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="text" name="lastname" placeholder="Lastname" onChange={(e) => handleChange(e)} />
                            <div className="signin flex gap-2">
                                {avatarPreview &&
                                    <img className="h-10 w-10 rounded-full object-cover border border-[#53bd95]" src={avatarPreview} alt="" />
                                }
                                <input className="mb-5 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="file" name="avatar" onChange={(e) => handleChange(e)} />
                            </div>
                            <input className="bg-transparent mb-5 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="text" name="email" placeholder="Email" onChange={(e) => handleChange(e)} />
                            <input className="bg-transparent mb-5 px-2 h-10 focus:outline-none text-gray-600 border border-[#53bd95]" type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
                            <textarea className="bg-transparent mb-5 px-2 h-20 focus:outline-none text-gray-600 border border-[#53bd95] resize-none" name="about" placeholder="About" onChange={(e) => handleChange(e)} />
                            <div className="text-gray-600 pb-5 font-medium text-xs">
                                <p>All fiels are required. Username should be minimum 3 and maximum 30 characters. Firstname and Lastname should be minimum 2 and maximum 15 characters. Password should be minimum 8 and maximum 20 characters. About should be minimum 60 and maximum 150 characters. For avatar Image should be jpg file.</p>
                            </div>
                            <div className="mt-5 flex items-center justify-center bottom-0 left-0 w-full p-2">
                                <button type="submit" className="text-gray-700 pt-[2px] h-[42px] w-24 text-sm font-medium rounded-full bg-[#53bd9560]">SIGN IN</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}