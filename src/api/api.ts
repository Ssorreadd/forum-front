import  { AxiosRequestConfig} from "axios";
import {BasicApi} from "./base-api.ts";

abstract class Api extends BasicApi {
    protected abstract url: string;

    protected async get(subUrl: string) {
        let res = await this.axiosInstance.get(`api/${this.url}/${subUrl}`);
        return await res.data;
    }
    protected post(subUrl: string, data: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.post(`api/${this.url}/${subUrl}`, data, config)
    }

    protected patch(subUrl: string, data: any) {
        return this.axiosInstance.patch(`api/${this.url}/${subUrl}`, data)
    }

    protected delete(subUrl: string, data: any) {
        return this.axiosInstance.delete(`api/${this.url}/${subUrl}`, { data })
    }
}

export { Api }

