import {ref} from "vue";
import {OpenPost} from "../../types/post/open-post.ts";
import PostsService from "../../api/service/posts-service.ts";
import {addErrorMessage} from "../error-bus.ts";

export const post = ref<OpenPost>();
export const isLoading = ref<boolean>(false);
const isWorking = ref<boolean>(false);

export const loadPostData = (id: number) => {
    if (isWorking.value){
        return
    }

    isLoading.value = false;

    PostsService.viewPost(id)
        .then((res) => {
            post.value = res.data
        })
        .catch((error) => {
            addErrorMessage(error);
        })
        .finally(() => {
            isLoading.value = true;
            isWorking.value = false;
        })
}