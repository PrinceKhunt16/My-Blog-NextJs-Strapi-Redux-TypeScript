import Link from "next/link"
import { useRouter } from "next/router"
import { ICategory } from "../types"
import Image from 'next/image'
import Search from "../images/search.png"
import { useEffect, useState } from "react"

interface IPropTypes {
    categories: ICategory[]
}

let num = 0
let item = 0
let searchLetters = ''

export default function Tabs({ categories }: IPropTypes) {
    const [placeholder, setPlaceholder] = useState('');
    const [count, setCount] = useState(0)
    const router = useRouter()
    const searchItemsArray = ['nodejs', 'python', 'javascript', 'php', 'java'];

    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 800)
        
        if(num == searchLetters.length){
            num = 0
            item += 1

            if(item == searchItemsArray.length){
                item = 0
            }
            
            searchLetters = searchItemsArray[item]
        } else {
            num += 1
        }

        setPlaceholder(searchLetters.substring(0, num))        
        return () => clearTimeout(timer)
    }, [])
    // }, [count])

    const isActiveLink = (category: ICategory) => {
        return category.attributes.Slug === router.query.category
    }

    const handleOnSearch = (query: string) => {

    }

    return (
        <div className="flex items-center justify-between borderbottom">
            <ul className="flex items-center gap-4 mt-4 mb-4">
                <li className={
                    `${router.pathname === '/'
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`
                }>
                    <Link href='#'>Recent</Link>
                </li>
                {
                    categories.map((category) => {
                        return (
                            <li
                                key={category.id}
                                className={
                                    `${isActiveLink(category)
                                        ? 'text-primary'
                                        : 'text-gray-600'
                                    }`
                                }>
                                <Link href={`/category/${category.attributes.Slug}`}>{category.attributes.Title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="flex items-center">
                <Image
                    src={Search}
                    alt="Search"
                    height="16"
                />
                <input
                    onChange={(e) => handleOnSearch(e.target.value)}
                    type="text"
                    placeholder={placeholder}
                    className="outline-none ml-3 pt-0.5 text-gray-600 placeholder:text-gray-600"
                />
            </div>
        </div>
    )
}