import { http } from "./http.js";

export function loginConLaravel(datos_de_auth){
    return http().post("/auth/login", datos_de_auth);
} 

export function getPerfil(){
    return http().get("/auth/perfil");
} 

export function logout(){
    return http().post("/auth/logout");
} 
