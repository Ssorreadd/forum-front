import {ref} from "vue";
import PostsService from "../../api/service/posts-service.ts";
import {addErrorMessage} from "../error-bus.ts";
import {Blog} from "../../types/post/blog-type.ts";
import QueryBuilder from "../../helpers/query-builder.ts";

export const posts = ref<Blog[]>([]);
export const isEnd = ref<boolean>(false)
const cursor = ref<string>('')

export const loadPostsData = (clearCursor: boolean, category: number | null = null, orderName: string | null = null, orderType: string | null = null) => {
    if (clearCursor) {
        cursor.value = ''
        posts.value = []
        QueryBuilder.clear()
    }
    if (cursor.value == null) {
        return
    }

    if (category) {
        QueryBuilder.setKey('category_id', category)
    }
    if (orderType) {
        QueryBuilder.setKey('order_type', orderType)
    }
    if (orderName) {
        QueryBuilder.setKey('search_by', orderName)
    }

    QueryBuilder.setKey('cursor', cursor.value)

    PostsService.getAllBlogs(QueryBuilder.getQuery())
        .then((res) => {
            posts.value.push(...res.data);
            cursor.value = res.meta.next_cursor
            isEnd.value = cursor.value === null
        })
        .catch((error) => {
            addErrorMessage(error);
        })


}