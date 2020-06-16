import React, { useState, useRef, useEffect } from "react";


export const App = () => {

    const [state, setState] = useState({
        songs: null,
        playStop: false,
        cancionActual: [],
        active: null
    })
    const [claseCancion, setClaseCancion] = useState(null)


    let referencia = useRef();

    const setearMusica = (cancion, index = "",) => {
        referencia.src = `https://assets.breatheco.de/apis/sound/${cancion}`;
        setState((prevState) => {
            return { ...prevState, active: index, playStop:false }
        })

    }

    const cancionAnterior = () => {
        setearMusica(state.songs[state.active - 1].url, state.active - 1)
    }

    const cancionSiguiente = () => {
        setearMusica(state.songs[state.active + 1].url, state.active + 1)
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



    //Al momento de cargar la página
    useEffect(() => {
        getSongs("https://assets.breatheco.de/apis/sound/songs")
    }, [])



    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 mx-auto ">
                    <ol className="list-group border border-info  bg-dark">
                        {
                            state.songs == null ? <h2>Lista Vacia</h2> :
                                state.songs.map((ele, index) => {
                                    return (
                                        <li key={index} className={"list-group-item bg-secondary" + (index == state.active ? " bg-info" : "")} onClick={(e) => setearMusica(ele.url, index, e)} >
                                            {`${ele.id} - ${ele.name}`}
                                        </li>)
                                })
                        }
                        {/* Aqui mantengo la referencia ya que solo necesito que se vaya cambiando, no creando una por cada li */}
                        <audio ref={(elemento) => referencia = elemento} id="audio" src="" />
                    </ol>
                    <button type="button" className="btn btn-dark btn-lg border-right mt-2 mx-2" onClick={() => cancionAnterior()}>Anterior</button>

                    {/* --- Ingreso Logica para cambiar el boton Play y Pause --- */}
                    {
                        state.playStop === true ? (<button id="play" type="button" className="btn btn-dark btn-lg border-right mt-2 mx-2" onClick={() => pauseMusic()}>Pause</button>)
                            :
                            <button id="play" type="button" className="btn btn-dark btn-lg border-right mt-2 mx-2" onClick={() => playMusic()}>Play</button>
                    }

                    <button type="button" className="btn btn-dark btn-lg mt-2 mx-2" onClick={cancionSiguiente}>Siguiente</button>

                </div>
            </div>

        </div>
    )
}