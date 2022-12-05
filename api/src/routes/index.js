const { Router } = require("express");
const { API_KEY } = process.env;
const videogames = require ("./Videogames")
const genres = require ("./Genres")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/videogames", videogames);
router.use("/genres", genres);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
