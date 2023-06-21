require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_categoria,
      tipo,
      estado
    FROM Categorias
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
  const id_categoria = request.params.id;
  const sql = `
    SELECT
        id_categoria,
        tipo,
        estado
    FROM Categorias
    WHERE id_categoria = ?
  `;
  connection.query(sql, id_categoria, (error, results) => {
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
    tipo,
    estado,
    id_categoria
  } = request.body;

  const sql = `
    UPDATE Categorias
    SET       
        tipo = ?,
        estado = ?
    WHERE id_categoria = ?
  `;

  const values = [
    tipo,
    estado,
    id_categoria
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Categoria con id ${id_categoria} actualizado correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const {
    id_categoria,
    tipo,
    estado
  } = request.body;

  const sql = `
    INSERT INTO Categorias (      
        id_categoria,
        tipo,
        estado)
    VALUES (?, ?, ?)
  `;

  const values = [
    id_categoria,
    tipo,
    estado
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Categoria registrado correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_categoria = request.params.id;

  const sql = "DELETE FROM Categorias WHERE id_categoria = ?";
  connection.query(sql, id_producto, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Categoria con id ${id_categoria} eliminado correctamente`);
    } else {
      response.status(404).send(`Categoria con id ${id_categoria} no encontrado`);
    }
  });
});

