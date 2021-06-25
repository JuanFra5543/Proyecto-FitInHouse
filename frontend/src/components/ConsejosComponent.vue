<template>
  <div>
    <table class="rounded-t-lg w-5/6 mx-auto text-gray-100 bg-purple-500">
        <tr class="text-left border-b-2 border-purple-100">
          <th class="px-4 py-3">Descripcion</th>
        </tr>
        <tr v-for="consejo in consejos" :key="consejo._id" class="border-b border-purple-200">
          <td class="px-4 py-3">{{consejo.consejoNombre}}</td>
        </tr>
    </table>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'ConsejosComponent',
  data(){
    return {
      mensaje:false,
      usuario:'',
      codigoUsuario:'',
      cliente:[],
      consejos:[]
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
        this.obtenerConsejos(this.cliente.planAlimenticio._id)
        console.log(this.cliente.planAlimenticio._id)
      }).catch((e) => {
        console.log(e.response);
      });
    },
    obtenerConsejos(planAlim){
      let config = {
        headers: {
        token: this.token,
        },
      }
      this.axios.get(`/consejos/${planAlim}`,config).then(res=>{
        console.log(res.data)
        const x = res.data
        for(var i in x){
            x[i]===null ? delete x[i] : this.consejos.push(x[i])
          }
      })
      .catch(err =>{ 
        console.log(err.response.data);
        this.message = err.response.data.message;
      })
    },
  },
  computed: {
    ...mapState(["token"]),
  },
}
</script>

