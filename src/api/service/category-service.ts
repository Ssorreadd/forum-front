import {Api} from "../api.ts";
import {reactive} from "vue";

class CategoryService extends Api {
    protected url: string = 'categories';

    public getCategory(){
        return this.get('')
    }
}

export default reactive(new CategoryService())