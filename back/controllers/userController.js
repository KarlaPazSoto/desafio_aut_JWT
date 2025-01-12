const {pool} = require('../config/config');

const getProfile = async (req, res) => {
    try{
        const user = await pool.query('SELECT id, email, rol FROM usuarios WHERE id = $1', [req.user.id]);
        res.json(user.rows[0]);
    }catch(error){
        res.status(500).json({error: 'Error al obtener el perfil.'});
    }
};

module.exports = { getProfile };