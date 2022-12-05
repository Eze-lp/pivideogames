import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName} from "../../Actions/index";
import styles from "../Styles/SearchBar.module.css"


export default function SearchBar({setCurrentPage}){
const dispatch = useDispatch()
const [name, setName] = useState("")

const handleInputName = (e)=>{
    e.preventDefault()
    setName(e.target.value)
}

const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(getVideogameByName(name))
    setName("")
    setTimeout(()=>{
        setCurrentPage(1)
    }, 3000) 
}

return (
    <div>
        <input className={styles.searchBar} type="text" placeholder="Search..." onChange={handleInputName} value={name}/>
        <button className={styles.searchBotton} type="submit" onClick={handleSubmit}>Search</button>
    </div>
)
}