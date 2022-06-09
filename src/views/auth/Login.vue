<template>
    <!--
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
-->
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'layout/images/logo-' + logoColor + '.svg'" alt="Sakai logo" class="mb-5" style="width:81px; height:60px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="usuario.email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="ingresar()"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
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
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    }

}
</script>

