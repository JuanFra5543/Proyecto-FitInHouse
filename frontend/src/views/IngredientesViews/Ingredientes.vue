<template>
  <div>
    <div class="flex container mx-auto my-6 py-6  justify-items-center space-between">
        <div class="flex flex-col">
          <div class="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden border-b border-gray-200 ">
                <h1 class="font-bold my-2 md:tracking-wider text-green-700">Listado de ingredientes creados</h1>
                <table class="table-fixed min-w-full divide-y border-2 border-collapse border-green-800 shadow-xl">
                  <thead class="bg-green-200">
                    <tr>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Nombre</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Macrotipo</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="ingrediente in ingredientes" :key="ingrediente.ingredienteNombre">
                      <th class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{ingrediente.ingredienteNombre}}</th>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{ingrediente.macronutriente.macronutrienteNombre}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white"> <a @click="obtenerIngrediente(ingrediente._id)" class="bg-red-400 border rounded p-1 hover:border-red-600 cursor-pointer" > Eliminar</a> </td>
                    </tr>
                    <tr class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white">
                      <td></td>
                      <td class="py-2"> <a @click="toggleCrearForm()" class="bg-blue-400 border rounded p-1 hover:border-blue-600 cursor-pointer">Crear Nuevo Ingrediente</a> </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-if="crearIngredientes && !deleteI" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
          <form @submit.prevent="crearIngrediente()" class="border rounded border-blue-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Nombre Ingrediente
              </label>
              <input v-model="ingredienteCrear.ingredienteNombre" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nombre Ingrediente">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Macrotipo
              </label>
              <select v-model="ingredienteCrear.macronutriente" class="w-full block text-gray-700 text-sm mb-2">
                <option value=''>Seleccionar Macronutriente</option>
                <option v-for="macro in macronutrientes" :key="macro._id" :value=macro._id>{{macro.macronutrienteNombre}}</option>
              </select>
            </div>
            <div class="flex flex-col">
              <button type="submit" class="border rounded mx-8 py-2 bg-blue-500 hover:bg-blue-700 text-white"> Crear Ingrediente </button>
            </div>
          </form>
        </div>

        <div v-if="deleteI && !crearIngredientes" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2-6 m-2">
          <h1 class="font-bold my-2 md:tracking-wider text-red-700">Eliminar de Ingrediente</h1>
          <form @submit.prevent="eliminarIngrediente(ingredienteDelete)" class="border rounded border-red-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Nombre Ingrediente
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Ingrediente" v-model="ingredienteDelete.ingredienteNombre" disabled>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Macrotipo
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Macronutriente" v-model="ingredienteDelete.macronutriente.macronutrienteNombre" disabled>
            </div>
            <div class="flex flex-col">
              <button type="submit" class="border rounded mx-8 py-2 bg-red-500 hover:bg-red-700 text-white"> Eliminar Ingrediente </button>
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
        crearIngredientes: false,
        deleteI: false,
        ingredientes:[],
        macronutrientes:[],
        macro:{
          _id:'',
          macronutrienteNombre:''
        },
        ingrediente:{
          _id:'',
          ingredienteNombre:'',
          macronutriente:{
            macronutrienteNombre:''
          }
        },
        ingredienteDelete: {},
        ingredienteCrear:{
          ingredienteNombre: '',
          macronutriente: '',
        }
      }
  },
  created(){
    this.obtenerIngredientes()
    this.obtenerMacronutrientes()
  },
  computed: {
    ...mapState(["token"]),
  },
   methods: {
    toggleCrearForm(){
      this.crearIngredientes = !this.crearIngredientes
      this.deleteI = false
    },
    //OBTENER TODOS LOS MACRONUTRIENTES
    obtenerMacronutrientes(){
      // let config = {
      //     headers: {
      //       token: this.token,
      //     },
      // };
      this.axios.get('/macronutrientes').then(res=>{
        console.log(res.data);
        this.macronutrientes = res.data
      })
      .catch(err =>{ 
        console.log(err.response.data);
        this.message = err.response.data.message;
      })
    },
    //OBTENER TODOS LOS INGREDIENTES DE LA BASE
    obtenerIngredientes(){
        let config = {
          headers: {
            token: this.token,
          },
        };

        this.axios.get('/ingredientes',config).then(res=>{
          console.log(res.data);
          this.ingredientes = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    //OBTENER INGREDIENTE SELECCIONADO
    obtenerIngrediente(ingrediente){
        let config = {
          headers: {
            token: this.token,
          },
        };

        this.deleteI = !this.deleteI
        this.crearIngredientes = false

        console.log(this.deleteI,this.crearIngredientes)

        this.axios.get(`/ingrediente/${ingrediente}`,config).then(res=>{
          console.log(res.data);
          this.ingredienteDelete = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    //ELIMINAR INGREDIENTES
    eliminarIngrediente(ingrediente){
        let config = {
        headers: {
          token: this.token,
        },
      };
      console.log(ingrediente)
      this.axios
        .delete(`/deleteIngrediente/${ingrediente._id}`, config)
        .then(res => {
          const index = this.ingredientes.findIndex(n=> n._id === res.data._id);
          this.ingredientes.splice(index,1);

          this.ingredienteDelete = {};
          this.deleteI = !this.deleteI;
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e.response);
        });

    },
    //CREAR INGREDIENTES
    crearIngrediente(){
        let config = {
            headers: {
              token: this.token,
            },
          };
          
        this.axios.post('/nuevoIngrediente', this.ingredienteCrear, config).then(res =>{
          console.log(res.data);
          const index = this.ingredientes.findIndex(n=> n._id === res.data._id);
          this.ingredientes.splice(index,-1);

          this.ingredienteCrear.push(res.data);
          this.ingredienteCrear.ingredienteNombre = '';
          this.ingredienteCrear.macronutriente = ''; 
        }).catch(err =>{ 
          console.log(err.response);
          this.message = err.response;
          })
        this.obtenerIngredientes()
    },
  }
}
</script>

<style>

</style>