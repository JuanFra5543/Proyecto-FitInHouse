<template>
  <div>
    <table class="rounded-t-lg w-5/6 mx-auto text-gray-100 bg-green-300">
        <tr class="text-left border-b-2 border-green-100">
          <th class="px-4 py-3">Fecha</th>
          <th class="px-4 py-3">Menu</th>
          <th class="px-4 py-3">Cambiar</th>
        </tr>
        <tr v-for="diaMenu in mesMenu" :key="diaMenu._id" class="border-b border-green-200">
          <td class="px-4 py-3">{{changeFecha(diaMenu.cronogramaDia)}}</td>
          <td class="px-4 py-3">{{diaMenu.menu.menuNombre}}</td>
          <td class="px-4 py-3"> <router-link :to="navigation.href+diaMenu._id" class="bg-green-400 border rounded p-1 hover:border-green-500 cursor-pointer" >Cambiar</router-link> </td>
        </tr>
    </table>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

const navigation = { href: '/inicio/'}

export default {
    name: 'MenuComponent',
        data(){
      return {
        navigation,
        mensaje:false,
        usuario:'',
        codigoUsuario:'',
        cliente:[],
        mesMenu:[]
      }
    },
    created(){
      this.getUser()
    },
    methods: {
      ...mapActions(['getUserLogged']),
      async getUser(){
        this.usuario = JSON.parse(await this.getUserLogged())
        this.codigoUsuario = this.usuario.state.userDB.data.usuarioCodigo
        this.obtenerCliente(this.codigoUsuario)
      },
      obtenerCliente(codigo){
          let config = {
            headers: {
              token: this.token,
            },
          };
          this.axios.get(`/cliente/codigoUnico/${codigo}`,config).then(res=>{
            this.cliente = res.data
            this.obtenerCronograma(this.cliente.planAlimenticio._id)
          }).catch((e) => {
              console.log(e.response);
            });
        },
      obtenerCronograma(planAlim){
        let config = {
          headers: {
            token: this.token,
          },
        }
        this.axios.get(`/cronograma/cliente/${planAlim}`,config).then(res=>{
            const x = res.data
            console.log(this.mesMenu)
            for(var i in x){
                x[i]===null ? delete x[i] : this.mesMenu.push(x[i])
              }
            console.log(this.mesMenu)
          })
          .catch(err =>{ 
            console.log(err.response.data);
            this.message = err.response.data.message;
            })
      },
      changeFecha(date){
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          return new Date(date).toLocaleDateString(undefined, options)
      },
    },
    computed: {
    ...mapState(["token"]),
    },
}
</script>
