import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "./_app"

export default function Account() {
    const { setUserData, setIsUser } = useContext(UserContext)
    const data = useContext(UserContext)
    const router = useRouter()

    const handleLogout = () => {
        setTimeout(() => {
            localStorage.removeItem('me')
            setUserData({})
            setIsUser(false)
        }, 1500)

        router.push('/')
    }

    return (
        <div className="account flex items-center justify-center">
            <div className="relative w-80 h-96 p-8 rounded-lg bg-[#53bd9530]">
                <div className="flex items-center justify-center">
                    <img
                        src={`http://localhost:1337${data.userData.avatarurl}`} alt=""
                        className="w-28 h-28 cursor-pointer rounded-full"
                    />
                </div>
                <h1 className="pt-5 font-caveatbrush text-2xl text-center text-gray-600">{data.userData.username}</h1>
                <h2 className="pt-2 font-caveatbrush text-2xl text-center text-gray-600">{data.userData.email}</h2>
                <div className="absolute h-28 flex items-center justify-center bottom-0 left-0 w-full p-2">
                    <button onClick={() => handleLogout()} className="text-gray-700 pt-[2px] h-11 w-28 text-sm font-medium rounded-full border border-gray-600 bg-transparent">LOGOUT</button>
                </div>
            </div>
        </div>
    )
}