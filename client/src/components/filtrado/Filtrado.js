import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVidegamesAllGenres, 
  setVideogamesGenero,
  setVideogamesGeneroSearch } from "../../actions/index";
import s from "./Filtrado.module.css";



const Filter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVidegamesAllGenres());
  }, [dispatch]);

  let state = useSelector((state) => state);
  
  const onclickGenero = (e) => {
    e.preventDefault();
    if (state.vistaEstado) {
      dispatch(setVideogamesGenero(e.target.value));
    } else {
      dispatch(setVideogamesGeneroSearch(e.target.value));
    }
  }

  return (
    <Fragment>
    
      <div>
        {state.allGeneres.map((e) => (
          <div key={e.id}>
            <button  id={e.id} className={s.btn_genero} value={e.name} onClick={onclickGenero}>
              {e.name}
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Filter;


