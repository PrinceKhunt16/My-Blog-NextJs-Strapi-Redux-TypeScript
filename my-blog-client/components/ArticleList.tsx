import { IArticle } from "../types";
import BlogCard from "./BlogCard";

interface IPropTypes {
    articles: IArticle[]
}

export default function ArticleList({ articles }: IPropTypes) {
    return (
        <div className="grid lg:grid-cols-2 grid-gap gap-6 mt-8">
            {articles.map((article) => {
                return (
                    <div key={article.id}>
                        <BlogCard article={article} />
                    </div>
                );
            })}
        </div>
    )
}