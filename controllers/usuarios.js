require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();


module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `
    SELECT 
        ID_usuario, nombre, apellido
    FROM Usuarios 
    WHERE ID_usuario = 1
    `;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});

module.exports.actualizar = app.patch('/', (req, res) => {
    const { id, nombre } = req.body;
    const sql = `
    UPDATE Usuarios 
    SET ID_usuario = 2 , nombre = "Rodrigo" , apellido = "Lopez bravo"
    WHERE id_usuario = 1`;
    const values = [nombre, id];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Usuario con id ${id} actualizado correctamente`);
    });
});

module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = `
    INSERT INTO Usuarios (ID_Usuario, nombre, apellido) VALUES (1, "Rodrigo", "Lopez")
    `;
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Usuario agregado exitosamente');
    });
});

module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = `
    UPDATE Usuarios 
    SET ID_usuario = 0 , nombre = 0 , apellido = 0
    WHERE ID_usuario = 2`;
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Usuario con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`Usuario con id ${id} no encontrado`);
      }
    });
});