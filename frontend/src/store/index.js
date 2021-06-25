import { createStore } from 'vuex'

import router from '@/router/index';
import decode from 'jwt-decode';
import Cookies from "js-cookie";


export default createStore({
  state: {
    token: '',
    userDB: '',
  },
  mutations: {
    obtenerUsuario(state, payload){
      state.token = payload;
      if(payload == '') {
        state.userDB =''
      } else{
        state.userDB = decode(payload);
        //redirigir a la vista principal del usuario 
        state.userDB.data.usuarioRol === 'ADMIN' ? router.push({name:'Clientes'}) : router.push({name:'Inicio'})
      }

    } 

  },
  actions: {
    guardarUsuario({commit},payload){
      localStorage.setItem('token',payload);
      commit('obtenerUsuario',payload);
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', '');
      localStorage.removeItem('token');
      Cookies.remove('userLogged');
      router.push({name: 'Login'});
    },
    leerToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('obtenerUsuario',token);
      }else{
        commit('obtenerUsuario','')
      }
    },
    setUserLogged(userLogged){
      console.log(userLogged)
      Cookies.set('userLogged',userLogged)
    },
    getUserLogged() {
      return Cookies.get('userLogged');
    },
  },
  modules: {
  },

  getters:{
    isActive: state => !!state.token
  }
})
