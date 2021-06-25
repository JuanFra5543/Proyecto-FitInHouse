<template>
  <div>
    <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-700 text-gray-200">
      <tr class="text-left border-b border-gray-300">
        <th class="px-4 py-3">{{planAlim.planAlimNombre}}</th>
        <th class="px-4 py-3">{{planAlim.planAlimDesc}}</th>
      </tr>
    </table>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'PlanAlimComponent',
    data(){
      return {
        mensaje:false,
        usuario:'',
        codigoUsuario:'',
        cliente:[],
        planAlim:[]
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
            this.obtenerPlan(this.cliente.planAlimenticio._id)
          }).catch((e) => {
              console.log(e.response);
            });
        },
      obtenerPlan(planAlim){
        let config = {
          headers: {
            token: this.token,
          },
        }
        this.axios.get(`/planAlim/cliente/${planAlim}`,config).then(res=>{
            this.planAlim = res.data;
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
