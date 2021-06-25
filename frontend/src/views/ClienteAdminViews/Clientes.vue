<template>
  <div>
    <div class="flex container mx-auto my-6 py-6  justify-items-center space-between">
        <div class="flex flex-col">
          <div class="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden border-b border-gray-200 ">
                <h1 class="font-bold my-2 md:tracking-wider text-green-700">Listado de usuarios creados</h1>
                <table class="table-fixed min-w-full divide-y border-2 border-collapse border-green-800 shadow-xl">
                  <thead class="bg-green-200">
                    <tr>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Id</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Nombre</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Genero</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Edad</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Estatura (m)</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Peso (Kg)</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Alergias</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Plan</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">IMC</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">CAF</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Cal Diarias</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Editar</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="cliente in clientes" :key="cliente.id">
                      <th class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteId}}</th>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteNombre}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteGenero}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteEdad}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteEstatura.$numberDecimal}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clientePeso.$numberDecimal}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteAlergias ? 'Si' : 'No'}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.planAlimenticio.planAlimNombre}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteIMC.$numberDecimal}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.caf.cafDesc}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{cliente.clienteCalDiarias.$numberDecimal}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white"> <a @click="obtenerCliente(cliente); toggleEditarForm()" class="bg-green-400 border rounded p-1 hover:border-green-500 cursor-pointer" > Editar</a> </td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white"> <a @click="obtenerCliente(cliente); toggleEliminarForm()" class="bg-red-400 border rounded p-1 hover:border-red-600 cursor-pointer" > Eliminar</a> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      <div v-if="editClient && !deleteClient" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
        <h1 class="font-bold my-2 md:tracking-wider text-green-700">Edicion de Usuarios</h1>
        <form @submit.prevent="editarCliente(clienteEdit)" class="border rounded border-green-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Nombre
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Edad" v-model="clienteEdit.clienteNombre" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Edad
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Edad" v-model="clienteEdit.clienteEdad">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Estatura (m)
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Edad" v-model="clienteEdit.clienteEstatura.$numberDecimal">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Peso (Kg)
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nuevo Peso" v-model="clienteEdit.clientePeso.$numberDecimal">
          </div>
          <div v-if="clienteEdit.clienteAlergias" class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Nota 
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Nota" v-model="clienteEdit.clienteNota">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Plan Alimenticio
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Nota" v-model="clienteEdit.planAlimenticio.planAlimNombre" disabled>
          </div>
           <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              IMC
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nuevo Peso" :value="clienteEdit.clienteIMC.$numberDecimal = calcularIMC(clienteEdit.clientePeso.$numberDecimal,clienteEdit.clienteEstatura.$numberDecimal)" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Calorias Diarias
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nuevo Peso" :value="clienteEdit.clienteCalDiarias.$numberDecimal = calcularCalDiarias(clienteEdit.clientePeso.$numberDecimal,clienteEdit.clienteEstatura.$numberDecimal,clienteEdit.clienteEdad,clienteEdit.caf)" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              CAF
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Nota" v-model="clienteEdit.caf.cafDesc" disabled>
          </div>
          <div class="flex flex-col">
            <button type="submit" class="border rounded mx-8 py-2 bg-green-500 hover:bg-green-700 text-white"> Editar Cliente </button>
          </div>
        </form>
      </div>

      <div v-if="deleteClient && !editClient" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
        <h1 class="font-bold my-2 md:tracking-wider text-red-700">Eliminar de Usuarios</h1>
        <form @submit.prevent="eliminarCliente(clienteEdit)" class="border rounded border-red-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Nombre
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Edad" v-model="clienteEdit.clienteNombre" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Edad
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Edad" v-model="clienteEdit.clienteEdad" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Estatura (m)
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Edad" v-model="clienteEdit.clienteEstatura.$numberDecimal" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Peso (Kg)
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nuevo Peso" v-model="clienteEdit.clientePeso.$numberDecimal" disabled>
          </div>
          <div v-if="cliente.clienteAlergias" class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Nota 
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Nota" v-model="clienteEdit.clienteNota" disabled>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              CAF
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nueva Nota" v-model="clienteEdit.caf.cafDesc" disabled>
          </div>
          <div class="flex flex-col">
            <button type="submit" class="border rounded mx-8 py-2 bg-red-500 hover:bg-red-700 text-white"> Eliminar Cliente </button>
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
        editClient: false,
        deleteClient: false,
        clientes:[],
        cliente:{
          _id:'',
          clienteId:'', 
          clienteNombre:'',
          clienteEdad:'',
          clienteEstatura:'', 
          clientePeso:'',
          clienteAlergias:'',
          clienteNota:'',
          clienteIMC:'',
          clienteCalDiarias:'',
          caf:'',
          planAlimenticio:'',
        },
        clienteEdit:{},
      }
  },
  created(){
    this.obtenerClientes()
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    toggleEditarForm(){
      this.editClient = !this.editClient
      this.deleteClient = false
      console.log(this.editClient,this.deleteClient)
    },
    toggleEliminarForm(){
      this.deleteClient = !this.deleteClient
      this.editClient = false
      console.log(this.editClient,this.deleteClient)
    },
    obtenerClientes(){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios.get('/cliente',config).then(res=>{
        console.log(res.data)
        this.clientes = res.data
      })
      .catch(err =>{ 
        console.log(err.response.data);
        this.message = err.response.data.message;
        })
    },
    obtenerCliente(cliente){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios.get(`/cliente/${cliente._id}`,config).then(res=>{
        this.clienteEdit = res.data
        console.log(this.clienteEdit);
      }).catch((e) => {
          console.log(e.response);
        });
    },
    editarCliente(cliente){
       let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .put(`/updateCliente/${cliente._id}`, cliente, config)
        .then(res => {
          const index = this.clientes.findIndex(n=> n._id === res.data._id);
          this.clientes[index].clienteEdad = res.data.clienteEdad;
          this.clientes[index].clientePeso = res.data.clientePeso;
          this.clientes[index].clienteEstatura = res.data.clienteEstatura;
          this.clientes[index].clienteIMC = res.data.clienteIMC
          console.log(res.data)
          this.clientes[index].clienteCalDiarias = res.data.clienteCalDiarias
          if(this.clientes[index].clienteAlergias) this.clientes[index].clienteNota = res.data.clienteNota;

          this.clienteEdit = {};
          this.editClient = !this.editClient
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    eliminarCliente(cliente){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .delete(`/deleteCliente/${cliente._id}`, config)
        .then(res => {
          const index = this.clientes.findIndex(n=> n._id === res.data._id);
          this.clientes.splice(index,1);

          this.clienteEdit = {};
          this.deleteClient = !this.deleteClient;
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    calcularIMC(peso,estatura){
      var imc 
      imc = peso/Math.pow(estatura,2)
      return imc.toFixed(2)
    },
    calcularCalDiarias(peso,estatura,edad,caf){
      var calDiarias 
      var cafVal = caf.cafValor.$numberDecimal
      var cafGen = caf.cafGenero

      if(cafGen === "Masculino"){
        if(edad>=19){
          calDiarias = 662 - (9.53*edad) + (cafVal*((15.9*peso)+(540*estatura)))
        }
        else{
          calDiarias = 88.5 - (61.9*edad) + (cafVal*((26.7*peso)+(903*estatura)))
        }
      }
      else{
        if(edad>=19){
          calDiarias = 354 - (6.91*edad) + (cafVal*((9.36*peso)+(726*estatura)))
        }
        else{
          calDiarias = 135.3 - (30.8*edad) + (cafVal*((10*peso)+(935*estatura)))
        }
      }
      return calDiarias.toFixed(2)
    }
  },

  
}
</script>

<style>

</style>