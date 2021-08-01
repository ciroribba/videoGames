import React, { Fragment } from "react";
import s from './Origen.module.css';
import { useSelector, useDispatch } from "react-redux";
import {
  setVideogamesOrigin,
  setVideogamesOriginFiltro,
} from "../../actions/index";

const Origen = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleClickOrigen = (e) => {
    e.preventDefault();
    if (state.vistaEstado) {
      dispatch(setVideogamesOrigin(e.target.id));
    } else {
      dispatch(setVideogamesOriginFiltro(e.target.id));
    }
  };

 
    return (
      <Fragment>
          <button id='api' onClick={handleClickOrigen} className={s.more_origen}>
              API
            </button>
            <button  id='db' onClick={handleClickOrigen} className={s.more_origen}>
              DB
            </button>          
      </Fragment>
    );
  
};

export default Origen;