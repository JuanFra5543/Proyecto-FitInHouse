import cors from 'cors'
import morgan from 'morgan'

//Trae express al servidor
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

//inicializa proyecto
const app = express();

/* Importacion de rutas */
const planAlimRoutes = require("./routes/planAlimRoutes.js");
const cronogramaRoutes = require("./routes/cronogramaRoutes.js");
const consejosRoutes = require("./routes/consejosRoutes.js");
const clientesRoutes = require("./routes/clientesRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const usuariosRoutes = require("./routes/usuariosRoutes.js");
const ingredientesRoutes = require("./routes/ingredientesRoutes.js");
const loginRoutes = require("./routes/loginRoutes.js");
//Rutas auxiliares
const cafRoutes = require("./routes/cafRoutes.js");
const tipoMenuRoutes = require("./routes/tipoMenuRoutes.js");
const macronutrientesRoutes = require("./routes/macronutrientesRoutes.js");

//Configurar body-parser
app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conexion con MongoDB 
mongoose.connect("mongodb://localhost/proyectoIWdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

//Test de que la base de datos funciona
if(!db){
    console.log("Error valio Ron todo")
}else{
    console.log("Todo Chill penguin")
}

//Asigna el puerto
var port = process.env.PORT || 5000;

//Generar mensaje en la ruta
app.get('/', (req, res) => res.send("Wenache"));


app.use("/api",planAlimRoutes);
app.use("/api",menuRoutes);
app.use("/api",cronogramaRoutes);
app.use("/api",consejosRoutes);
app.use("/api",clientesRoutes);
app.use("/api",usuariosRoutes);
app.use("/api",ingredientesRoutes);
app.use("/api/login",loginRoutes);

//Rutas Auxiliares
app.use("/api",tipoMenuRoutes);
app.use("/api",cafRoutes);
app.use("/api",macronutrientesRoutes);

const history = require("connect-history-api-fallback");
app.use(history());

/* Hacer que escuche el puerto */
app.listen(port, ()=>{
    console.log("localhost:",port)
});