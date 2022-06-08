import axios from "axios"

export const urlbase = "http://127.0.0.1:8000/api";

export function http(){
    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer token'
        },
        timeout: 15000
    });

    // interceptar errores 401, 403
    interceptor.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("******** INTERCEPTANDO *******");
            if(error.response.status === 401){
                window.location.href = "/login";
            }
        }
    )

    return interceptor;
}