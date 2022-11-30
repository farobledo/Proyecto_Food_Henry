/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from '../css/Paginado.module.css'

export default function Paginado ({recipesPerPage ,  allRecipes , paginado}) {
const pageNumbers =  [1, 2, 3, 4, 5, 6]
    for (let i = 100 ; i < Math.ceil(allRecipes/recipesPerPage) ; i++){
   pageNumbers.push(i+0)
}
return (
          
    <nav  >
        <ul className={styles.ul} >
            {
                pageNumbers && pageNumbers.map(n => (
                    <li key={n}  >
                    <a className={styles.container} onClick= {() => paginado(n)} >{n}</a>
                    </li>
                ))
            }
        </ul>
    </nav>
            
)
}