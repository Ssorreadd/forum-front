import {Api} from "../api.ts";
import {reactive} from "vue";

class UsersService extends Api {
    protected url: string = 'users';

    public getThisUser(){
        return this.get('im');
    }
    public getUsers(){
        return this.get('');
    }
}

export default reactive(new UsersService())