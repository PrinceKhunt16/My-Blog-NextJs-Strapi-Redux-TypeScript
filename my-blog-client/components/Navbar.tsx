import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex item-center justify-between py-4 boxshadow-fullwidth">
            <Link href="/">
                <div className="flex items-center cursor-pointer">
                    <span className="text-3xl text-primary font-caveatbrush">
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
            </ul>
            <ul className="flex items-center gap-7">
                <li className="text-primary">
                    <a href="#" className="hover:text-gray-400">
                        Log in
                    </a>
                </li>
                <li className="text-gray-600">
                    <a
                        href="#"
                        className="rounded-sm text-primary transition-all">
                        Sign up
                    </a>
                </li>
            </ul>
        </nav>
    )
}