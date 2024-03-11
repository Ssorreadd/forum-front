import axios, {AxiosInstance} from "axios";

class BasicApi {
    protected readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: `${import.meta.env.VITE_MEDIA_SERVER}`,
        });
        this.initInterceptor()
    }

    private initInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');

                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                config.headers['Locale'] ='ru';

                return config;
            },
            (error) => {
                return Promise.reject(error)
            }
        )
    }
}

export {BasicApi}
