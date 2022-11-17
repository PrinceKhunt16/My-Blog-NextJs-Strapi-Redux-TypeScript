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
            <Link href={`/article/${article.attributes.Slug}`}>
                <h1 className="text-[28px] font-normal font-caveatbrush text-gray-600 hover:text-primary transition-transform hover:cursor-pointer hover:decoration-gray-500">
                    {article.attributes.Title}
                </h1>
            </Link>
            <div className="flex items-center my-3">
                <div className="flex items-center justify-center mr-2">
                    <Image
                        src={`http://localhost:1337${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
                        alt={article.attributes.Title}
                        height={40}
                        width={40}
                        className="h-10 w-10 object-cover rounded-full"
                    />
                </div>
                <span className="text-sm text-gray-600">
                    {article.attributes.author.data.attributes.firstname}{' '}
                    {article.attributes.author.data.attributes.lastname} on
                    &nbsp;
                    <span className="text-gray-400">
                        {formatDate(article.attributes.createdAt)}
                    </span>
                </span>
            </div>
            <div className="text-gray-500">
                {article.attributes.shortDescription.slice(0, 250)}{' '}
                {article.attributes.shortDescription.length > 250 ? <span className="text-gray-500 text-sm">read more</span> : ''}
            </div>
        </div>
    )
}