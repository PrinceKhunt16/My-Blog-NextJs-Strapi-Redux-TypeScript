import Link from "next/link"
import { IArticleAttribute } from "../types"
import { formatDate } from "../utils"

interface IPropType {
    article: IArticleAttribute
}

export default function UserBlogCard({ article }: IPropType) {
    return (
        <div className="relative">
            <div className="md:block h-[250px] flex items-center justify-center">
                <img className="h-full w-full object-cover" src={`http://localhost:1337${article.imageurl}`} alt="" />
            </div>
            <div className="w-fit mt-[10px]">
                <Link href={`/article/${article.Slug}`}>
                    <h1 className="tracking-[0.2px] text-[25px] font-normal font-caveatbrush text-gray-600 hover:text-primary transition-transform hover:cursor-pointer leading-8 hover:decoration-gray-500">
                        {article.Title.slice(0, 95)}
                    </h1>
                </Link>
            </div>
            <div className="flex items-center mt-2 mb-2">
                <span className="tracking-[0.2px] text-sm text-gray-600">
                    You on {" "}
                    <span className="text-gray-500">
                        {formatDate(article.createdAt)}
                    </span>
                </span>
            </div>
            <div className="flex mt-1">
                <div className="mr-3">
                    <div className="text-gray-600 tracking-[0.2px]">
                        {article.shortDescription.slice(0, 160)}{' '}
                        {article.shortDescription.length > 160 ? <span className="text-gray-600">&nbsp;read more</span> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}