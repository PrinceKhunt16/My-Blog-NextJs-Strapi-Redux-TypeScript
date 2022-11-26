import Link from "next/link"
import { IArticleAttribute } from "../types"
import { formatDate } from "../utils"

interface IPropType {
    article: IArticleAttribute
}

export default function UserBlogCard({ article }: IPropType) {
    return (
        <div>
            <Link href={`/article/${article.Slug}`}>
                <h1 className="text-[28px] font-normal font-caveatbrush text-gray-600 hover:text-primary transition-transform hover:cursor-pointer leading-8 hover:decoration-gray-500">
                    {article.Title.slice(0, 95)}
                </h1>
            </Link>
            <div className="flex items-center mt-2 mb-1">
                <span className="text-sm text-gray-600">
                    You on {" "}
                    <span className="text-gray-400">
                        {formatDate(article.createdAt)}
                    </span>
                </span>
            </div>
            <div className="flex mt-1">
                <div className="mr-3">
                    <div className="text-gray-500">
                        {article.shortDescription.slice(0, 300)}{' '}
                        {article.shortDescription.length > 300 ? <span className="text-gray-500 text-sm">read more</span> : ''}
                    </div>
                </div>
                <div className="max-w-[150px] max-h-[100px] bg-[#53bd9525]">
                    <img className="h-full w-full object-cover" src={`http://localhost:1337${article.imageurl}`} alt="" />
                </div>
            </div>
        </div>
    )
}