<template>
  <div>
    <div class="container mt-4 my-6 py-6">
        <router-link :to="navigation.href" class="bg-red-600 border rounded px-8 py-2 hover:border-red-800 cursor-pointer mx-10 text-white">Atras</router-link>
        <div class="grid ml-40 -mr-40 h-40 w-3/4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in planesAlim" :key="item.planAlimNombre"  class="card h-36 pt-6 my-2 mx-12 px-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                    <h1 class="text-lg mb-2 font-bold"><router-link :to="'revisar/'+item._id">{{item.planAlimNombre}}</router-link></h1>
                    <p>{{item.planAlimDesc}}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const navigation = { href: '/cronograma'}


export default {
  data(){
      return {
          navigation,
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