const {pool} = require('../config/config');

const getProfile = async (req, res) => {
    try{
        const user = await pool.query('SELECT id, email, rol FROM usuarios WHERE id = $1', [req.user.id]);
        
        if(!user.rows.length){
            res.status(404).json({error: 'Usuario no encontrado.'});
        }
        res.json(user.rows[0]);
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({error: 'Error al obtener el perfil.'});
    }
};

module.exports = { getProfile };