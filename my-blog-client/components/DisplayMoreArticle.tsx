import axios from "axios"
import { useEffect, useState } from "react"
import qs from 'qs'
import { formatDate } from "../utils"
import Link from "next/link"

interface IPropTypes {
    username: string,
    slug: string
}

export default function DisplayMoreArticle({ username, slug }: IPropTypes) {
    const [blogs, setBlogs] = useState([])

    const getData = async () => {
        const options = {
            sort: ['id:desc'],
            filters: {
                author: {
                    username: username
                },
            }
        }

        const queryString = qs.stringify(options)
        const response = axios.get(`http://localhost:1337/api/articles?${queryString}`)
        return response
    }

    useEffect(() => {
        getData()
            .then((data) => {
                setBlogs(data.data.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <div className="flex flex-col gap-4">
            {
                blogs.map((blog) => {
                    return (
                        <>
                            { blog.attributes.Slug !== slug &&
                                <div key={blog.attributes.id} className="flex gap-2 bg-[#53bd9530] p-2">
                                    <img className="object-cover h-28 w-36" src={`http://localhost:1337${blog.attributes.imageurl}`} alt="" />
                                    <div>
                                        <Link href={`/article/${blog.attributes.Slug}`}>
                                            <h1 className="text-[24px] leading-[26px] font-normal font-caveatbrush text-gray-600 hover:text-primary transition-transform hover:cursor-pointer hover:decoration-gray-500">{blog.attributes.Title}</h1>
                                        </Link>
                                        <div className="text-gray-600 leading-[23px] pt-1">
                                            {blog.attributes.shortDescription.slice(0, 90)}{' '}
                                            {blog.attributes.shortDescription.length > 90 ? <span className="text-gray-600 text-sm">read more</span> : ''}
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    )
                })
            }
        </div>
    )
}