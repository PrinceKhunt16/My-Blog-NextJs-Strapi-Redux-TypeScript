import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react"
import { UserContext } from "./_app";

export default function Signup() {
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('')
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        username: '',
        about: ''
    })
    const router = useRouter()
    const { setUserData, setIsUser } = useContext(UserContext)

    const handleTextData = async () => {
        const data = new FormData()

        data.set("username", user.username)
        data.set("firstname", user.firstname)
        data.set("lastname", user.lastname)
        data.set("email", user.email)
        data.set("password", user.password)
        data.set("about", user.about)

        const config = { headers: { "Content-Type": "application/json" } }
        const response = await axios.post(`http://localhost:1337/api/auth/local/register`, data, config)
        return response
    }

    const handleImageData = async () => {
        const data = new FormData()
        data.append('files', avatar)
        const response = await axios.post(`http://localhost:1337/api/upload`, data)
        return response
    }

    const handleImageAfterText = async (id: number, url: string) => {
        const data = new FormData()
        data.set("avatarurl", url)
        const config = { headers: { "Content-Type": "application/json" } }
        const response = await axios.put(`http://localhost:1337/api/users/${id}`, data, config)
        return response
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const textResponse = await handleTextData()
            const fileResponse = await handleImageData()
            const response = await handleImageAfterText(textResponse.data.user.id, fileResponse.data[0].url)

            const { avatarurl, email, username, id } = response.data
            const me = { avatarurl, email, username, id}
            
            localStorage.setItem('me', JSON.stringify(me))
            
            const localStorageData = localStorage.getItem('me')
            const parsedData = JSON.parse(localStorageData)
            
            setUserData(parsedData)
            setIsUser(true)   
            router.push('/')  
        } catch (e) {
            console.log(e)
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

    return (
        <div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)} className="flex gap-4 flex-col w-64">
                    <input type="text" name="username" placeholder="username" onChange={(e) => handleChange(e)} />
                    <input type="text" name="firstname" placeholder="firstname" onChange={(e) => handleChange(e)} />
                    <input type="text" name="lastname" placeholder="lastname" onChange={(e) => handleChange(e)} />
                    <input type="text" name="about" placeholder="about" onChange={(e) => handleChange(e)} />
                    <input type="text" name="email" placeholder="email" onChange={(e) => handleChange(e)} />
                    <input type="text" name="password" placeholder="password" onChange={(e) => handleChange(e)} />
                    <input type="file" name="avatar" onChange={(e) => handleChange(e)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {avatarPreview &&
                    <img src={avatarPreview} alt="" />
                }
            </div>
        </div>
    )
}