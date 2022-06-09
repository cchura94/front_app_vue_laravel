<template>
    <h1>Ingresar</h1>
    <h2>{{ $store.state.contador }}</h2>
    <button @click="incrementar()">+</button>

    <br>

    <label for="">Ingrese Correo</label>
    <input type="email" v-model="usuario.email">
    <br>
    <label for="">Ingrese Contraseña</label>
    <input type="password" v-model="usuario.password">
    <br>
    <button @click="ingresar()">Ingresar</button>

    <h1>{{ $store.state.usuario }}</h1>
  
</template>

<script>
import * as authService from "@/services/auth.service.js"

export default {
    data(){
        return {
            usuario: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        incrementar(){
            this.$store.dispatch('incrementarContador')
        },
        async ingresar(){
            try{
                const {data} = await authService.loginConLaravel(this.usuario);
                // console.log(data)
                let token = data.access_token
                localStorage.setItem("access_token", token)
                this.$store.dispatch('ingresarVuex', data)
                this.$router.push("/about")
            }catch(error){
                console.log("*********: ", error.message);
            }
        }
    }

}
</script>
