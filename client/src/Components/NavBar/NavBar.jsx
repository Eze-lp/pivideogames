import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, filterByGenre, filterGameByOrigin, orderByName, orderByRating, mayorRating, mayorATresGenres} from "../../Actions";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "../Styles/Navbar.module.css";
// import audio from "../../Audio/songPi.mp3";




export default function NavBar({setCurrentPage}) {
  const dispatch = useDispatch();
  // const allVideoGames = useSelector((state) => state?.videogames);
  const allGenres = useSelector((state) => state?.genres);
  const [order, setOrder] = useState("");
  
  
  //Me traigo del estado los personajes y los generos cuando los componentes se montan.
  
     useEffect(() => {
       dispatch(getAllVideogames());
      }, [dispatch]);
  
  //___________handle botón refresh:________________
  
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllVideogames());
  }
    //___________handle filter by genre:______________
    
    function handleFilterByGenre(e) { 
      
      dispatch(filterByGenre(e.target.value))
    }
    
    
    //___________handle filter gameApi Or gameDb:_____
    
    function handleFilterGameByOrigin (e) { 
      dispatch(filterGameByOrigin(e.target.value))
      setCurrentPage(1)
    }
    
    //___________handle Order by name:________________
    
    function handleSortByName (e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value))
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`)
      
    }
     //___________handle Order by rating:_____________
    
     function handleSortByRating (e){
      e.preventDefault();
      dispatch(orderByRating(e.target.value))
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`)
     }

    //___________handle Order by GENRES > 3:_____________

    function handleMayorATres(e){
      e.preventDefault();
      dispatch(mayorATresGenres());
      setCurrentPage(1);
    }
    
    
   
    return (
      <div className={styles.NavImage}>
      <div className={styles.NavBar}>
      <h1 className={styles.h1}>#SOYHENRY<br/>VIDEOGAMES</h1>
      <div>
        <select className={styles.select}
        onChange={e => handleFilterGameByOrigin(e)} defaultValue = "default">
          <option value="All Videogames">All Videogames</option>
          <option value="Api">Existing videogame</option>
          <option value="Db">Videogame created</option>
        </select>

        <select className={styles.select} defaultValue = "default"
        onChange={e => handleSortByName(e)}
        >
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>

        <select className={styles.select} defaultValue = "default"
        onChange={e => handleSortByRating(e)}>
          <option value="higher">Higher rating</option>
          <option value="lower">Lower rating</option>
        </select>

        <select className={styles.select} defaultValue = "default"
        onChange={e => handleFilterByGenre(e)}>
          <option value="All Videogames">All Genres</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>

        <button className={styles.select}
          onClick={(e) => {
            handleClick(e);
          }}
          >
          Refresh
        </button>

        {/* <button onClick = {(e) => handleMayorATres(e)}>
          Mas De Tres Generos
        </button> */}

   
        <button className={styles.select}>
          <Link to={"/form"}>Create New Videogame</Link>
        </button>
      <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
      </div>
      {/* <button>
        <audio  controls autoPlay loop >
        <source src={audio} type="audio/mpeg"></source>
        </audio>
      </button> */}
    </div>
    </div>
  );
}
