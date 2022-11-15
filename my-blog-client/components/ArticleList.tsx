import { IArticle } from "../types";
import BlogCard from "./BlogCard";

interface IPropTypes {
    articles: IArticle[]
}

export default function ArticleList({ articles }: IPropTypes) {
    return (
        <div className="grid lg: grid-cols-2 grid-gap gap-16 mt-8">
            {articles.map((article, idx) => {
                return (
                    <div key={article.id}>
                        {/* {idx === 1 ? (
                            <BlogCardWithImage article={article} />
                        ) : ( */}
                            <BlogCard article={article} />
                        {/* )} */}
                    </div>
                );
            })}
        </div>
    )
}