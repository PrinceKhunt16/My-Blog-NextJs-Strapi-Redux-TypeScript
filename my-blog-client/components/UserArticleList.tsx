import { IArticleAttribute } from "../types"
import UserBlogCard from "./UserBlogCard"

interface IPropTypes {
    articles: IArticleAttribute[]
}

export default function UserArticleList({ articles }: IPropTypes) {
    return (
        <div className="grid xl:grid-cols-2 grid-gap gap-6 mt-8">
            {articles.map((article) => {
                return (
                    <div key={article.Slug}>
                        <UserBlogCard article={article} />
                    </div>
                )
            })}
        </div>
    )
}