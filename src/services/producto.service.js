import { http } from "./http.js";

export function listarProductos(page=1, rows) {
    // const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : '';
    
    return http().get("/producto?page="+page+"&rows="+rows);

    
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

export function actualizarImagen(fd){
    return http().post(`/producto/actualizar-imagen`, fd);

}