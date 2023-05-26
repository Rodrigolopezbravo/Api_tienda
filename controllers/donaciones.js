require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();


module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `
    SELECT 
        ID_donacion, monto
    FROM Donaciones 
    WHERE ID_donacion = 1
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
    UPDATE Donaciones 
    SET ID_donacion = '1' ,monto = '0'
    WHERE ID_donacion = 3`;
    const values = [nombre, id];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Donacion con id ${id} actualizado correctamente`);
    });
});

module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = 
    "INSERT INTO Donaciones (ID_donacion, monto) VALUES (1, 40000)";
    ;
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Donacion agregada exitosamente');
    });
});

module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = `
    UPDATE Donaciones 
    SET ID_donacion = 1, monto = 0 
    WHERE ID_donacion = 3`;
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Donacion con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`Donacion con id ${id} no encontrado`);
      }
    });
});