<template>
    <div>
        <div class="mt-10">
            <router-link :to="navigation.href" class="bg-red-600 border rounded m-20 px-8 py-2 hover:border-red-800 cursor-pointer mx-10 text-white">Atras</router-link>
        
            <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
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
        <form @submit.prevent="crearCronogramaMes()">
            <h2 class="my-5 mx-32">Seleccione el mes:</h2>
            <input v-model="mesCronograma" class="my-5 mx-32" type="month" min="2021-01">
            <div class="flex flex-col">
                <button type="submit" class="border rounded w-40 mx-32 py-2 bg-blue-500 hover:bg-blue-700 text-white"> Crear Menu </button>
            </div>
        </form>

        <table class="rounded-t-lg m-5 w-5/6 mx-auto text-gray-100 bg-gradient-to-l from-green-200 to-green-400">
        <tr class="text-left border-b-2 border-green-100">
            <th class="px-4 py-3">Fecha</th>
            <th class="px-4 py-3">Menu</th>
            <th class="px-4 py-3">Plan Alimenticio</th>
            <th class="px-4 py-3">Editar</th>
        </tr>
        <tr v-for="diaMenu in mesMenu" :key="diaMenu._id" class="border-b border-green-200">
            <td class="px-4 py-3">{{changeFecha(diaMenu.cronogramaDia)}}</td>
            <td class="px-4 py-3">{{diaMenu.menu.menuNombre}}</td>
            <td class="px-4 py-3">{{diaMenu.planAlimenticio.planAlimNombre}}</td>
            <td class="px-4 py-3"><a @click="obtenerCronograma(diaMenu._id); toggleEditarForm()" class="bg-green-400 border rounded p-1 hover:border-green-500 cursor-pointer" >Editar</a></td>
        </tr>
        </table>

    </div>
</template>


<script>
import { mapState } from "vuex";

const navigation = { href: '/cronograma/crear'}

export default {
    name: "CrearPlanCronograma",
  data(){
      return {
          navigation,
          planAlimId: this.$route.params.id,
          diaEdit: false,
          planAlim:[],
          mesMenu:[],
          menus:[],
          diaMenu:{
              cronogramaDia:'',
              planAlimenticio:'',
              menu:'',
          },
          mesCronograma:'',
      }      
  },
  created(){
    this.obtenerPlan(this.planAlimId)
    this.obtenerCronograma(this.planAlimId)
    this.obtenerMenus()
  },
  computed: {
    ...mapState(["token"]),
  },
   methods: {
    getValue(x){
        return Number.parseFloat(x).toFixed(2)
    },
    toggleEditarForm(){
        this.diaEdit = !this.diaEdit
    },
    obtenerPlan(planAlim){
      let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/planAlim/${planAlim}`,config).then(res=>{
          this.planAlim = res.data
          console.log(this.planAlim)
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    obtenerCronograma(planAlim){
        let config = {
        headers: {
          token: this.token,
        },
      }
      this.axios.get(`/cronograma/planAlim/${planAlim}`,config).then(res=>{
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
    crearCronogramaMes(){
        let config = {
            headers: {
            token: this.token,
            },
        }
        
        var promises = [];
        var arr = this.mesCronograma.split("-")
        var daysOfMonth = new Date(arr[0],arr[1], 0).getDate()

        console.log(arr)

        var menuOfDay = {
            cronogramaDia:'',
            planAlimenticio:this.planAlimId,
            menu:'',
        }

        for(var i = 0; i < daysOfMonth; i++){
            menuOfDay.cronogramaDia=arr[0]+'/'+arr[1]+'/'+(i+1)
            menuOfDay.menu = this.menus[Math.floor(Math.random() * Object.keys(this.menus).length)]._id
            promises.push(
            this.axios.post('/nuevoCronograma', menuOfDay, config).then(res =>{
                if(res.status !== 500){
                    const index = this.mesMenu.findIndex(n=> n._id === res.data._id);
                    this.mesMenu.splice(index,-1);
                    }
            }).catch(err => {
                console.log(err)
                this.message = err.response;
            }))
        }
        Promise.all(promises).then(() => console.log(this.mesMenu))
        this.obtenerCronograma(this.planAlimId)
    },
    changeFecha(date){
        return new Date(date).toLocaleDateString("en-US")
    },
   },
}
</script>
