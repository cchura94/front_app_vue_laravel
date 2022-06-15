import { http } from "./http.js";

export function listarCategorias() {
    return http().get("/categoria");
}

export function guardarCategoria(datos) {
    return http().post("/categoria", datos);
}

export function mostrarCategoria(id) {
    return http().post(`/categoria/${id}`);
}

export function modificarCategoria(id, datos) {
    return http().put(`/categoria/${id}`, datos);
}

export function eliminarCategoria(id) {
    return http().delete(`/categoria/${id}`);
}
