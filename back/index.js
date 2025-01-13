require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// Middlewares para:
// Verificar existencia de credenciales
// Validar el token
// Resportar por terminal las consultas

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.send('Servidor funcionando.'));


// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}.`));