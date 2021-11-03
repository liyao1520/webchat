import axios from "axios";

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000,
  });
  //请求拦截器
  instance.interceptors.request.use(
    (config) => {
      if (window.localStorage.getItem("token")) {
        config.headers.Authorization = "Bearer " + window.localStorage.getItem("token");
      }
      return config;
    },
    (error) => {
      console.log(error);
    }
  );
  //响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (error) => {
      console.log(error);
    }
  );
  //发送真正的网络请求
  return instance(config);
}
