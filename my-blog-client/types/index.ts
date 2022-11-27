import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Dispatch, SetStateAction } from "react";

export interface ICategoryAttribute {
  Title: string;
  Slug: string;
}

export interface ICategory {
  id: number;
  attributes: ICategoryAttribute;
}

export interface IImageData {
  data: {
    attributes: {
      url: string;
      formats: {
        small: {
          url: string;
        };
      };
    };
  };
}

export interface IAuthor {
  data: {
    attributes: {
      username: string;
      firstname: string;
      lastname: string;
      avatarurl: string;
      about: string;
      avatar: {
        data: {
          attributes: {
            formats: {
              thumbnail: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export interface IArticleAttribute {
  Title: string;
  Body: string | MDXRemoteSerializeResult;
  Slug: string;
  Image: IImageData;
  imageurl: string;
  createdAt: string;
  author: IAuthor;
  shortDescription: string;
  firstname ?: string;
  lastname ?: string;
}

export interface IArticle {
  id: number;
  attributes: IArticleAttribute;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IResourceMeta {
  pagination: IPagination;
}

export interface ICollectionResponse<T> {
  data: T;
  meta: IResourceMeta;
}

export type TDirection = 1 | -1;

export interface IQueryOptions {
  filters: any;
  sort: any;
  populate: any;
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface IUser {
  avatarurl: string,
  email: string,
  username: string,
  id: string,
  about: string,
  articles: Array<IArticleAttribute>
}
