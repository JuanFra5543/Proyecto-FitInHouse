<template>
  <div>
    <div class="container mt-4 my-6 py-6">
        <div class="grid ml-40 -mr-40 h-40 w-1/2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div v-for="item in navigation" :key="item.name"  class="card h-36 pt-6 place-self-center my-2 h-30 mx-12 px-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="item.icono">
                    </svg>
                    <h1 class="text-lg mb-2"><router-link :to="item.href">{{item.name}}</router-link></h1>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const navigation = [
    { name: 'Asignar Cronograma a Planes', href: '/cronograma/crear', icono:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>'},
    { name: 'Revisar Cronograma de Planes', href: '/cronograma/revisar', icono:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'},
]

export default {
  data(){
      return {
          navigation,
      }
  },
  created(){
  },
  computed: {
    ...mapState(["token"]),
  },
   methods: {

   },
}
</script>
