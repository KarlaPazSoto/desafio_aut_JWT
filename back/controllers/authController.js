const bcrypt = require('bcryptjs');
const { createUser, getUsers } = require('../models/consultas');
const generateToken = require('../utils/generateToken');

const signUp = async (req, res) => {
    const { email, password, rol, lenguage } = req.body;

    console.log('Datos recibidos:', { email, password, rol, lenguage });

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await createUser(email, hashedPassword, rol, lenguage);
        
        console.log('Usuario creado:', newUser.rows[0]);

        const token = generateToken(newUser.rows[0]);
        
        console.log('Token generado:', token);
        
        res.json({message: 'Usuario creado.', user: newUser.rows[0]}, token);
    }catch(error){
        console.error('Bandera:', error);
        res.status(500).json({error: 'Error al crear el usuario.'});
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await getUsers(email);

        if (user.rows.length === 0) return res.status(400).json({error: 'Usuario no encontrado.'});
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).json({error: 'Contraseña incorrecta.'});

        const token = generateToken(user.rows[0].id);

        res.json({token});
    }catch(error){
        res.status(500).json({error: 'Error al iniciar sesión.'});
    }
};

module.exports = { signUp, logIn };