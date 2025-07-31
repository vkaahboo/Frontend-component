import axios from "axios";
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

//interceptor de la peticion
axiosInstance.interceptors.request.use(
    (config) => {
        const accesToken = localStorage.getItem("token");
        if(accesToken) {
            config.headers.Authorization = `Bearer ${accesToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//interceptor de la respuesta
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            if(error.response.status === 401) {
                //aqui me redirecciona al login
                window.location.href = "/login";
            } else if (error.response.status === 500){
                console.error("Error de Servidor. Por favor intenta de nuevo mas tarde.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.log("Tiempo de espera de la solicitud agotada. Por favor intente de nuevo.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;