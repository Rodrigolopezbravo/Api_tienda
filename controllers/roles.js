require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_rol,
      nombre,
      estado
    FROM Roles
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
  const id_rol = request.params.id;
  const sql = `
    SELECT
        id_rol,
        nombre,
        estado  
    FROM Roles
    WHERE id_rol = ?
  `;
  connection.query(sql, id_rol, (error, results) => {
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
    id_rol,
    nombre,
    estado
  } = request.body;

  const sql = `
    UPDATE Roles
    SET       
        nombre = ?,
        estado = ?
    WHERE id_rol = ?
  `;

  const values = [
    nombre,
    estado,
    id_rol
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Categoria con id ${id_rol} actualizado correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const {
    id_rol,
    nombre,
    estado
  } = request.body;

  const sql = `
    INSERT INTO Roles (      
        id_rol,
        nombre,
        estado)
    VALUES (?, ?, ?)
  `;

  const values = [
    id_rol,
    nombre,
    estado
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Rol registrado correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_rol = request.params.id;

  const sql = "DELETE FROM Roles WHERE id_rol = ?";
  connection.query(sql, id_rol, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Rol con id ${id_rol} eliminado correctamente`);
    } else {
      response.status(404).send(`Rol con id ${id_rol} no encontrado`);
    }
  });

});