import {Category} from "./category-type.ts";
import {User} from "../../storages/user.ts";

type OpenPost = {
    id: number,
    title: string,
    content: string,
    views: string,
    category: Category,
    user: User,
    created_at: string,
    updated_at: string,
}

export type {OpenPost}