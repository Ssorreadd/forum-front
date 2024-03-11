import {ref} from "vue";
import {Dropdown} from "../types/dropdown.ts";
import CategoryService from "../api/service/category-service.ts";
import {addErrorMessage} from "./error-bus.ts";

export const category = ref<Dropdown[]>([]);

export const loadCategoryData = async () => {
    await CategoryService.getCategory()
        .then((res) => {
            category.value = res.data
        })
        .catch((error) => {
            addErrorMessage(error);
        })
}