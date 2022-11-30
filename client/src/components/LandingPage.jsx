import React from "react";
import { Link } from "react-router-dom";
import styles from '../css/LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={styles.landing}>
        
            <h5 className={styles.wlc}>Bienvenido a tu Receta Favorita</h5>
            <Link to= '/home'> 
            <button className={styles.btn}>Entrar</button>
            </Link>
        </div>
       
    )
}