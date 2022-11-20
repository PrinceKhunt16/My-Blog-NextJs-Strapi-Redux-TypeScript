import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../pages/_app";

export default function Navbar() {
    const { isUser, userData } = useContext(UserContext)

    return (
        <nav className="flex item-center justify-between py-3 boxshadow-fullwidth">
            <Link href="/">
                <div className="flex items-center cursor-pointer">
                    <span className="text-[32px] text-primary font-caveatbrush">
                        My Blog
                    </span>
                </div>
            </Link>
            <ul className="flex items-center gap-7">
                <li className="text-gray-600">
                    <a href="#">Products</a>
                </li>
                <li className="text-gray-600">
                    <a href="#">Pricing</a>
                </li>
                <li className="text-gray-600">
                    <a href="#">Docs</a>
                </li>
                <li className="text-gray-600">
                    <a href="#">Company</a>
                </li>
                <li className="text-gray-600">
                    <a href="/create">Create</a>
                </li>
            </ul>
            <ul className="flex items-center gap-7">
                {
                    isUser ?
                        (
                            <>
                                <li>
                                    <a href="/account">
                                        <div>
                                            <img
                                                src={`http://localhost:1337${userData.avatarurl}`} alt=""
                                                className="w-10 h-10 cursor-pointer rounded-full"
                                            />
                                        </div>
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <ul className="flex items-center gap-7">
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