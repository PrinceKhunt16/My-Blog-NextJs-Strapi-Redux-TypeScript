import { IArticle } from "../types";
import BlogCard from "./BlogCard";

interface IPropTypes {
    articles: IArticle[] | null
}

export default function ArticleList({ articles }: IPropTypes) {
    return (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-gap gap-5 mt-8">
            {articles?.map((article) => {
                return (
                    <div key={article.id}>
                        <BlogCard article={article} />
                    </div>
                )
            })}
        </div>
    )
}