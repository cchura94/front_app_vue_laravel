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
        ingresar(){
            this.$store.dispatch('ingresarVuex', this.usuario)
        }
    }

}
</script>
