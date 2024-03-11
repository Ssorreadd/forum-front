import {ref} from "vue";
import {User} from "./user.ts";
import UsersService from "../api/service/users-service.ts";
import {addErrorMessage} from "./error-bus.ts";

export const user = ref<User>();

export const loadThisUserData = async () => {
    await UsersService.getThisUser()
        .then((res) => {
            user.value = res.data;
        })
        .catch((error) => {
            addErrorMessage(error);
        })
}