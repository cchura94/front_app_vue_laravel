import { http } from "./http.js";

export function listarProductos() {
    return http().get("/producto");
}

export function guardarProducto(datos) {
    return http().post("/producto", datos);
}

export function mostrarProducto(id) {
    return http().post(`/producto/${id}`);
}

export function modificarProducto(id, datos) {
    return http().put(`/producto/${id}`, datos);
}

export function eliminarProducto(id) {
    return http().delete(`/producto/${id}`);
}
