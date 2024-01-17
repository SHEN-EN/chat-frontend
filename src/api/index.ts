import axios  from "axios";
import type {AxiosError,AxiosResponse} from 'axios';
import { useGlobalStore } from "@/stores/global";
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
const router = useRouter()
const whilePath = ["/user/login", "/user/reigster"];
const { authorization } = useGlobalStore();
const axiosInstance = axios.create({
  baseURL: "/v1",
});
axiosInstance.interceptors.request.use(
  (config) => {
    if (!whilePath.includes(config.url as string)) {
      config.headers["authorization"] = authorization;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    const {code} = response.data;

    if(code === 200){
        return response.data;
    }
    
    return Promise.reject(response.data);
  },
  (error: AxiosError) => {

    const { status } = error.response as AxiosResponse;

    if (status === 401) {
        ElMessageBox.confirm(
            '登录状态已过期,请重新登录',
            '提示',
            {
              confirmButtonText: '确认',
              type: 'warning',
              showCancelButton:false
            }
          )
            .then(() => {
                router.push({
                    name: 'login',
                })
            })
        return
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
