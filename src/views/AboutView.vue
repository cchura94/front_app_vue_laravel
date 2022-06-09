<template>
  <div class="about">
    <h1>Mi Perfil</h1>
    {{ perfil }}
  </div>
</template>

<script>
import * as authService from "@/services/auth.service.js"

export default {
  data(){
    return {
      perfil: null
    }
  },
  async mounted(){
    const {data} = await authService.getPerfil();
    this.perfil = data
  }
  
}
</script>
