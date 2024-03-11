import {loadCategoryData} from "../storages/category-storage.ts";
import {loadThisUserData} from "../storages/users-storages.ts";

const initializeClientData = async () => {
    await Promise.all([
        loadCategoryData(),
        loadThisUserData(),
    ])
}

export default initializeClientData;
