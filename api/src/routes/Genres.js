const { Router } = require("express");

const { Genre } = require("../db");

const router = Router();



router.get("/", async (req, res) => {
    try {
        const genresDataBase = await Genre.findAll();
        res.status(200).send(genresDataBase);
    } catch (error) {
        res.status(400).json("Error en ruta genresDataBase", error);
    }
})






module.exports = router;
