import React from "react";
import images from "../../Images/loaddding.gif"
import Styles from "../Styles/Loading.module.css"

export default function Loading({loading}){
    return (
        <div className={Styles.loading}>          
            <img src={images} width="330px"></img>
        </div>
    )
};