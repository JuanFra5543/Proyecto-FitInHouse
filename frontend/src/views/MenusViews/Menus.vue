<template>
  <div>
    <div class="flex container mx-auto my-6 py-6  justify-items-center space-between">
        <div class="flex flex-col">
          <div class="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden border-b border-gray-200 ">
                <h1 class="font-bold my-2 md:tracking-wider text-green-700">Listado de Menus creados</h1>
                <table class="table-fixed min-w-full divide-y border-2 border-collapse border-green-800 shadow-xl">
                  <thead class="bg-green-200">
                    <tr>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Nombre Menu</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Proteina</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Carbohidrato</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Grasa</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Editar</th>
                      <th class="border-2 border-gray-900 px-4 py-2 text-green-800 text-left font-flow tracking-wider">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="menu in menus" :key="menu.menuNombre">
                      <th class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{menu.menuNombre}}</th>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{menu.ingredienteP.ingredienteNombre}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{menu.ingredienteC.ingredienteNombre}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-green-400">{{menu.ingredienteG.ingredienteNombre}}</td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white"> <a @click="obtenerMenu(menu); toggleEditarForm()" class="bg-green-400 border rounded p-1 hover:border-green-500 cursor-pointer" >Editar</a></td>
                      <td class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white"> <a @click="obtenerMenu(menu); toggleEliminarForm()" class="bg-red-400 border rounded p-1 hover:border-red-600 cursor-pointer" > Eliminar</a> </td>
                    </tr>
                    <tr class="border-2 border-gray-900 px-4 py-2 font-flow tracking-wider text-white">
                      <td></td>
                      <td class="py-2"> <a @click="toggleCrearForm()" class="bg-blue-400 border rounded p-1 hover:border-blue-600 cursor-pointer">Crear Nuevo Menu</a></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div v-if="crearMenu && !deleteMenu && !editMenu" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
          <form @submit.prevent="crearMenus()" class="border rounded border-blue-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Nombre Menu
              </label>
              <input v-model="menuCrear.menuNombre" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nombre Ingrediente">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Proteina
              </label>
              <select v-model="menuCrear.ingredienteP" class="w-full block text-gray-700 text-sm mb-2">
                <option value=''>Seleccionar Proteina</option>
                <option v-for="ingrediente in ingredientesP" :key="ingrediente._id" :value=ingrediente._id>{{ingrediente.ingredienteNombre}}</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Carbohidrato
              </label>
              <select v-model="menuCrear.ingredienteC" class="w-full block text-gray-700 text-sm mb-2">
                <option value=''>Seleccionar Carbohidrato</option>
                <option v-for="ingrediente in ingredientesC" :key="ingrediente._id" :value=ingrediente._id>{{ingrediente.ingredienteNombre}}</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Grasa
              </label>
              <select v-model="menuCrear.ingredienteG" class="w-full block text-gray-700 text-sm mb-2">
                <option value=''>Seleccionar Grasa</option>
                <option v-for="ingrediente in ingredientesG" :key="ingrediente._id" :value=ingrediente._id>{{ingrediente.ingredienteNombre}}</option>
              </select>
            </div>
            <div class="flex flex-col">
              <button type="submit" class="border rounded mx-8 py-2 bg-blue-500 hover:bg-blue-700 text-white"> Crear Ingrediente </button>
            </div>
          </form>
        </div>

        <div v-if="editMenu && !deleteMenu && !crearMenu" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2">
            <h1 class="font-bold my-2 md:tracking-wider text-green-700">Edicion de Menu</h1>
            <form @submit.prevent="editarMenu(menuEdit)" class="border rounded border-green-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Nombre Menu
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Ingrediente" v-model="menuEdit.menuNombre" disabled>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Proteina
                    </label>
                    <select v-model="menuEdit.ingredienteP._id" class="w-full block text-gray-700 text-sm mb-2">
                        <option v-for="ingrediente in ingredientesP" :key="ingrediente._id" :value="ingrediente._id" >{{ingrediente.ingredienteNombre}}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Carbohidrato
                    </label>
                    <select v-model="menuEdit.ingredienteC._id" class="w-full block text-gray-700 text-sm mb-2">
                        <option v-for="ingrediente in ingredientesC" :key="ingrediente._id" :value="ingrediente._id" >{{ingrediente.ingredienteNombre}}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Grasa
                    </label>
                    <select v-model="menuEdit.ingredienteG._id" class="w-full block text-gray-700 text-sm mb-2">
                        <option v-for="ingrediente in ingredientesG" :key="ingrediente._id" :value="ingrediente._id" >{{ingrediente.ingredienteNombre}}</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <button type="submit" class="border rounded mx-8 py-2 bg-green-500 hover:bg-green-700 text-white"> Editar Plan Alimenticio </button>
                </div>
            </form>
        </div> 

        <div v-if="deleteMenu && !crearMenu && !editMenu" class="flex-1 border-gray-500 border-2 rounded-lg p-6 m-2-6 m-2">
          <h1 class="font-bold my-2 md:tracking-wider text-red-700">Eliminar Menu</h1>
          <form @submit.prevent="eliminarMenu(menuDelete)" class="border rounded border-red-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Nombre Menu
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Ingrediente" v-model="menuDelete.menuNombre" disabled>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Proteina
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Macronutriente" v-model="menuDelete.ingredienteP.ingredienteNombre" disabled>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Carbohidrato
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Macronutriente" v-model="menuDelete.ingredienteC.ingredienteNombre" disabled>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Grasa
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Macronutriente" v-model="menuDelete.ingredienteG.ingredienteNombre" disabled>
            </div>
            <div class="flex flex-col">
              <button type="submit" class="border rounded mx-8 py-2 bg-red-500 hover:bg-red-700 text-white"> Eliminar Menu </button>
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
          crearMenu:false,
          deleteMenu:false,
          editMenu:false,
          menus:[],
          menu:{
              _id:'',
              menuNombre:'',
              ingredienteP:'',
              ingredienteC:'',
              ingredienteG:''
          },
          menuCrear:{
              select:'',
              menuNombre:'',
              ingredienteP:'',
              ingredienteC:'',
              ingredienteG:''
          },
          menuEdit:{},
          menuDelete:{},
          ingredientesP:[],
          ingredientesC:[],
          ingredientesG:[]
      }
  },
  created(){
    this.obtenerMenus()
    this.obtenerIngredientes()
  },
  computed: {
    ...mapState(["token"]),
  },
   methods: {
    toggleCrearForm(){
      this.crearMenu = !this.crearMenu
      this.deleteMenu = false
      this.editMenu = false
    },
    toggleEditarForm(){
      this.crearMenu = false
      this.deleteMenu = false
      this.editMenu = !this.editMenu
    },
    toggleEliminarForm(){
      this.crearMenu = false
      this.deleteMenu = !this.deleteMenu
      this.editMenu = false
    },
    obtenerMenus(){
        let config = {
        headers: {
          token: this.token,
        }};
        this.axios.get('/menu',config).then(res=>{
          this.menus = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          }) 
    },
    obtenerMenu(menu){
        let config = {
            headers: {
                token: this.token,
            },
        }
        this.axios.get(`/menu/${menu._id}`,config).then(res=>{
          console.log(res.data);
          this.menuDelete = res.data
          this.menuEdit = res.data
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    crearMenus(){
      let config = {
        headers: {
          token: this.token,
        },
      };
      console.log(this.menuCrear)
      this.axios.post('/nuevoMenu', this.menuCrear, config).then(res =>{
          const index = this.menus.findIndex(n=> n._id === res.data._id);
          this.menus.splice(index,-1);

          this.menuCrear.menuNombre = '';
          this.menuCrear.ingredienteP = '';
          this.menuCrear.ingredienteC = '';
          this.menuCrear.ingredienteG = '';
          this.crearMenu = !this.crearMenu;
        }).catch(err =>{ 
          console.log(err.response);
          this.message = err.response;
          })
      this.obtenerMenus()
    },
    editarMenu(menu){
      let config = {
        headers: {
          token: this.token,
        },
      };
      console.log(menu)
      this.axios
        .put(`/updateMenu/${menu._id}`, menu, config)
        .then(res => {
          const index = this.menus.findIndex(n=> n._id === res.data._id);

          this.menus[index].menuNombre = res.data.menuNombre;
          this.menus[index].ingredienteP = res.data.ingredienteP;
          this.menus[index].ingredienteC = res.data.ingredienteC;
          this.menus[index].ingredienteG = res.data.ingredienteG;

          this.menuEdit = {};
          this.editMenu = !this.editMenu
        })
        .catch((e) => {
          console.log(e);
        });
        
      this.obtenerMenus()
    },
    eliminarMenu(menu){
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .delete(`/deleteMenu/${menu._id}`, config)
        .then(res => {
          const index = this.menus.findIndex(n=> n._id === res.data._id);
          this.menus.splice(index,1);

          this.menuDelete = {};
          this.deleteMenu = !this.deleteMenu;
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    obtenerIngredientes(){
        let config = {
        headers: {
          token: this.token,
        }};
        this.axios.get('/ingredientes/Proteína',config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.ingredientesP.push(x[i])
            }
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })

        this.axios.get('/ingredientes/Carbohidrato',config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.ingredientesC.push(x[i])
            }
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })

        this.axios.get('/ingredientes/Grasa',config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.ingredientesG.push(x[i])
            }
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },

  }
}
</script>

<style>

</style>