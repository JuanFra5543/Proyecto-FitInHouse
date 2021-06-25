<template>
  <div>
    <div class="p-6 w-auto mx-10 my-10 bg-gray-200 rounded-xl shadow-md">   
      <div v-if="!seleccionPlanAlim" class="flex-auto text-center">
        <h1 class="flex-auto text-xl font-semibold my-2"> Crea Nuevo Usuario </h1>
        <form @submit.prevent="siguienteVentana()" class="grid grid-cols-2 gap-x-4 space-y-4 ">
          <div class="flex flex-col space-y-2">            
            <p class="text-gray-500 text-left">Nombre del Usuario</p>
            <input class="px-2 rounded h-8" type="text" v-model="datosUsuario.usuarioNombre" placeholder="Ingrese su Nombre">
            <p class="text-gray-500 text-left">Mail de Usuario</p>
            <input class="px-2 rounded h-8" type="text" v-model="datosUsuario.usuarioMail" placeholder="Ingrese su Correo Electronico">
            <p class="text-gray-500 text-left">Contraseña de Usuario</p>
            <input class="px-2 rounded h-8" type="text" v-model="datosUsuario.usuarioPassword" placeholder="Ingrese su Contraseña">
            <p class="text-gray-500 text-left">Edad Cliente</p>
            <input class="px-2 rounded h-8" type="number" v-model="datosCliente.clienteEdad" placeholder="Ingrese su Edad" min="0">
            <p class="text-gray-500 text-left">Estatura Cliente (m)</p>
            <input class="px-2 rounded h-8" type="number" v-model="datosCliente.clienteEstatura" placeholder="Ingrese su Estatura" min="0" step=".01">
            <p class="text-gray-500 text-left">Peso Cliente (kg)</p>
            <input class="px-2 rounded h-8" type="number" v-model="datosCliente.clientePeso" placeholder="Ingrese su Peso" min="0" step=".01">
          </div>
          <div class="flex flex-col space-y-2">
            <p class="text-gray-500 text-left">Genero</p>
            <div class="flex justify-items-start items-center">
              <input class="mx-2" type="radio" value="Masculino" v-model="datosCliente.clienteGenero">
              <label class="mx-2" for="Masculino">Masculino</label>
              <input class="mx-2" type="radio" value="Femenino" v-model="datosCliente.clienteGenero">
              <label class="mx-2" for="Femenino">Femenino</label>
            </div>
            <p class="text-gray-500 text-left">Alergias</p>
            <div class="flex justify-items-start items-center">
              <input class="mx-2" type="checkbox" id="checkbox" v-model="datosCliente.clienteAlergias">
              <label class="mx-2" for="checkbox">Si</label>
            </div>
            <p v-if="datosCliente.clienteAlergias" class="text-gray-500 text-left">Nota</p>
            <input  v-if="datosCliente.clienteAlergias" class="px-2 rounded h-8 justify-self-stretch " type="text" v-model="datosCliente.clienteNota" placeholder="Ingrese Nota">
            <p v-if="datosCliente.clienteGenero != '' && datosCliente.clienteEdad != ''" class="text-gray-500 text-left">Actividad Fisica Diaria</p>
            <select v-if="datosCliente.clienteGenero != '' && datosCliente.clienteEdad != ''" v-model="datoCaf" class="w-full block text-gray-700 text-m mb-2" @click="obtenerCaf(datosCliente.clienteEdad,datosCliente.clienteGenero)">
              <option value="">Seleccione cuanta actividad hace diario</option>
              <option v-for="caf in cafs" :key="caf._id" :value=caf>{{caf.cafDesc}}</option>
            </select>
            <p class="text-gray-500 text-left">IMC</p>
            <input class="px-2 rounded h-8" type="text" placeholder="Calculo de su IMC" :value="datosCliente.clienteIMC = (datosCliente.clientePeso !== '' && datosCliente.clienteEstatura !== '') ? calcularIMC(datosCliente.clientePeso,datosCliente.clienteEstatura) : ''" disabled>
            <p class="text-gray-500 text-left">Calorias de Consumo Diario</p>
            <input class="px-2 rounded h-8" type="text" placeholder="Calculo de las Calorias usted debe consumir diario" :value="datosCliente.clienteCalDiarias = (datosCliente.clientePeso !== '' && datosCliente.clienteEstatura !== '' && datosCliente.clienteEdad !== '' && datoCaf !== '') ? calcularCalDiarias(datosCliente.clientePeso,datosCliente.clienteEstatura,datosCliente.clienteEdad,datoCaf) : ''" disabled>
          </div>

          <button class="col-start-1 col-end-3 mx-44 py-2 px-12 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-75" type="submit">SIGUIENTE</button>
        </form>
      </div>
      <div v-else class="flex-auto text-center">
        <h1 class="flex-auto text-xl font-semibold my-2"> Crea Nuevo Usuario </h1>
        <form @submit.prevent="creacionCliente()" class="grid grid-cols-2 gap-x-4 space-y-4 ">
          <div class="col-start-1 col-end-3">     
            <p v-if="Object.keys(planesAlimenticiosRecom).length !== 0 " class="text-gray-500 text-left">Planes Alimenticios Recomendados</p>  
            <div v-if="Object.keys(planesAlimenticiosRecom).length !== 0 "  class="grid ml-40 -mr-40 h-56 w-3/4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div v-for="item in planesAlimenticiosRecom" :key="item.planAlimNombre" @click="takePlanID(item._id)" :class="[item.check ? 'bg-green-500': '','card h-52 pt-6 my-2 h-30 mx-12 px-2 cursor-pointer border border-green-400 rounded-lg hover:shadow-md hover:border-green-200 transform hover:-translate-y-1 hover:bg-green-500 transition-all duration-1000']">
                  <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                      <h1 class="text-lg mb-2 font-bold">{{item.descPlanNombre}}</h1>
                      <p>{{item.descPlanRecom}}</p>
                  </div>
              </div>
            </div>
            <p class="text-gray-500 text-left">Planes Alimenticios</p>
            <div class="grid ml-40 -mr-40 h-56 w-3/4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div v-for="item in planesAlimenticios" :key="item.planAlimNombre" @click="takePlanID(item._id)"  :class="[item.check ? 'bg-blue-500':'','card h-52 pt-6 my-2 h-30 mx-12 px-2 cursor-pointer border border-blue-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 hover:bg-blue-500 transition-all duration-700']">
                  <div class="m-3 flex flex-col flex-wrap items-center justify-around">
                      <h1 class="text-m mb-2 font-bold">{{item.planAlimNombre}}</h1>
                      <p>{{item.planAlimDesc}}</p>
                  </div>
              </div>
            </div>
          </div>
          
          <div class="col-start-1 col-end-3 row-start-2">
            <a @click="volverAnteriorPantalla()" class="cursor-pointer col-start-1 col-end-3 mx-44 py-2 px-12 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-opacity-75"> REGRESAR </a>
            <button class="mx-44 py-2 px-12 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-opacity-75" type="submit">INGRESAR</button>
          </div>
        </form>
      </div>
    </div>  
  </div>
