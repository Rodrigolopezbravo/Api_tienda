require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_especie,
      nombre_especie,
      estado
    FROM Especies
  `;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.buscar = app.get('/:id', (request, response) => {
  const id_especie = request.params.id;
  const sql = `
    SELECT
        id_especie,
        nombre_especie,
        estado
    FROM Especies
    WHERE id_especie = ?
  `;
  connection.query(sql, id_especie, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results[0]);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.actualizar = app.patch('/', (request, response) => {
  const {
  
    nombre_especie,
    estado,
    id_especie
  } = request.body;

  const sql = `
    UPDATE Productos
    SET       
        nombre_especie = ?,
        estado = ?
    WHERE id_especie = ?
  `;

  const values = [
    nombre_especie,
    estado,
    id_especie
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Producto con id ${id_especie} actualizado correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const {
    id_especie,
    nombre_especie,
    estado
  } = request.body;

  const sql = `
    INSERT INTO Productos (      
        id_especie,
        nombre_especie,
        estado)
    VALUES (?, ?, ?)
  `;

  const values = [
    id_especie,
    nombre_especie,
    estado
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Especie registrado correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_especie = request.params.id;

  const sql = "DELETE FROM Especies WHERE id_especie = ?";
  connection.query(sql, id_especie, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Especies con id ${id_especie} eliminado correctamente`);
    } else {
      response.status(404).send(`Especies con id ${id_especie} no encontrado`);
    }
  });

});
