import {Api} from "../api.ts";
import {reactive} from "vue";
import {CreateBlog} from "../../types/post/create-blog.ts";

class PostsService extends Api {
    protected url: string = 'blogs';

    public getAllBlogs(query: string){
        return this.get(`?${query}`);
    }
    public createPost(blog: CreateBlog){
        return this.post('create', blog)
    }
    public viewPost(id: number){
        return this.get(`${id}/view`);
    }
}

export default reactive(new PostsService())