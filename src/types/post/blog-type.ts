import {Category} from "./category-type.ts";
import {UserPost} from "./user-post-type.ts";

type Blog = {
    id: number,
    title: string,
    user: UserPost
    category: Category,
    views: string,
    created_at: string
}

export type {Blog}



