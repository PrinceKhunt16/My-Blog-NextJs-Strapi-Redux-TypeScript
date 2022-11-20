import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { setCookie } from "../utils"
import { UserContext } from "./_app"

export default function Login() {
    const { setUserData, setIsUser } = useContext(UserContext)
    const router = useRouter()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const data = new FormData()
        data.set("identifier", user.email)
        data.set("password", user.password)

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        const response = await axios.post(`http://localhost:1337/api/auth/local`, data, config)
        
        const { avatarurl, email, username, id } = response.data.user
        const me = { avatarurl, email, username, id }
        
        console.log(response.data.jwt)

        localStorage.setItem('me', JSON.stringify(me))
        
        const localStorageData = localStorage.getItem('me')
        const parsedData = JSON.parse(localStorageData)
        
        setUserData(parsedData)
        setIsUser(true)   
        router.push('/')     
    }

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    return (
        <div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)} className="flex gap-4 flex-col w-64">
                    <input type="text" name="email" placeholder="email" onChange={(e) => handleChange(e)} />
                    <input type="text" name="password" placeholder="password" onChange={(e) => handleChange(e)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}