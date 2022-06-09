import axios from "axios"
import router from '../router';

export const urlbase = "http://127.0.0.1:8000/api";

export function http(){

    let token = localStorage.getItem("access_token")
    

    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
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
                // window.location.href = "/login";
                // this.$router.push("/about")
                router.push("/login")
            }
        }
    )

    return interceptor;
}