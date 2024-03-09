import axios, {AxiosInstance} from "axios";

interface AxiosConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
}

class BasicApi {
    protected readonly axiosInstance: AxiosInstance;

    constructor(config: AxiosConfig) {
        this.axiosInstance = axios.create(config);
        this.initInterceptor();
    }

    private initInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}

export { BasicApi };