</template>

<script>
import router from '@/router/index'

export default {
  data(){
    return {
      mensaje:false,
      seleccionPlanAlim:false,
      idPlanSeleccionado:'',
      datosUsuario:{
          usuarioNombre:'',
          usuarioMail:'',
          usuarioPassword:'',
          usuarioCodigo:''
      },
      datosCliente:{
          clienteNombre:'',
          clienteEdad:'',
          clienteEstatura:'',
          clientePeso:'',
          clienteAlergias:'',
          clienteNota:'',
          clienteIMC:'',
          clienteGenero:'',
          clienteCalDiarias:'',
          caf:'',
          planAlimenticio:'',
          clienteCodigo:''
      },
      datoCaf:'',
      planesAlimenticios:[],
      cafs:[],
      planesAlimenticiosRecom:[]
    }
  },
  methods: {
    obtenerPlanesAlimenticios(){
      this.axios.get('/planAlim/nuevosUsuarios').then(res=>{      
          res.data.forEach(element => element.check = false)
          this.planesAlimenticios = res.data
          this.obtenerPlanesAlimenticiosRecomentados()
        })
        .catch(err =>{ 
          console.log(err.response.data);
          this.message = err.response.data.message;
          })
    },
    siguienteVentana(){
      this.datosCliente.clienteNombre = this.datosUsuario.usuarioNombre
      this.obtenerPlanesAlimenticios()
      this.seleccionPlanAlim = !this.seleccionPlanAlim
    },
    obtenerCaf(edad, genero){
      var mayor = edad>=19? true : false      
      this.axios.get(`/caf/${mayor}/${genero}`).then(res=>{
          this.cafs = res.data
        })
        .catch(err =>{
          this.message = err.response.data.message;
          })
    },
    calcularIMC(peso,estatura){
      var imc 
      imc = peso/Math.pow(estatura,2)
      return imc.toFixed(2)
    },
    calcularCalDiarias(peso,estatura,edad,caf){
      var calDiarias 
      var cafVal = caf.cafValor.$numberDecimal
      this.datosCliente.caf = caf._id
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
    },
    volverAnteriorPantalla(){
      this.seleccionPlanAlim = !this.seleccionPlanAlim
      this.planesAlimenticiosRecom = []
    },
    creacionDatosCliente(){
      this.axios.post('/nuevoCliente', this.datosCliente).then(res =>{
          res
          this.datosCliente.clienteNombre =''
          this.datosCliente.clienteEdad=''
          this.datosCliente.clienteEstatura=''
          this.datosCliente.clientePeso=''
          this.datosCliente.clienteAlergias=''
          this.datosCliente.clienteNota=''
          this.datosCliente.clienteIMC=''
          this.datosCliente.clienteGenero=''
          this.datosCliente.clienteCalDiarias=''
          this.datosCliente.caf=''
          this.datosCliente.planAlimenticio=''
          router.push({name:'Login'})
        }).catch(err =>{
          err.response.data.e.message==='Usuario validation failed: usuarioMail: Error, expected {} unique' ? alert("Usuario ya existe") : alert(err.response.data.message)
        })
    },
    creacionCliente(){
      this.datosUsuario.usuarioCodigo = Date.now()
      this.datosCliente.clienteCodigo = this.datosUsuario.usuarioCodigo
      this.datosCliente.planAlimenticio = this.idPlanSeleccionado
      this.axios.post('/nuevoUsuario', this.datosUsuario).then(res =>{
          res
          this.datosUsuario.usuarioNombre=''
          this.datosUsuario.usuarioMail=''
          this.datosUsuario.usuarioPassword=''
          this.creacionDatosCliente()
        }).catch(err =>{
          this.seleccionPlanAlim = !this.seleccionPlanAlim
          err.response.data.e.message==='Usuario validation failed: usuarioMail: Error, expected {} unique' ? alert("Usuario ya existe") : alert(err.response.data.message)
          })
    },
    takePlanID(id){
      this.planesAlimenticios.forEach(element =>{
        if(element._id === id){
          element.check = !element.check
        }
        else{ 
          element.check = false
        }
        })
      this.planesAlimenticiosRecom.forEach(element =>{
        if(element._id === id){
          element.check = !element.check
        }
        else{ 
          element.check = false
        }
        })
      this.idPlanSeleccionado = id
    },
    obtenerPlanesAlimenticiosRecomentados(){
      var planes = this.planesAlimenticios
      var kgm = 1.81
      var kg
      console.log(this.planesAlimenticios)
      for(var i in planes){
        if(this.datosCliente.clienteIMC >= planes[i].planAlimCalcMin.$numberDecimal && this.datosCliente.clienteIMC < planes[i].planAlimCalcMax.$numberDecimal) {
          var objPlan = {}
          objPlan._id = planes[i]._id
          objPlan.descPlanNombre = planes[i].planAlimNombre
          if(planes[i].tipoMenu.tipoMenuCod === 3){
            objPlan.descPlanRecom = "Te encuentras con un buen peso! Este plan es ideal si deseas mantenerte en tu peso ideal"
          }
          else if (planes[i].tipoMenu.tipoMenuCod === 2) {
            if(this.datosCliente.clienteIMC > 18.5){
              objPlan.descPlanRecom = "Te encuentras con un buen peso! Este plan es ideal si deseas mantenerte en tu peso ideal"
            }
            else{ 
              kg = (kgm/2) * 3
              objPlan.descPlanRecom = "Estas bajo de peso, Este plan te permitira aumentar aproximadamente "+kg+"Kg en un promedio de 3 meses"
            }
          }
          else { 
            kg = kgm * 3
            if(this.datosCliente.clienteIMC >= 25 && this.datosCliente.clienteIMC < 30){
              objPlan.descPlanRecom = "Usted tiene Sobrepeso, Este plan te permitira bajar aproximadamente "+kg+"Kg en un promedio de 3 meses"
            }
            else if (this.datosCliente.clienteIMC >= 30 && this.datosCliente.clienteIMC < 35){
              objPlan.descPlanRecom = "Usted tiene Obesidad Clase 1, Este plan te permitira bajar aproximadamente "+kg+"Kg en un promedio de 3 meses"
            }
            else if (this.datosCliente.clienteIMC >= 35 && this.datosCliente.clienteIMC < 40){
              objPlan.descPlanRecom = "Usted tiene Obesidad Clase 2, Este plan te permitira bajar aproximadamente "+kg+"Kg en un promedio de 3 meses"
            }
            else {
              objPlan.descPlanRecom = "Usted tiene Obesidad Clase 3, Este plan te permitira bajar aproximadamente "+kg+"Kg en un promedio de 3 meses"
            }
          }

          this.planesAlimenticiosRecom.push(objPlan)
        }
      }
    }
  }
}
</script>
