import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogameDetail, clearDetail } from "../../actions/index";
import { useParams, useHistory } from "react-router-dom";
import s from "./VideoGameDetail.module.css";
import Nav from "../nav/Nav";

export const VideoGameDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogameDetail);
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getVideogameDetail(id));
    return () => dispatch(clearDetail());
  }, [id, dispatch]);

  let history = useHistory();

  const volver = (e) => {
    e.preventDefault();
    if (state.vistaEstado) {
      history.push("/home");
    } else {
      history.goBack();
    }
  };

  if (typeof videogame !== "string") {
    return (
      <Fragment>
        <div className={s.contenedor_detail}>
          <div className={s.header_nav}>
            <Nav />
          </div>
          <div className={s.contenedor_detalle}>
            {videogame !== undefined && videogame.length !== 0 ? (
              <div>
                {console.log("Estoooo", videogame)}
                <div className={s.title_center}>
                  <h2>{videogame.name}</h2>
                </div>
                <div className={s.info}>
                  <div className={s.side}>
                    <img
                      src={videogame.background_image}
                      alt={videogame.name}
                      className={s.bord_img}
                    />
                    <br />
                    <h4>Rating: {videogame.rating}</h4>
                    <br />
                    <h4>Lanzamiento: {videogame.released}</h4>
                    <br />
                    <h4>Plataformas:</h4>
                    <ul className={s.ulli}>
                      {videogame.platforms?.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                    <h4>Generos:</h4>
                    <ul className={s.ulli}>
                      {videogame.genres?.map((g) => (
                        <li key={g.id}>{g.name}</li>
                      ))}{" "}
                    </ul>
                  </div>
                  <div className={s.desc}>
                    <h4>Descripción:</h4>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: videogame.description,
                      }}
                    />
                  </div>
                </div>
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
          <div>
            <button className={s.back} onClick={volver}>
              Volver
            </button>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className={s.padre2}>
        <div>
          <h1>{videogame}</h1>        
          <button className={s.back} onClick={volver}>
            Volver
          </button>
        </div>
      </div>
    );
  }
};

export default VideoGameDetail;
