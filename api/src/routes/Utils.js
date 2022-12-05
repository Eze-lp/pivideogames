//FUNCIONES.

const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;


//Me traigo los cien juegos de la API
const getApiInfo = async () => {
  let allGames = [];
  let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    for (let i = 0; i < 5; i++) {
      let info = await axios.get(apiUrl);
      info.data.results.map((g) => {
        allGames.push({
          id: g.id,
          name: g.name,
          image: g.background_image,
          released: g.released,
          rating: g.rating,
          platforms: g.platforms.map((p) => p.platform.name),
          genres: g.genres.map((g) => g.name),
        });
      });
      apiUrl = info.data.next;
    }
    return allGames;
  } catch (error) {
    console.log("error en getApiInfo", error);
  }
};

const getDbInfo = async () => {
  try {
    const dataBase = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const newGame = await dataBase.map((n) => {
      return {
        id: n.id,
        name: n.name,
        image: n.image,
        released: n.released,
        rating: n.rating,
        platforms: n.platforms,
        genres: n.genres.map((g) => g.name),
        createdInDb: n.createdInDb,
      };
    });
    return newGame;
  } catch (error) {
    console.log("error en dataBase", error);
  }
};

const infoTotal = async () => {
  try {
    const infoApi = await getApiInfo();
    const dataBase = await getDbInfo();
    const allGames = [...infoApi,...dataBase];
    return allGames;
  } catch (error) {
    console.log("error en infoTotal", error);
  }
};
const genresDb = async () => {
  try {
    const infoApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = infoApi.data.results.map((g) => {
      return g.name;
    });
    genres.forEach((g) => {
      Genre.findOrCreate({
        where: { name: g },
      });
    });
    const genresDataBase = await Genre.findAll();
    return genresDataBase;
  } catch (error) {
    console.log("error en genresDb", error);
  }
};

const postVideoGame = async (objVideoGame) => {
  console.log(objVideoGame);
  try {
    const { name, description, released, rating, platforms, image, genres } =
      objVideoGame;

    const videoGame = { name, description, released, rating, platforms, image };
    const videoGameCreated = await Videogame.create(videoGame);
    genres.map(async (g) => {
      let genre = await Genre.findAll({
        where: { name: g },
      });
      videoGameCreated.addGenre(genre);
    });
  } catch (error) {
    console.log("error en post/game", error);
  }
};

module.exports = {
  getApiInfo,
  infoTotal,
  postVideoGame,
  genresDb,
};
