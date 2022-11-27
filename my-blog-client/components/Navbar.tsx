import Link from "next/link"
import { useSelector } from 'react-redux'
import { RootState } from "../redux/store"

export default function Navbar() {
    const { data, isSignedIn } = useSelector((state: RootState) => state.user)

    return (
        <nav className="flex item-center justify-between py-3 boxshadow-fullwidth">
            <div className="flex items-center cursor-pointer">
                <span className="text-[32px] text-primary font-caveatbrush">
                    My Blog
                </span>
            </div>
            <ul className="flex items-center gap-5">
                <li className="text-gray-600">
                    <Link href="/">Blogs</Link>
                </li>
                <li className="text-gray-600">
                    <Link href="#">Community</Link>
                </li>
                <li className="text-gray-600">
                    <Link href="#">About</Link>
                </li>
                <li className="text-gray-600">
                    <Link href="#">Learn</Link>
                </li>
                <li className="text-gray-600">
                    <Link href="/write">Write</Link>
                </li>
            </ul>
            <ul className="flex items-center">
                {isSignedIn ?
                        (
                            <>
                                <li>
                                    <Link href='/account'>
                                        <div>
                                            <img
                                                src={`http://localhost:1337${data?.avatarurl}`} alt=""
                                                className="w-10 h-10 cursor-pointer rounded-full"
                                            />
                                        </div>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <ul className="text-transition flex items-center gap-5">
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