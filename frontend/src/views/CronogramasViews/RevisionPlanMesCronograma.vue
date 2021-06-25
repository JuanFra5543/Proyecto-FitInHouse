<template>
  <div>
    <div class="container mt-4 my-6 py-6 mb-10">
        <router-link :to="navigation.href+'/'+this.$route.params.id" class="bg-red-600 border rounded px-8 py-2 hover:border-red-800 cursor-pointer mx-10 text-white">Atras</router-link>
        <div class="grid place-items-start h-40 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <h1 class="text-2xl mb-2 font-bold place-self-center">{{this.nombreMesSelec}}</h1>

            <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800 col-start-2 col-end-4">
            <tr class="text-left border-b-2 border-gray-300">
                <th class="px-4 py-3">Nombre Plan</th>
                <th class="px-4 py-3">Descripcion</th>
            </tr>       
            <tr class="bg-gray-100 border-b border-gray-200">
                <td class="px-4 py-3">{{planAlim.planAlimNombre}}</td>
                <td class="px-4 py-3">{{planAlim.planAlimDesc}}</td>
            </tr> 
            </table>
        </div>
    </div>

    <table class="rounded-t-lg m-5 w-5/6 mx-auto text-gray-100 bg-gradient-to-l from-green-200 to-green-400">
        <tr class="text-left border-b-2 border-green-100">
          <th class="px-4 py-3">Fecha</th>
          <th class="px-4 py-3">Menu</th>
          <th class="px-4 py-3">Plan Alimenticio</th>
          <th class="px-4 py-3">Ver</th>
        </tr>
        <tr v-for="diaMenu in mesMenu" :key="diaMenu._id" class="border-b border-green-200">
          <td class="px-4 py-3">{{changeFecha(diaMenu.cronogramaDia)}}</td>
          <td class="px-4 py-3">{{diaMenu.menu.menuNombre}}</td>
          <td class="px-4 py-3">{{diaMenu.planAlimenticio.planAlimNombre}}</td>
          <th class="px-4 py-3 "> <router-link :to="this.$route.path+'/'+diaMenu._id" class="bg-blue-400 w-8 border rounded p-1 hover:border-blue-500 cursor-pointer"> Ver </router-link> </th>
        </tr>
    </table>

  </div>
</template>

<script>
import { mapState } from "vuex";

const navigation = { href: '/cronograma/revisar'}

const mesesNavigation = [
    {id: '01', nombreMes: 'Enero'},
    {id: '02', nombreMes: 'Febrero'},
    {id: '03', nombreMes: 'Marzo'},
    {id: '04', nombreMes: 'Abril'},
    {id: '05', nombreMes: 'Mayo'},
    {id: '06', nombreMes: 'Junio'},
    {id: '07', nombreMes: 'Julio'},
    {id: '08', nombreMes: 'Agosto'},
    {id: '09', nombreMes: 'Septiembre'},
    {id: '10', nombreMes: 'Octubre'},
    {id: '11', nombreMes: 'Noviembre'},
    {id: '12', nombreMes: 'Diciembre'},
]


export default {
  data(){
      return {
          navigation,
          mesId:this.$route.params.mes,
          planAlimId: this.$route.params.id,
          mesesNavigation,
          nombreMesSelec:'',
          planAlim:[],
          mesMenu:[],
      }
  },
  created(){
    this.obtenerPlan(this.planAlimId)
    this.nombreMesbyId(this.mesId)
    this.obtenerCronograma(this.planAlimId,this.mesId)
  },
  computed: {
    ...mapState(["token"]),
  },
   methods: {
    obtenerPlan(planAlim){
      let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/planAlim/${planAlim}`,config).then(res=>{
          this.planAlim = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    nombreMesbyId(mes){
        for(var i in this.mesesNavigation){
            if(this.mesesNavigation[i].id === mes){
                this.nombreMesSelec = this.mesesNavigation[i].nombreMes
            }
        }
    },
    obtenerCronograma(planAlim,mes){
        let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/cronograma/${planAlim}/${mes}`,config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.mesMenu.push(x[i])
            }
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })

    },
    changeFecha(date){
        return new Date(date).toLocaleDateString("en-US")
    },
   },
}
</script>