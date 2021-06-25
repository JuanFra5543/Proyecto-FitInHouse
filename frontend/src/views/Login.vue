<template>
  <div>
    <div class="p-6 max-w-sm mx-auto my-10 bg-gray-200 rounded-xl shadow-md">   
      <div class="flex-auto text-center">
        <h1 class="flex-auto text-xl font-semibold my-2"> INGRESA </h1>
        <form @submit.prevent="login" class="space-y-4">
          <div class="flex flex-col space-y-2">            
            <p class="text-gray-500 text-left">Correo Electronico</p>
            <input class="px-2 rounded h-8" type="email" v-model="usuario.usuarioMail" placeholder="Ingrese su email">
            <p class="text-gray-500 text-left">Contraseña</p>
            <input class="px-2 rounded h-8" type="text" v-model="usuario.usuarioPassword" placeholder="Ingrese su Contraseña">
          </div>
          <button class="py-2 px-12 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-opacity-75" type="submit">INGRESAR</button>
        </form>
      </div>
      <div class="mt-10" >
          <router-link to="/creacionUsuario">Crear Nuevo Usuario</router-link>
      </div>
    </div>  
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  data(){
    return {
      mensaje:false,
      usuario:{
        usuarioMail:'', usuarioPassword:'',
        message:'',
      },
      userData:''
    }
  },
  methods: {
    ...mapActions(['guardarUsuario','setUserLogged','getUserLogged']),
    login(){
      this.axios.post('/login',this.usuario).then(res=>{
        const token = res.data.token;
        this.guardarUsuario(token);
        this.guardarUserData();
      }).catch(err =>{ 
          console.log(err.response.data);
          this.usuarios.message = err.response.data.message;
          alert(this.usuarios.message)
        })
    },
    guardarUserData(){
      this.userData = this.usuario.usuarioMail
      this.setUserLogged(this.userData)
    }
  }
}
</script>
