<template>
  <div>
    <div class="flex container mx-auto my-6 py-6  justify-items-center space-between">
        <div class="flex flex-col">
          <div class="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden border-b border-gray-200 ">
                <h1 class="font-bold my-2 md:tracking-wider text-green-700">Listado de Planes Alimenticios creados</h1>
                <table class="table-fixed min-w-full divide-y border-2 border-collapse border-green-800 shadow-xl">
                  <thead class="bg-green-200">
                    <tr>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Nombre Plan</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider break-all max-w-xs">Descripcion</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Precio</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Min IMC</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Max IMC</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Tipo Menu</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Editar</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="planAlim in planesAlimenticios" :key="planAlim._id">
                      <th class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{planAlim.planAlimNombre}}</th>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400 break-all max-w-xs">{{planAlim.planAlimDesc}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">${{planAlim.planAlimPrecio.$numberDecimal}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{planAlim.planAlimCalcMin.$numberDecimal}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{planAlim.planAlimCalcMax.$numberDecimal}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{planAlim.tipoMenu.tipoMenuNombre}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white"> <a @click="obtenerPlan(planAlim._id); toggleEditarForm()" class="bg-green-400 border rounded p-1 hover:border-green-500 cursor-pointer" >Editar</a></td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white"> <a @click="obtenerPlan(planAlim._id); toggleEliminarForm()" class="bg-red-400 border rounded p-1 hover:border-red-600 cursor-pointer">Eliminar</a></td>
                    </tr>
                    <tr class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white">
                      <td></td>
                      <td class="py-2"> <a @click="toggleCrearFrom()" class="bg-blue-400 border rounded p-1 hover:border-blue-600 cursor-pointer">Crear Nuevo Plan Alimenticio</a> </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-if="crearPlan && !deletePlan && !editPlan" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
          <form @submit.prevent="crearPlanAlim()" class="border rounded border-blue-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Nombre Plan Alimenticio
              </label>
              <input v-model="planAlimCrear.planAlimNombre" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nombre Plan Alimenticio">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Descripcion
              </label>
              <textarea v-model="planAlimCrear.planAlimDesc" style="resize:none;" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Descripcion"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Precio
              </label>
              <input v-model="planAlimCrear.planAlimPrecio" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Precio">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                IMC Minimo Recomendado
              </label>
              <input v-model="planAlimCrear.planAlimCalcMin" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Min IMC">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                IMC Maximo Recomendado
              </label>
              <input v-model="planAlimCrear.planAlimCalcMax" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Max IMC">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Tipo de Menu
              </label>
              <select v-model="planAlimCrear.tipoMenu" class="w-full block text-gray-700 text-sm mb-2">
                <option value=''>Seleccionar Tipo de Menu</option>
                <option v-for="tipoM in tiposMenu" :key="tipoM._id" :value=tipoM._id>{{tipoM.tipoMenuNombre}}</option>
              </select>
            </div>
            <div class="flex flex-col">
              <button type="submit" class="border rounded mx-8 py-2 bg-blue-500 hover:bg-blue-700 text-white"> Crear Plan Alimenticio </button>
            </div>
          </form>
        </div>

        <div v-if="editPlan && !deletePlan && !crearPlan" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
        <h1 class="font-bold my-2 md:tracking-wider text-green-700">Edicion de Plan Alimenticio</h1>
        <form @submit.prevent="editarPlan(planAlimEdit)" class="border rounded border-green-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Nombre Plan Alimenticio
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Plan Alimenticio" v-model="planAlimDelete.planAlimNombre" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Descripcion
            </label>
            <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Descripcion" v-model="planAlimDelete.planAlimDesc" disabled></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Precio
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Precio" v-model="planAlimDelete.planAlimPrecio.$numberDecimal">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              IMC Minimo Recomendado
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Min IMC" v-model="planAlimDelete.planAlimCalcMin.$numberDecimal" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              IMC Maximo Recomendado
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Max IMC" v-model="planAlimDelete.planAlimCalcMax.$numberDecimal" disabled>
          </div>
          <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Tipo de Menu
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Max IMC" v-model="planAlimDelete.tipoMenu.tipoMenuNombre" disabled>
          </div>
          <div class="flex flex-col">
            <button type="submit" class="border rounded mx-8 py-2 bg-green-500 hover:bg-green-700 text-white"> Editar Plan Alimenticio </button>
          </div>
        </form>
      </div>

      <div v-if="deletePlan && !crearPlan && !editPlan" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2-6 m-2">
        <h1 class="font-bold my-2 md:tracking-wider text-red-700">Eliminar de Plan Alimenticio</h1>
        <form @submit.prevent="eliminarPlan(planAlimDelete)" class="border rounded border-red-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Nombre Plan Alimenticio
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Plan Alimenticio" v-model="planAlimDelete.planAlimNombre" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Descripcion
            </label>
            <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Descripcion" v-model="planAlimDelete.planAlimDesc" disabled></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Precio
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Precio" v-model="planAlimDelete.planAlimPrecio.$numberDecimal" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              IMC Minimo Recomendado
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Min IMC" v-model="planAlimDelete.planAlimCalcMin.$numberDecimal" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              IMC Maximo Recomendado
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Max IMC" v-model="planAlimDelete.planAlimCalcMax.$numberDecimal" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Tipo de Menu
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Max IMC" v-model="planAlimDelete.tipoMenu.tipoMenuNombre" disabled>
          </div>
          <div class="flex flex-col">
            <button type="submit" class="border rounded mx-8 py-2 bg-red-500 hover:bg-red-700 text-white"> Eliminar Plan Alimenticio </button>
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
      crearPlan:false,
      deletePlan: false,
      editPlan:false,
      planesAlimenticios:[],
      planAlim:{
        _id:'',
        planAlimNombre:'',
        planAlimDesc:'',
        planAlimPrecio:'',
        planAlimCalcMin:'',
        planAlimCalcMax:'',
        tipoMenu:''
      },
      planAlimCrear:{
        planAlimNombre:'',
        planAlimDesc:'',
        planAlimPrecio:'',
        planAlimCalcMin:'',
        planAlimCalcMax:'',
        tipoMenu:''
      },
      planAlimEdit:{},
      planAlimDelete:{},
      tiposMenu:{}
    }
  },
  created(){
    this.obtenerPlanes()
    this.obtenerTiposMenu()
  },
  computed: {
    ...mapState(["token"]),
  },
  methods:{
    toggleCrearFrom(){
      this.crearPlan = !this.crearPlan
      this.deletePlan = false
      this.editPlan = false
      console.log(this.crearPlan,this.editPlan,this.deletePlan)
    },
    toggleEditarForm(){
      this.crearPlan = false
      this.deletePlan = false
      this.editPlan = !this.editPlan
      console.log(this.crearPlan,this.editPlan,this.deletePlan)
    },
    toggleEliminarForm(){
      this.crearPlan = false
      this.deletePlan = !this.deletePlan
      this.editPlan = false
      console.log(this.crearPlan,this.editPlan,this.deletePlan)
    },
    obtenerPlanes(){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios.get('/planAlim',config).then(res=>{
          console.log(res.data);
          this.planesAlimenticios = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    obtenerPlan(planAlim){
      let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/planAlim/${planAlim}`,config).then(res=>{
          console.log(res.data);
          this.planAlimDelete = res.data
          this.planAlimEdit = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    eliminarPlan(planAlim){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .delete(`/deletePlanAlim/${planAlim._id}`, config)
        .then(res => {
          const index = this.planesAlimenticios.findIndex(n=> n._id === res.data._id);
          this.planesAlimenticios.splice(index,1);

          this.planAlimDelete = {};
          this.deletePlan = !this.deletePlan;
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    crearPlanAlim(){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios.post('/nuevoPlanAlim', this.planAlimCrear, config).then(res =>{
          console.log(res.data);
          const index = this.planesAlimenticios.findIndex(n=> n._id === res.data._id);
          this.planesAlimenticios.splice(index,-1);

          this.planAlimCrear.planAlimNombre = '';
          this.planAlimCrear.planAlimDesc = '';
          this.planAlimCrear.planAlimPrecio = '';
          this.planAlimCrear.planAlimCalcMin = '';
          this.planAlimCrear.planAlimCalcMax = '';
        }).catch(err =>{ 
          console.log(err.response);
          this.message = err.response;
          })
      this.obtenerPlanes()
    },
    editarPlan(planAlim){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .put(`/updatePlanAlim/${planAlim._id}`, planAlim, config)
        .then(res => {
          const index = this.planesAlimenticios.findIndex(n=> n._id === res.data._id);

          this.planesAlimenticios[index].planAlimPrecio = res.data.planAlimPrecio;

          this.planAlimEdit = {};
          this.editPlan = !this.editPlan
        })
        .catch((e) => {
          console.log(e.response);
        });
        
      this.obtenerPlanes()
    },
    obtenerTiposMenu(){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios.get('/tipoMenu',config).then(res=>{
          console.log(res.data);
          this.tiposMenu = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    }
  }
}
</script>

<style>

</style>