<template>
  <div>
    <div class="container mt-4 my-6 py-6 mb-10">
        <router-link :to="navigation.href" class="bg-red-600 border rounded px-8 py-2 hover:border-red-800 cursor-pointer mx-10 text-white">Atras</router-link>
        <div class="grid ml-40 -mr-40 h-40 w-3/4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in mesesNavigation" :key="item.nombreMes"  class="card h-36 pt-6 my-2 h-52 mx-12 px-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                    <h1 class="text-lg mb-2 font-bold"><router-link :to="this.$route.params.id+'/'+item.id">{{item.nombreMes}}</router-link></h1>
                </div>
            </div>
        </div>
    </div>
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
          mesesNavigation,
          planesAlim:[],
      }
  },
  created(){
    this.obtenerPlanes()
  },
  computed: {
    ...mapState(["token"]),
  },
   methods: {
    obtenerPlanes(){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios.get('/planAlim',config).then(res=>{
          console.log(res.data);
          this.planesAlim = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
   },
}
</script>