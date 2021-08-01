import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Vista from "../vista/Vista";
import Searchbar from "../searchBar/SearchBar";
import Nav from "../nav/Nav";
import Paginado from "../paginado/Paginado";
import Order from "../order/Order";
import Filter from "../filtrado/Filtrado";
import Origen from "../origen/Origen";
import s from "./Home.module.css";
import {
  getAllVideogames,
  getVideogameSearch,
  cambiarVista,
  clearVideogameSearch,
} from "../../actions/index";
import img2 from '../../assets/error.png';

//Opcion2
const Home = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  //Estados locales
  const [name, setName] = useState("");

  const [resultadoFiltrado, setResultadoFiltrado] = useState(
    state.allVideogames
  );

  const [resultadoFiltrado2, setResultadoFiltrado2] = useState(
    state.videosByNames
  );

  //Cargo todos los videojuegos de la consulta 1 vez
  useEffect(() => {
    if (state.allVideogames.length === 0) {
      dispatch(getAllVideogames());
    }
    setResultadoFiltrado(state.allVideogames);
  }, [state.allVideogames, dispatch]);

  useEffect(() => {
    setResultadoFiltrado(state.videoGamesFiltrados);
  }, [state.videoGamesFiltrados]);

  useEffect(() => {
    setResultadoFiltrado2(state.videosByNames);
  }, [state.videosByNames]);

  useEffect(() => {
    setResultadoFiltrado2(state.videoGamesFiltrados2);
  }, [state.videoGamesFiltrados2]);

  useEffect(() => {
    setResultadoFiltrado2(state.videoGamesFiltrados2);
  }, [state.videoGamesFiltrados2]);

  const [errorlocal, setErrorLocal] = useState(state.error);

  useEffect(() => {
    setErrorLocal(state.error);
  }, [state.error]);

  //Obtengo el numero de paginas

  let paginasTotales;

  if (state.vistaEstado) {
    paginasTotales = Math.ceil(resultadoFiltrado.length / 15);
  } else {
    if (resultadoFiltrado2 !== undefined) {
      paginasTotales = Math.ceil(resultadoFiltrado2.length / 15);
    }
  }

  let paginas = [];
  for (let index = 1; index <= paginasTotales; index++) {
    paginas.push(index);
  }

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(15);

  const handleClickPaginas = (e) => {
    e.preventDefault();
    setMin((e.target.id - 1) * 15);
    setMax(e.target.id * 15);
  };

  //Search por nombre
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResultadoFiltrado([]);
    dispatch(clearVideogameSearch());
    if (name.length) {
      dispatch(getVideogameSearch(name));
    }
    setResultadoFiltrado2(state.videosByNames);
    dispatch(cambiarVista(false));
    setName(" ");
  };

  if (errorlocal === "") {
    return (
      <Fragment>
        <div className={s.headerContain}>
          <div className={s.header}>
            <Searchbar
              name={name}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <div className={s.logo}>VideoGames By Ciro</div>
            <Nav />
          </div>

          <div className={s.contenido}>
            <div className={s.sidebar}>
              <div className={s.padre}>Ordena tus juegos</div>

              <div className={s.sidebar_order}>
                <Order />
              </div>

              <div className={s.padre}>Filtra tus juegos</div>

              <div className={s.sidebar_filter}>
                <Filter />
              </div>

              <div>
                <Origen />
              </div>
            </div>

            <div className={s.vistas}>
              {state.vistaEstado ? (
                <div>
                  {resultadoFiltrado !== undefined &&
                  resultadoFiltrado.length !== 0 ? (
                    <div>
                      <div className={s.header_page}>
                        <Paginado
                          paginas={paginas}
                          handleClickPaginas={handleClickPaginas}
                        />
                      </div>

                      <Vista
                        VideoJuegos={resultadoFiltrado}
                        min={min}
                        max={max}
                      />
                    </div>
                  ) : (
                    <div className={s.padre}>
                      <div className={s.hijo}>
                        <div className={s.lds_ripple}>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {resultadoFiltrado2 !== undefined &&
                  resultadoFiltrado2.length !== 0 ? (
                    <div>
                      <div className={s.header_page}>
                        <Paginado
                          paginas={paginas}
                          handleClickPaginas={handleClickPaginas}
                        />
                      </div>

                      <Vista
                        VideoJuegos={resultadoFiltrado2}
                        min={min}
                        max={max}
                      />
                    </div>
                  ) : (
                    <div className={s.padre}>
                      <div className={s.hijo}>
                        <div className={s.lds_ripple}>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className={s.error}>
        <h3>Lo siento, ha ocurrido el siguiente error</h3> 
        <h1>{state.error}</h1>
        <h3>Intenta ingresar en unos instantes</h3>
        <img src={img2} alt='error' />
      </div>
    );
  }
};

export default Home;
