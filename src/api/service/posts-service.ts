import {Api} from "../api.ts";
import {reactive} from "vue";

class PostsService extends Api {
    protected url: string = 'posts';

    public getAllPosts(cursor: string){
        return this.get(`?${cursor}`);
    }
}

export default reactive(new PostsService())