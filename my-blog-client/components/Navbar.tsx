import Link from "next/link"
import { useSelector } from 'react-redux'
import { RootState } from "../redux/store"

export default function Navbar() {
    const { data, isUser } = useSelector((state: RootState) => state.user)

    return (
        <nav className="flex item-center justify-between py-3 boxshadow-fullwidth">
            <div className="flex items-center">
                <span className="text-[32px] text-primary font-caveatbrush">
                    My Blog
                </span>
            </div>
            <ul className="tracking-[0.2px] flex items-center gap-5">
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
                {isUser ?
                        (
                            <>
                                <li>
                                    <Link href='/account'>
                                        <div>
                                            <img
                                                src={`http://localhost:1337${data?.avatarurl}`} alt=""
                                                className="w-10 h-10 cursor-pointer object-cover rounded-full"
                                            />
                                        </div>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <ul className="flex items-center gap-5 tracking-[0.2px]">
                                    <li className="text-gray-600">
                                        <Link href="/signin">
                                            Sign in
                                        </Link>
                                    </li>
                                    <li className="text-gray-600">
                                        <Link href="/signup">
                                            Sign up
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )
                }
            </ul>
        </nav>
    )
}