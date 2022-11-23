import Link from "next/link"
import { useContext } from "react"
import { AppContext } from "../pages/_app"

export default function Navbar() {
    const { isLoggedIn, user } = useContext(AppContext)

    return (
        <nav className="flex item-center justify-between py-3 boxshadow-fullwidth">
            <Link href="/">
                <div className="flex items-center cursor-pointer">
                    <span className="text-[32px] text-primary font-caveatbrush">
                        My Blog
                    </span>
                </div>
            </Link>
            <ul className="flex items-center gap-5">
                <li className="text-gray-600">
                    <a href="/">Blogs</a>
                </li>
                <li className="text-gray-600">
                    <a href="#">Community</a>
                </li>
                <li className="text-gray-600">
                    <a href="#">About</a>
                </li>
                <li className="text-gray-600">
                    <a href="#">Learn</a>
                </li>
                <li className="text-gray-600">
                    <a href="/write">Write</a>
                </li>
            </ul>
            <ul className="flex items-center">
                {
                    isLoggedIn ?
                        (
                            <>
                                <li>
                                    <a href="/account">
                                        <div>
                                            <img
                                                src={`http://localhost:1337${user.avatarurl}`} alt=""
                                                className="w-10 h-10 cursor-pointer rounded-full"
                                            />
                                        </div>
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <ul className="flex items-center gap-5">
                                    <li className="text-gray-600">
                                        <a href="/signin">
                                            Sign in
                                        </a>
                                    </li>
                                    <li className="text-gray-600">
                                        <a href="/signup">
                                            Sign up
                                        </a>
                                    </li>
                                </ul>
                            </>
                        )
                }
            </ul>
        </nav>
    )
}