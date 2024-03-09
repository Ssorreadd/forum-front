import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {BasicApi} from "./base-api.ts";

abstract class Api extends BasicApi {
    protected abstract url: string;

    protected async get<T>(subUrl: string): Promise<T> {
        try {
            const res: AxiosResponse<T> = await this.axiosInstance.get(`api/${this.url}/${subUrl}`);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to execute GET request: ${error}`);
        }
    }

    protected async post<T>(subUrl: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res: AxiosResponse<T> = await this.axiosInstance.post(`api/${this.url}/${subUrl}`, data, config);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to execute POST request: ${error}`);
        }
    }

    protected async patch<T>(subUrl: string, data: any): Promise<T> {
        try {
            const res: AxiosResponse<T> = await this.axiosInstance.patch(`api/${this.url}/${subUrl}`, data);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to execute PATCH request: ${error}`);
        }
    }

    protected async delete<T>(subUrl: string, data: any): Promise<T> {
        try {
            const res: AxiosResponse<T> = await this.axiosInstance.delete(`api/${this.url}/${subUrl}`, { data });
            return res.data;
        } catch (error) {
            throw new Error(`Failed to execute DELETE request: ${error}`);
        }
    }
}

export { Api }
