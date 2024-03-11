import {ref} from "vue";

export const errorMessages = ref<string[]>([]);

export const addErrorMessage = (error: any) => {
    if (error.response && error.response.data && error.response.data.message) {
        errorMessages.value.push(error.response.data.message);
    } else if (error.message) {
        errorMessages.value.push(error.message);
    } else {
        errorMessages.value.push('Unknown error');
    }
};