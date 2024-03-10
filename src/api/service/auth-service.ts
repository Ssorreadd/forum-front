import {Api} from "../api.ts";
import {AuthUser, RegistrationUser} from "../../types/auth-user.ts";
import {reactive} from "vue";

class AuthService extends Api {
    protected url: string = 'auth'

    public login(user: AuthUser){
        return this.post('login', {
            locale: user.locale,
            email: user.email,
            password: user.password
        })
    }
    public registration(user: RegistrationUser){
        return this.post('registration', {
            username: user.username,
            email: user.email,
            password: user.password
        })
    }
    public logout(){
        return this.post('logout', {});
    }
}

export default reactive(new AuthService())