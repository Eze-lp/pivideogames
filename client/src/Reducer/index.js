import {
  FILTER_BY_GENRE,
  GET_ALL_GENRES,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_VIDEOGAME_DETAIL,
  FILTER_GAME_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  CLEAN_DETAIL_STATE,
  POST_VIDEOGAME,
  MAYOR_A_TRES_GENRES,
} from "../Actions/index";

const initialState = {
  videogames: [],
  allVideogames: [],
  detail: {},
  genres: [],
  platforms:[],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      let platforms = [];
      action.payload.map((e)=>(platforms = [...platforms, ...e.platforms]));
      return {
        ...state,
        videogames: [...action.payload],
        allVideogames: [...action.payload],
        platforms: Array.from(new Set(platforms))
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
        return {
            ...state,
            detail: action.payload,
        }
    case FILTER_BY_GENRE:
        const allGenres = state.allVideogames;
        const genresFiltered = action.payload === "All Videogames" ? allGenres :allGenres.filter(el => el.genres.includes(action.payload))
      return {
        ...state,
        videogames: genresFiltered,
      };
    case FILTER_GAME_BY_ORIGIN:
      const allStateVideoGames = state.allVideogames;
      const originFilter = action.payload === "Db" ? allStateVideoGames.filter(el=> el.createdInDb): allStateVideoGames.filter(el => !el.createdInDb)
      return {
        ...state,
        videogames: action.payload === "All Videogames" ? state.allVideogames : originFilter

      }
    case ORDER_BY_NAME:
      const allGames = [...state.videogames]
      const sortedGames = action.payload === "asc" ?
       allGames.sort(function (a, b){
        if (a.name.toLowerCase() > b.name.toLowerCase()){
          return 1;
        }
        if (b.name.toLowerCase() > a.name.toLowerCase()){
          return -1
        }
        return 0;
       }) :
       allGames.sort(function (a,b){
        if (a.name.toLowerCase() > b.name.toLowerCase()){
          return -1;
        }
        if(b.name.toLowerCase() > a.name.toLowerCase()){
          return 1;
        }
        return 0;
       })
      return {
        ...state,
        videogames: sortedGames
      }
      case ORDER_BY_RATING:
        const allGames2 = [...state.videogames]
      const sortedGames2 = action.payload === "lower" ?
       allGames2.sort(function (a, b){
        if (a.rating > b.rating){
          return 1;
        }
        if (b.rating > a.rating){
          return -1
        }
        return 0;
       }) :
       allGames2.sort(function (a,b){
        if (a.rating > b.rating){
          return -1;
        }
        if(b.rating > a.rating){
          return 1;
        }
        return 0;
       })
      return {
        ...state,
        videogames: sortedGames2
      }
      case CLEAN_DETAIL_STATE :
        return {
          ...state,
          detail: action.payload 

        }
      case POST_VIDEOGAME :
        return { 
          ...state,
        }
      
      case MAYOR_A_TRES_GENRES:
        const genresMayorA= state.allVideogames;
        const genresMayorFilter= genresMayorA.filter(el => el.genres.length >= 3)
        return {
          ...state,
          videogames: genresMayorFilter
        }

      

    default:
      return state;
  }
}

// const allGenres = state.allVideogames;
// const genresFiltered = action.payload === "All Videogames" ? allGenres :allGenres.filter(el => el.genres.includes(action.payload))

export default rootReducer;
