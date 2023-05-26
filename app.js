require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.port || 8000;

// configuración body parser para permitir json, y url encoded
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = require('./config/config');

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get("/api/test/",function(request,response){
	response.send("Bienvenido a API ");
});


// Se inicia servidor
app.listen(port, function (){
    console.log(`Servidor esta corriendo! http://localhost:${port}/`);
	controladores();
});

const roles = require('./controllers/roles');
const usuarios = require('./controllers/usuarios');
const donaciones = require('./controllers/donaciones');
//metodos
function controladores() {
    // rutas
    //Funcion de consultar roles
    app.use('/api/roles/', roles.agregar);
	app.use('/api/roles/', roles.buscar_todo);
    app.use('/api/roles/', roles.actualizar);
    app.use('/api/roles/', roles.eliminar);

    app.use('/api/usuarios/', usuarios.agregar);
    app.use('/api/usuarios/', usuarios.buscar_todo);
    app.use('/api/usuarios/', usuarios.actualizar);
    app.use('/api/usuarios/', usuarios.eliminar);

    app.use('/api/donaciones/', donaciones.agregar);
    app.use('/api/donaciones/', donaciones.buscar_todo);
    app.use('/api/donaciones/', donaciones.actualizar);
    app.use('/api/donaciones/', donaciones.eliminar);
    
}