import axios from "axios";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_GAME_BY_ORIGIN = "FILTER_GAME_BY_ORIGIN"
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const CLEAN_DETAIL_STATE = "CLEAN_DETAIL_STATE";
export const MAYOR_A_TRES_GENRES = "MAYOR_A_TRES_GENRES";


export function getAllVideogames(){
    return async function(dispatch){
        try {
            const json=await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: json.data 
        })
        } catch (error) {
            console.log(error);
        }
        
    }
};

export function getAllGenres(){
    return async function(dispatch){
        try {
            const json=await axios.get("http://localhost:3001/genres");
         dispatch({
            type: GET_ALL_GENRES,
            payload: json.data
        })
        } catch (error) {
            console.log(error);
        }
        
    }
};
export function getVideogameByName(name){
    return async function(dispatch){
        try {
            const json=await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: json.data 
        })
        } catch (error) {
            alert("Videogame Not Found")
            console.log(error);
        }
        
    }
};
export function getVideogameDetail(id){
    return async function(dispatch){
        try {
            const json=await axios.get(`http://localhost:3001/videogames/${id}`);
           
        return dispatch({
            type: GET_VIDEOGAME_DETAIL,
            payload: json.data 
        })
        } catch (error) {
            console.log(error);
        }
        
    }
};
export function cleanDetailState(){
    return {
        type: CLEAN_DETAIL_STATE,
        payload:[]
    }
}
export function filterByGenre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload 
    }
};
export function filterGameByOrigin(payload) {
    return { 
        type: FILTER_GAME_BY_ORIGIN,
        payload
    }
}
export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}
export function postVideogame (payload){
    return async function () {
        const response = await axios.post("http://localhost:3001/videogames", payload);
        return response;
    }
  }

export function mayorATresGenres(){
 return {  
    type: MAYOR_A_TRES_GENRES,
}
}