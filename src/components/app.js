import React, { useState, useRef, useEffect } from "react";
import { Musica } from "./musica";
import { Vacio } from "./vacio";


export const App = () => {

    const [state, setState] = useState({
        songs: null,
        playStop: false,
        cancionActual: []
    })


    let referencia = useRef();

    /*   const ponerCancion = (objeto) => {
          return objeto.map((ele, index) => {
               return <Musica key={index} {...ele} />
           })
       } */
    const setearMusica = (cancion) => {
        referencia.src = `https://assets.breatheco.de/apis/sound/${cancion}`;
        console.log(cancion);


    }

    const cancionAnterior = (cancion) => {
    }

    const playMusic = () => {

        setState((prevState) => {
            return { ...prevState, playStop: true }
        })
        referencia.play();

    }
    const pauseMusic = () => {

        referencia.pause();
        setState((prevState) => {
            /*Cambia el valor por el contrario  */
            return { ...prevState, playStop: !state.playStop }
        })

    }

    const getSongs = (url) => {
        fetch(url)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                setState(prevState => {
                    return { ...prevState, songs: data }
                })
            })

    }

    useEffect(() => {
        getSongs("https://assets.breatheco.de/apis/sound/songs")
    }, [])



    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 mx-auto ">
                    <ol className="list-group border border-info">
                        {
                            state.songs == null ? <Vacio /> :
                                state.songs.map((ele, index) => {
                                    return (
                                        <li key={index} className="list-group-item bg-dark" onClick={() => setearMusica(ele.url)} >
                                            {`${ele.id} - ${ele.name}`}
                                            <audio ref={(evento) => referencia = evento} id="audio" src="" />
                                        </li>)
                                })
                        }
                    </ol>
                    <button type="button" className="btn btn-dark btn-lg border-right mt-2 mx-2" onClick={() => cancionAnterior()}>Anterior</button>

                    {/* --- Ingreso Logica para cambiar el boton Play y Pause --- */}
                    {
                        state.playStop === true ? (<button id="play" type="button" className="btn btn-dark btn-lg border-right mt-2 mx-2" onClick={() => pauseMusic()}>Pause</button>)
                            :
                            <button id="play" type="button" className="btn btn-dark btn-lg border-right mt-2 mx-2" onClick={() => playMusic()}>Play</button>
                    }

                    <button type="button" className="btn btn-dark btn-lg mt-2 mx-2">Siguiente</button>

                </div>
            </div>

        </div>
    )
}