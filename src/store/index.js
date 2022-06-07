import { createStore } from 'vuex'

export default createStore({
  state: {
    contador: 0,
    usuario: null
  },
  getters: {
  },
  mutations: {
    aumentar(state) {
      state.contador++;
    },
    login(state, datos_usuario){
      state.usuario = datos_usuario
    }
  },
  actions: {
    incrementarContador(context){
      context.commit("aumentar")
    },
    ingresarVuex(context, datos_usuario){
      context.commit("login", datos_usuario);

    }
  },
  modules: {
  }
})
