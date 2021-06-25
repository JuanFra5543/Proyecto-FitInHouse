<template>
  <div>
    <div class="flex container mx-auto my-6 py-6  justify-items-center space-between">
        <div class="flex flex-col">
          <div class="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden border-b border-gray-200 ">
                <h1 class="font-bold my-2 md:tracking-wider text-green-700">Listado de consejos creados</h1>
                <table class="table-fixed min-w-full divide-y border-2 border-collapse border-green-800 shadow-xl">
                  <thead class="bg-green-200">
                    <tr>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider break-all max-w-xs">Descripcion</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Plan Alimenticio</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="consejo in consejos" :key="consejo.consejoNombre">
                      <th class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400 break-all max-w-xs">{{consejo.consejoNombre}}</th>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{consejo.planAlimenticio.planAlimNombre}}</td>
                    </tr>
                    <tr class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider ">
                      <td class="py-2 text-center text-white"> <a @click="toggleCrearForm()" class="bg-blue-400 border rounded p-1 hover:border-blue-600 cursor-pointer">Crear Nuevo consejo</a> </td>
                      <td ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-if="crearConsejo" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
          <form @submit.prevent="crearConsejos()" class="border rounded border-blue-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Descripcion Consejo
              </label>
              <input v-model="consejoCrear.consejoNombre" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Descripcion consejo">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Planes Alimenticios
              </label>
              <select v-model="consejoCrear.planAlimenticio" class="w-full block text-gray-700 text-sm mb-2">
                <option value=''>Seleccionar Plan Alimenticio</option>
                <option v-for="plan in planes" :key="plan._id" :value=plan._id>{{plan.planAlimNombre}}</option>
              </select>
            </div>
            <div class="flex flex-col">
              <button type="submit" class="border rounded mx-8 py-2 bg-blue-500 hover:bg-blue-700 text-white"> Crear Consejo </button>
            </div>
        </form>
        </div>
    </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data(){
      return {
        crearConsejo: false,
        consejos:{},
        consejoCrear:{
            consejoNombre: '',
            planAlimenticio: '',
            },
        planes:{}
         }
    },
    created(){
        this.obtenerConsejos()
        this.obtenerPlanesAlimenticios()
        },
    computed: {
    ...mapState(["token"]),
    },
    methods: {
        toggleCrearForm(){
            this.crearConsejo = !this.crearConsejo
        },
        obtenerConsejos(){
            let config = {
                headers: {
                token: this.token,
                },
            };
            this.axios.get('/consejos',config).then(res=>{
                console.log(res.data);
                this.consejos = res.data
                })
                .catch(err =>{ 
                console.log(err.response.data);
                this.message = err.response.data.message;
                })
        },
        obtenerPlanesAlimenticios(){
            let config = {
                headers: {
                token: this.token,
                },
            };
            this.axios.get('/planAlim',config).then(res=>{
                console.log(res.data);
                this.planes = res.data
                })
                .catch(err =>{ 
                console.log(err.response.data);
                this.message = err.response.data.message;
                })
        },
        crearConsejos(){
            let config = {
                headers: {
                token: this.token,
                },
            };
            this.axios.post('/nuevoConsejo', this.consejoCrear, config).then(res =>{
                console.log(res.data);
                const index = this.consejos.findIndex(n=> n._id === res.data._id);
                this.consejos.splice(index,-1);

                this.consejoCrear.push(res.data);
                this.consejoCrear.consejoNombre = '';
                this.consejoCrear.planAlimenticio = ''; 
                this.crearConsejo = !this.crearConsejo
            }).catch(err =>{ 
                console.log(err.response);
                this.message = err.response;
            })
            this.obtenerConsejos()
        }
    }
}
</script>