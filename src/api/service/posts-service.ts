import {Api} from "../api.ts";
import {reactive} from "vue";

class PostsService extends Api {
    protected url: string = 'blogs';

    public getAllBlogs(query: string){
        return this.get(`?${query}`);
    }
}

export default reactive(new PostsService())