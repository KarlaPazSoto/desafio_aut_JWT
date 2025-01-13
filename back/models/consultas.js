const { pool } = require('../config/config');

const createUser = async (email, password, rol, lenguage) => {
    const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [email, password, rol, lenguage];

    try{
        const result = await pool.query(query, values);
        console.log('Usuario creado.');
        return result;
    }catch(error){
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

const getUsers = async () => {
    try{
        const { rows } = await pool.query('SELECT * FROM usuarios');
        console.log(rows);
        return rows;
    }catch(error){
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try{
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result;
    }catch(error){
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};

module.exports = { createUser, getUsers, getUserByEmail };
