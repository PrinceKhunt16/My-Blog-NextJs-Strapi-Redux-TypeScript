import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Loading from "../components/Loading"
import { IAppContextTypes } from "../types"
import { AppContext } from "./_app"
import UserArticleList from "../components/UserArticleList"

export default function Account() {
    const { user, isLoading, isLoggedIn, setIsLoggedIn } = useContext(AppContext) as IAppContextTypes
    const router = useRouter()
    const [tabs, setTabs] = useState(['Your Blogs', 'About', 'Logout'])
    const [tab, setTab] = useState('Your Blogs')

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
        router.push('/')
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
            router.push('/')
        }
    }, [])

    return (
        <div className="h-full flex items-center justify-center">
            {isLoading && (
                <div className="screen-height flex items-center justify-center">
                    <Loading />
                </div>
            )}
            {isLoggedIn && !isLoading && (
                <div className="w-full my-8">
                    <div className="w-full mb-7 flex rounded-lg">
                        <div className="flex items-center justify-center">
                            <img
                                src={`http://localhost:1337${user.avatarurl}`} alt=""
                                className="w-20 cursor-pointer rounded-full"
                            />
                        </div>
                        <div className="ml-4 flex items-center">
                            <h1 className="font-caveatbrush text-3xl text-gray-600">{user.username}</h1>
                        </div>
                    </div>
                    <ul className="w-full borderbottom pb-3 my-3 flex items-center justify-start gap-4">
                        {
                            tabs.map((t, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className={
                                            `${t === tab
                                                ? 'text-primary'
                                                : 'text-gray-600'
                                            } cursor-pointer`
                                        }
                                        onClick={() => setTab(t)}
                                    >
                                        {t}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {tab === 'Your Blogs' &&
                        <div>
                            {user.articles &&
                                <UserArticleList
                                    articles={user.articles}
                                />
                            }
                        </div>
                    }
                    {tab === 'About' &&
                        <div>
                            <div className="mt-3 max-w-[350px] text-sm font-medium">
                                <p className="text-gray-600">{user.about}</p>
                            </div>
                            <div className="mt-3 text-sm font-medium">
                                <p className="text-gray-600">My email id is {user.email}</p>
                            </div>
                        </div>
                    }
                    {tab === 'Logout' &&
                        <div>
                            <div className="mt-3 max-w-[345px] text-sm font-medium">
                                <p className="text-gray-600">If you wanna log out so you can click the below button. But you don't worry your data would be get when you do again sign up.</p>
                            </div>
                            <button onClick={() => handleLogout()} className="text-gray-700 mt-4 h-[40px] w-20 text-xs font-bold rounded-full bg-[#53bd9560]">LOGOUT</button>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}