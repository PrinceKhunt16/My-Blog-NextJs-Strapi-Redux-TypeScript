import axios from "axios"
import { useEffect, useState } from "react"
import qs from 'qs'
import Link from "next/link"

interface IPropTypes {
    username: string,
    slug: string
}

interface IPropBlogTypes {
    attributes: {
        Slug: string,
        imageurl: string,
        shortDescription: string
        Title: string
    }
}

export default function DisplayMoreArticle({ username, slug }: IPropTypes) {
    const [blogs, setBlogs] = useState<IPropBlogTypes[]>([])

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

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
            }
        }

        const response = await axios.get(`http://localhost:1337/api/articles?${queryString}`, config)
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
        <div className="flex flex-col">
            {
                blogs?.map((blog: IPropBlogTypes) => {
                    return (
                        <div key={blog.attributes.Slug}>
                            {blog.attributes.Slug !== slug &&
                                <div className="gap-2 py-2">
                                    <img className="object-cover w-full h-[180px]" src={`http://localhost:1337${blog.attributes.imageurl}`} alt="" />
                                    <div>
                                        <Link href={`/article/${blog.attributes.Slug}`}>
                                            <h1 className="text-[26px] pt-1 leading-[30px] font-normal font-caveatbrush text-gray-600 hover:text-primary transition-transform hover:cursor-pointer hover:decoration-gray-500">{blog.attributes.Title}</h1>
                                        </Link>
                                        <div className="text-gray-600 leading-[24px] pt-1">
                                            {blog.attributes.shortDescription.slice(0, 100)}{' '}
                                            {blog.attributes.shortDescription.length > 100 ? <span className="text-gray-600">read more</span> : ''}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}