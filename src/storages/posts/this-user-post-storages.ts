import {ref} from "vue";
import {Blog} from "../../types/post/blog-type.ts";
import QueryBuilder from "../../helpers/query-builder.ts";
import PostsService from "../../api/service/posts-service.ts";
import {addErrorMessage} from "../error-bus.ts";

export const thisUserPosts = ref<Blog[]>([]);
export const isLoading = ref<boolean>(false);
export const isEnd = ref<boolean>(false)
const cursor = ref<string>('')
const isWorking = ref<boolean>(false);


export const loadThisUserPostsData = (clearCursor: boolean, nickname: string, category: number | null = null, orderName: string | null = null, orderType: string | null = null) => {
    if (isWorking.value){
        return
    }


    if (clearCursor) {
        isLoading.value = false;
        cursor.value = ''
        thisUserPosts.value = []
        QueryBuilder.clear()
    }

    if (cursor.value == null) {
        return
    }

    QueryBuilder.setKey('username', nickname)

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

    isWorking.value = true;

    PostsService.getAllBlogs((QueryBuilder.getQuery()))
        .then((res) => {
            thisUserPosts.value.push(...res.data);
            cursor.value = res.meta.next_cursor
            isEnd.value = cursor.value === null
        })
        .catch((error) => {
            addErrorMessage(error);
        })
        .finally(() => {
            isLoading.value = true;
            isWorking.value = false;
        })


}