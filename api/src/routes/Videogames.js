const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env; 
const { infoTotal, postVideoGame } = require("./Utils");
const { Videogame, Genre } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const apiInfo = await infoTotal();
    if (name) {
      const nameFilter = apiInfo.filter((videogames) =>
        videogames.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
      nameFilter.length
        ? res.status(200).send(nameFilter.slice(0, 15) )
        : res.status(404).json("No se encontró el videojuego");
    } else {
      res.status(200).json(apiInfo);
    }
  } catch (error) {
    res.status(404).json("error en query name", error);
  }
});



router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // Los juegos de la api son numeros los de la base de datos no lo son
  if (isNaN(id)) {
    const game = await Videogame.findByPk(id, { include: Genre });
    res.status(200).json(game);
  } else {
    const gameApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=3a41d47c46cb49498752545b999369fd`
    );

    const result = {
      id: gameApi.data.id,
      name: gameApi.data.name,
      description: gameApi.data.description_raw,
      image: gameApi.data.background_image,
      released: gameApi.data.released,
      genres: gameApi.data.genres.map((gen) => {
        return { id: gen.id, name: gen.name };
      }),
      rating: gameApi.data.rating,
      platforms: gameApi.data.platforms.map((el) => el.platform.name),
    };
    res.status(200).json(result);
  }
});

router.post("/", async (req, res) => {
  try {
    const objVideoGame = req.body;
    const newGame = await postVideoGame(objVideoGame);
    res.status(200).send(newGame);
  } catch (error) {
    res.status(400).json("Error en ruta Post", error);
  }
});

module.exports = router;
