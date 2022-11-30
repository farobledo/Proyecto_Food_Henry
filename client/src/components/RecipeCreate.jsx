import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTypeDiets, postRecipes } from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from '../css/RecipeCreate.module.css'


function controlForm(input) {
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if (!input.title) errors.title = 'Por Favor pon el Titulo de la Receta'
    if (!input.summary) errors.summary = 'Por Favor pon el Resumen de la Receta'
    if (input.spoonacularScore < 0 || input.spoonacularScore > 100 || !reg.test(input.spoonacularScore)) errors.spoonacularScore = 'put a puntuation between 0-100'
    if (input.healthScore < 0 || input.healthScore > 100 || !reg.test(input.healthScore)) errors.healthScore = 'put a healthScore between 0-100'
    return errors
}


export default function CreateRecipe() {
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.typediets)
    console.log('esto es diet', listDiets);
    const [errors, setErrors] = useState({})      // este estado local es para, las validaciones(del formulario controlado)
    const [input, setInput] = useState({
        title: '',
        summary: '',
        spoonacularScore: '',
        healthScore: '',
        analyzedInstructions: '',
        typeDiets: []
    })
    // console.log(input);
    useEffect(() => {
        dispatch(getTypeDiets())
    }, [dispatch])
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(controlForm({
            ...input,
            [e.target.name]: e.target.value    // me copio todo lo que venga del formulario , en el caso de que en alguno
        }))                               // no cumpla con las validaciones, se va a poner un texto advirtiendo
    }
    function handleSelect(e) {
        setInput({
            ...input,
            typeDiets: [...input.typeDiets, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipes(input))
       
                
        alert('Felicidades creaste una nueva receta.!')
        setInput({
            title: '',
            summary: '',
            spoonacularScore: '',
            healthScore: '',
            analyzedInstructions: '',
            typeDiets: []
        })
      
}

    function handleDelete(e) {
        setInput({
            ...input,
            typeDiets: input.typeDiets.filter(diet => diet !== e)
        }) //este es para borrar algun tipe diet que haya elegido, va a creat un nuevo array con todos los que no sean
    }//    el elemento que le hice click

    return (

        <div className={styles.bkg}>
            <div className={styles.container}>

                <h1 className={styles.h1}>Crear Nueva Receta</h1>
                <form onSubmit={(e) => { handleSubmit(e) }} className={styles.form}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type='text'
                            name='title'
                            value={input.title}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.title && (
                            <p className={styles.error}>{errors.title}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Resume:</label>
                        <input
                            type='text'
                            name='summary'
                            value={input.summary}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.summary && (
                            <p className={styles.error}>{errors.summary}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Puntos:</label>
                        <input
                            type='text'
                            name='spoonacularScore'
                            value={input.spoonacularScore}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.spoonacularScore && (
                            <p className={styles.error}>{errors.spoonacularScore}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>salud:</label>
                        <input
                            type='text'
                            name='healthScore'
                            value={input.healthScore}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.healthScore && (
                            <p className={styles.error}>{errors.healthScore}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Creacion:</label>
                        <input
                            type='text'
                            name='analyzedInstructions'
                            value={input.analyzedInstructions}
                            onChange={(e) => { handleChange(e) }}
                        />
                    </div>
                    <br></br>
                   

                      <div>
                        <label>Dietas:</label>
                    <select onChange={(e) => handleSelect(e)} className={styles.select}>
                        {listDiets?.map((t) => {

                            return <option value={t}> {t} </option>})}
                    </select>
                    </div>
                    <br></br>

                  
                        
                    {errors.hasOwnProperty('title') || errors.hasOwnProperty('summary') || errors.hasOwnProperty('spoonacularScore') || errors.hasOwnProperty('healthScore') ? <p className={styles.adv}> Por Favor Complete Todas las Entradas para Crear su Receta</p> :<button onClick={(e) => handleSubmit(e)} className={styles.button}>Crear Receta</button>} {/* este es para que si todos los campos estan llenos, se pueda crear la receta */}

                
                
              


                {input.typeDiets.map(e => {
                    return (
                        <div >
                            <h5 className={styles.types}>{e}</h5>
                            <button className={styles.btnx} onClick={() => handleDelete(e)}>Borrar</button>
                        </div>
                    )
                })}
                </form>
                <br/>
                <Link to='/home'><button className={styles.btn}>Salir</button></Link>
                 
                </div>

            </div>
        
    )
}

           