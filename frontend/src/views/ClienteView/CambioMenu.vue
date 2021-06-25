<template>
  <div class="p-10" >
    <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-700 text-gray-200">
      <tr class="text-left border-b border-gray-300">
        <th class="px-4 py-3">Fecha Cronograma</th>
        <th class="px-4 py-3">Menu del Dia</th>
      </tr>
      <tr class="text-left border-b border-gray-300">
        <td class="px-4 py-3">{{changeFecha(cronogramaDia)}}</td>
        <td class="px-4 py-3">{{menuDia}}</td>
      </tr>
    </table>
    <div>
        <form @submit.prevent="busquedaMenus()" class="border rounded border-green-600 bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Proteina
                </label>
                <select v-model="ingP" class="w-full block text-gray-700 text-sm mb-2">
                    <option value=''>Seleccionar Proteina</option>
                    <option v-for="ingrediente in ingredientesP" :key="ingrediente._id" :value="ingrediente._id" >{{ingrediente.ingredienteNombre}}</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Carbohidrato
                </label>
                <select v-model="ingC" class="w-full block text-gray-700 text-sm mb-2">
                    <option value=''>Seleccionar Carbohidrato</option>
                    <option v-for="ingrediente in ingredientesC" :key="ingrediente._id" :value="ingrediente._id" >{{ingrediente.ingredienteNombre}}</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Grasa
                </label>
                <select v-model="ingG" class="w-full block text-gray-700 text-sm mb-2">
                    <option value=''>Seleccionar Grasa</option>
                    <option v-for="ingrediente in ingredientesG" :key="ingrediente._id" :value="ingrediente._id" >{{ingrediente.ingredienteNombre}}</option>
                </select>
            </div>
            <div class="flex flex-col">
                <button type="submit" class="border rounded mx-8 py-2 bg-green-500 hover:bg-green-700 text-white"> Editar Plan Alimenticio </button>
            </div>
        </form>
    </div>
    <div>
        <p class="text-gray-500 text-left">Menu en base a Proteína</p>
        <div class="grid ml-40 -mr-40 w-3/4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="item in menusP" :key="item.menuNombre" @click="takePlanID(item._id)"  :class="[item.check ? 'bg-blue-500':'','card h-52 pt-6 my-2 h-30 mx-12 px-2 cursor-pointer border border-blue-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 hover:bg-blue-500 transition-all duration-700']">
                <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                    <h1 class="text-m mb-2 font-bold">{{item.menuNombre}}</h1>
                    <p>{{item.ingredienteP.ingredienteNombre}}</p>
                    <p>{{item.ingredienteC.ingredienteNombre}}</p>
                    <p>{{item.ingredienteG.ingredienteNombre}}</p>
                </div>
            </div>
        </div>
    </div>
    <div>
        <p class="text-gray-500 text-left">Menu en base a Carbohidrato</p>
        <div class="grid ml-40 -mr-40 w-3/4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="item in menusC" :key="item.menuNombre" @click="takePlanID(item._id)"  :class="[item.check ? 'bg-blue-500':'','card h-52 pt-6 my-2 h-30 mx-12 px-2 cursor-pointer border border-blue-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 hover:bg-blue-500 transition-all duration-700']">
                <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                    <h1 class="text-m mb-2 font-bold">{{item.menuNombre}}</h1>
                    <p>{{item.ingredienteP.ingredienteNombre}}</p>
                    <p>{{item.ingredienteC.ingredienteNombre}}</p>
                    <p>{{item.ingredienteG.ingredienteNombre}}</p>
                </div>
            </div>
        </div>
    </div>
    <div>
        <p class="text-gray-500 text-left">Menu en base a Grasa</p>
        <div class="grid ml-40 -mr-40 w-3/4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="item in menusG" :key="item.menuNombre" @click="takePlanID(item._id)"  :class="[item.check ? 'bg-blue-500':'','card h-52 pt-6 my-2 h-30 mx-12 px-2 cursor-pointer border border-blue-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 hover:bg-blue-500 transition-all duration-700']">
                <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                    <h1 class="text-m mb-2 font-bold">{{item.menuNombre}}</h1>
                    <p>{{item.ingredienteP.ingredienteNombre}}</p>
                    <p>{{item.ingredienteC.ingredienteNombre}}</p>
                    <p>{{item.ingredienteG.ingredienteNombre}}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="p-10 pl-40">
        <button @click="cambiarMenuDia()" class="ml-96 mx-44 py-2 px-12 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-opacity-75">Cambiar Menu Dia</button>
    </div>

  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

