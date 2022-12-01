import Image from "next/image"
import Link from "next/link"
import { IArticle } from "../types"
import { formatDate } from "../utils"

interface IPropType {
    article: IArticle
}

export default function BlogCard({ article }: IPropType) {
    return (
        <div>
            <div className="md:block h-[250px] flex items-center justify-center">
                <img className="h-full w-full object-cover" src={`http://localhost:1337${article.attributes.imageurl}`} alt="" />
            </div>
            <div className="w-fit mt-[10px]">
                <Link href={`/article/${article.attributes.Slug}`}>
                    <h1 className="tracking-[0.2px] text-[25px] font-normal font-caveatbrush text-gray-600 hover:text-primary transition-transform hover:cursor-pointer leading-7 hover:decoration-gray-500">
                        {article.attributes.Title.slice(0, 95)}
                    </h1>
                </Link>
            </div>
            <div className="flex items-center mt-2 mb-2">
                <div className="flex items-center justify-center mr-2">
                    <Image
                        src={`http://localhost:1337${article.attributes.author.data.attributes.avatarurl}`}
                        alt={article.attributes.Title}
                        height={40}
                        width={40}
                        className="h-10 w-10 object-cover rounded-full"
                    />
                </div>
                <span className="tracking-[0.2px] text-gray-500 text-sm">
                    {article.attributes.author.data.attributes.firstname}{' '}
                    {article.attributes.author.data.attributes.lastname} on
                    &nbsp;
                    <span className="text-gray-500">
                        {formatDate(article.attributes.createdAt)}
                    </span>
                </span>
            </div>
            <div className="flex">
                <div className="mr-2">
                    <div className="tracking-[0.2px] text-gray-600">
                        {article.attributes.shortDescription.slice(0, 165)}{' '}
                        {article.attributes.shortDescription.length > 165 ? <span className="text-gray-500">more</span> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}