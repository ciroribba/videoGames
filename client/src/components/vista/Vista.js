import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import s from "./Vista.module.css";
import { FiInfo, FiStar } from "react-icons/fi";
//import { MdStars } from "react-icons/md";

const Vista = ({ VideoJuegos, min, max }) => {
  if(typeof VideoJuegos[0] === 'object')
  {
  return (
    <Fragment>
      <div className={s.contenedor}>
        {VideoJuegos.map((e) => (
          <div key={e.id} className={s.card}>
            <div>
              <img src={e.background_image} alt="img" />
            </div>
            <div className={s.name}>{e.name}</div>
            <div>
              <ul>
                {e.genres.map((g) => (
                  <li key={g.id}>{g.name}</li>
                ))}
              </ul>
            </div>
            
            <div className={s.contentito}>
              <div><FiStar /></div>&nbsp;
              <div>{e.rating}</div>
            </div>
            
            <Link to={`/videogame/${e.id}`} className={s.linkStyle}>
              <FiInfo />
            </Link>
          </div>
        )).slice(min, max)}
      </div>
    </Fragment>
  );
                } else {
                  return (
                    <div className={s.noResult}>
                      <h3>{VideoJuegos[0]}</h3>
                    </div>
                  )
                }
};

export default Vista;
