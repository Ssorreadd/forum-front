import {ref} from "vue";
import {OpenPost} from "../../types/post/open-post.ts";
import PostsService from "../../api/service/posts-service.ts";
import {addErrorMessage} from "../error-bus.ts";

export const post = ref<OpenPost>();

export const loadPostData = (id: number) => {
    PostsService.viewPost(id)
        .then((res) => {
            post.value = res.data
        })
        .catch((error) => {
            addErrorMessage(error);
        })
}