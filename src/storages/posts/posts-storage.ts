import {ref} from "vue";
import PostsService from "../../api/service/posts-service.ts";
import {addErrorMessage} from "../error-bus.ts";
import {Post} from "../../types/post/post-type.ts";
import QueryBuilder from "../../helpers/query-builder.ts";

export const posts = ref<Post[]>([]);
export const isEnd = ref<boolean>(false)
const cursor = ref<string>('')

export const loadPostsData = (clearCursor: boolean) => {
    if (clearCursor){
        cursor.value = ''
    }
    if (cursor.value == null){
        return
    }

    QueryBuilder.deleteAllValue('cursor')
    QueryBuilder.setKey('cursor', cursor.value)

    PostsService.getAllPosts(QueryBuilder.getQuery())
        .then((res) => {
            posts.value.push(...res.data);
            cursor.value = res.meta.next_cursor
            isEnd.value = cursor.value == null
        })
        .catch((error) => {
            addErrorMessage(error);
        })
}