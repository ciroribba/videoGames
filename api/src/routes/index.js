const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const games = require('./videogames.js');
const game = require('./videogame.js');
const genres = require('./genres.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', games);
router.use('/videogame', game);
router.use('/genres', genres);

module.exports = router;
