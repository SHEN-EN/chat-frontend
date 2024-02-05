import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";
import router from "@/router";
import { ElMessageBox } from "element-plus";
const whilePath = ["/user/login", "/user/reigster"];
const axiosInstance = axios.create({
    baseURL: "/v1",
});
axiosInstance.interceptors.request.use(
    (config) => {

        if (!whilePath.includes(config.url as string)) {
            config.headers["authorization"] =`Bearer ${localStorage.getItem('authorization')}` ;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        const { code } = response.data;

        if (code === 200) {
            return response.data;
        }

        return Promise.reject(response.data);
    },
    (error: AxiosError) => {
        const { status } = error.response as AxiosResponse;
        let model = null

        if (status === 401 && !model) {
            model = ElMessageBox.confirm("登录状态已过期,请重新登录", "提示", {
                confirmButtonText: "确认",
                type: "warning",
                showCancelButton: false,
            }).then(() => {
                router.push({
                    name: "login",
                });
            });
        }

        if (status === 500 && !model) {
            model = ElMessageBox.confirm("服务器错误", "提示", {
                confirmButtonText: "确认",
                type: "warning",
                showCancelButton: false,
            });
        }

        return Promise.reject(error);
    }
);
export default axiosInstance;
