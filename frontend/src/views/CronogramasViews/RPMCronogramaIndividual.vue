<template>
  <div>
    <div class="container mt-4 my-6 py-6 mb-10">
        <router-link :to="navigation.href+'/'+this.$route.params.id+'/'+this.$route.params.mes" class="bg-red-600 border rounded px-8 py-2 hover:border-red-800 cursor-pointer mx-10 text-white">Atras</router-link>

        <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800 col-start-2 col-end-4">
        <tr class="text-left border-b-2 border-gray-300">
            <th class="px-4 py-3">Menu</th>
            <th class="px-4 py-3">Dia</th>
        </tr>       
        <tr class="bg-gray-100 border-b border-gray-200">
            <td class="px-4 py-3">{{nombreMenu}}</td>
            <td class="px-4 py-3">{{changeFecha(diaMenu.cronogramaDia)}}</td>
        </tr> 
        </table>

    </div>

    <table class="rounded-t-lg m-5 w-5/6 mx-auto text-gray-100 bg-gradient-to-l from-green-200 to-green-400">
        <tr class="text-left border-b-2 border-green-100">
            <th class="px-4 py-3">Cliente Nombre</th>
            <th class="px-4 py-3">Edad</th>
            <th class="px-4 py-3">IMC</th>
            <th class="px-4 py-3">Genero</th>
            <th class="px-4 py-3">Calorias a Consumir</th>
        </tr>
        <tr v-for="cliente in clientes" :key=cliente.clienteNombre class="border-b border-green-200">
            <th class="px-4 py-3">{{cliente.clienteNombre}}</th>
            <th class="px-4 py-3">{{cliente.clienteEdad}}</th>
            <th class="px-4 py-3">{{cliente.clienteIMC.$numberDecimal}}</th>
            <th class="px-4 py-3">{{cliente.clienteGenero}}</th>
            <th class="px-4 py-3">{{caloriasConsumirPlan(cliente.clienteCalDiarias.$numberDecimal)}}</th>
        </tr>
        </table>

  </div>
</template>

<script>
import { mapState } from "vuex";

const navigation = { href: '/cronograma/revisar'}

export default {
  data(){
      return {
          navigation,
          mesId:this.$route.params.mes,
          planAlimId: this.$route.params.id,
          cronogramaId: this.$route.params.cid,
          nombreMesSelec:'',
          planAlim:[],
          codigoTipoMenu:'',
          diaMenu:[],
          nombreMenu:'',
          clientes:[],
      }
  },
  created(){
    this.obtenerCronograma(this.cronogramaId)
    this.obtenerClientes(this.planAlimId)
    this.obtenerPlanAlim(this.planAlimId)
  },
  computed: {
    ...mapState(["token"]),
  },
   methods: {
    obtenerCronograma(cronograma){
        let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/cronograma/${cronograma}`,config).then(res=>{
          this.diaMenu = res.data
          this.nombreMenu = this.diaMenu.menu.menuNombre
        
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    changeFecha(date){
        return new Date(date).toLocaleDateString("en-US")
    },
    obtenerClientes(planAlimId){
        let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/cliente/planAlim/${planAlimId}`,config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.clientes.push(x[i])
            }
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    obtenerPlanAlim(planAlim){
      let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/planAlim/${planAlim}`,config).then(res=>{
          console.log(res.data);
          this.planAlim = res.data
          this.codigoTipoMenu = this.planAlim.tipoMenu.tipoMenuCod
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    caloriasConsumirPlan(calCliente){
        var calConsumir
        console.log(this.codigoTipoMenu)
        if(this.codigoTipoMenu === 1){
            calConsumir = calCliente - this.planAlim.tipoMenu.tipoMenuCalorias
        } 
        else if(this.codigoTipoMenu === 2){
            calConsumir = Number(calCliente) + this.planAlim.tipoMenu.tipoMenuCalorias
        } 
        else { 
            calConsumir = calCliente
        }
        return calConsumir
    }
   },
}
</script>