const navigation = { href: '/inicio/'}

export default {
    name: 'MenuComponent',
        data(){
      return {
        idCronograma:'',
        navigation,
        mensaje:false,
        usuario:'',
        codigoUsuario:'',
        cliente:[],
        cronogramaDia:'',
        menuDia:'',
        ingredientesP:[],
        ingP:'',
        ingredientesC:[],
        ingC:'',
        ingredientesG:[],
        ingG:'',
        menusP:[],
        menusC:[],
        menusG:[],
        idMenuSeleccionado:'',
      }
    },
    created(){
      this.getUser()
      this.obtenerIngredientes()
    },
    methods: {
      ...mapActions(['getUserLogged']),
      async getUser(){
        this.usuario = JSON.parse(await this.getUserLogged())
        this.codigoUsuario = this.usuario.state.userDB.data.usuarioCodigo
        this.obtenerCliente(this.codigoUsuario)
        this.idCronograma = this.$route.params.id
        this.obtenerCronograma(this.idCronograma)
      },
      obtenerCliente(codigo){
          let config = {
            headers: {
              token: this.token,
            },
          };
          this.axios.get(`/cliente/codigoUnico/${codigo}`,config).then(res=>{
            this.cliente = res.data
          }).catch((e) => {
              console.log(e.response);
            });
        },
      obtenerCronograma(menu){
        let config = {
          headers: {
            token: this.token,
          },
        }
        this.axios.get(`/cronograma/cliente/menuDia/${menu}`,config).then(res=>{
            this.cronogramaDia = res.data.cronogramaDia
            this.menuDia = res.data.menu.menuNombre
          })
          .catch(err =>{ 
            console.log(err);
            })
      },
      changeFecha(date){
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          return new Date(date).toLocaleDateString(undefined, options)
      },
      obtenerIngredientes(){
        let config = {
        headers: {
          token: this.token,
        }};
        this.axios.get('/ingredientes/cliente/Proteína',config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.ingredientesP.push(x[i])
            }
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })

        this.axios.get('/ingredientes/cliente/Carbohidrato',config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.ingredientesC.push(x[i])
            }
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })

        this.axios.get('/ingredientes/cliente/Grasa',config).then(res=>{
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
      busquedaMenus(){
           let config = {
        headers: {
          token: this.token,
        }};
        this.axios.get(`/menu/cliente/ingredienteP/${this.ingP}`,config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.menusP.push(x[i])
            }
            console.log(this.menusP)
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })

        this.axios.get(`/menu/cliente/ingredienteC/${this.ingC}`,config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.menusC.push(x[i])
            }
            console.log(this.menusC)
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })

        this.axios.get(`/menu/cliente/ingredienteG/${this.ingG}`,config).then(res=>{
          const x = res.data
          for(var i in x){
              x[i]===null ? delete x[i] : this.menusG.push(x[i])
            }
            console.log(this.menusG)
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
        },
        takePlanID(id){
            this.menusP.forEach(element =>{
                if(element._id === id){
                element.check = !element.check
                }
                else{ 
                element.check = false
                }
            })
            this.menusC.forEach(element =>{
                if(element._id === id){
                element.check = !element.check
                }
                else{ 
                element.check = false
                }
            })
            this.menusG.forEach(element =>{
                if(element._id === id){
                element.check = !element.check
                }
                else{ 
                element.check = false
                }
            })
            this.idMenuSeleccionado = id
        },
        cambiarMenuDia(){
            let config = {
                headers: {
                token: this.token,
            }};
            if (this.idMenuSeleccionado === ''){
                alert("Debe seleccionar el menu que desea")
            }
            else{
                var nuevoMenu = {
                    _id:this.idCronograma,
                    cronogramaDia:this.cronogramaDia,
                    menu: this.idMenuSeleccionado
                }
                this.axios
                .put(`/updateCronograma/cliente/${this.idCronograma}`, nuevoMenu, config)
                .then(res => {
                    console.log(res)
                })
                .catch((e) => {
                console.log(e);
                });
                
            }
        }
    },
    computed: {
    ...mapState(["token"]),
    },
}
</script>