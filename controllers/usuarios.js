require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `
    SELECT 
        id_usuario,
        rut_usuario,
        primer_nombre, 
        segundo_nombre, 
        apellido_paterno, 
        apellido_materno,
        fecha_nacimiento,
        correo_electronico,
        esta_subscrito,
        direccion,
        telefono
    FROM Usuarios 
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

module.exports.buscar = app.get('/:id', (request, response) => {
    const id_rol = request.params.id;
    const sql = `
      SELECT
        id_usuario,
        rut_usuario,
        primer_nombre, 
        segundo_nombre, 
        apellido_paterno, 
        apellido_materno,
        fecha_nacimiento,
        correo_electronico,
        esta_subscrito,
        direccion,
        telefono
    FROM Usuarios
    WHERE id_usuario = ?
    `;
    connection.query(sql, id_usuario, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        response.status(200).send(results[0]);
      } else {
        response.status(204).send('Sin resultado');
      }
    });
  });

module.exports.actualizar = app.patch('/', (req, res) => {
    const { id_usuario,rut_usuario , primer_nombre, segundo_nombre, apellido_paterno, apellido_materno,fecha_nacimiento,correo_electronico,esta_subscrito,direccion,telefono } = req.body;
    const sql = `
    UPDATE Usuarios 
    SET 
        rut_usuario = ?,
        primer_nombre = ?,
        segundo_nombre = ?,
        apellido_paterno = ?,
        apellido_materno = ?,
        fecha_nacimiento = ?,
        correo_electronico = ?,
        esta_subscrito = ?,
        direccion = ?,
        telefono = ?
    WHERE id_usuario = ?`;
    const values = [rut_usuario, primer_nombre,segundo_nombre,apellido_paterno,apellido_materno,fecha_nacimiento,correo_electronico,esta_subscrito,direccion,telefono,id_usuario];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Usuario con id ${id_usuario} actualizado correctamente`);
    });
});

module.exports.agregar = app.post('/', (req, res) => {
    const { id_usuario,rut_usuario,primer_nombre,segundo_nombre,apellido_paterno,apellido_materno,fecha_nacimiento,correo_electronico,esta_subscrito,direccion,telefono} = req.body;
    const sql = `
    INSERT INTO Usuarios 
        (id_Usuario,
        rut_usuario,
        primer_nombre,
        segundo_nombre, 
        apellido_paterno, 
        apellido_materno,
        fecha_nacimiento,
        correo_electronico,
        esta_subscrito,
        direccion,
        telefono) VALUES 
        (?,?,?,?,?,?,?,?,?,?,?)
    `;
    const values = [id_usuario,rut_usuario,primer_nombre,segundo_nombre,apellido_paterno,apellido_materno,fecha_nacimiento,correo_electronico,esta_subscrito,direccion,telefono];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Usuario ${id_usuario} agregado exitosamente');
    });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
    const id_usuario = request.params.id;
  
    const sql = "DELETE FROM Usuarios WHERE id_usuario = ?";
    connection.query(sql, id_rol, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Rol con id ${id_usuario} eliminado correctamente`);
      } else {
        response.status(404).send(`Rol con id ${id_usuario} no encontrado`);
      }
    });
  });
