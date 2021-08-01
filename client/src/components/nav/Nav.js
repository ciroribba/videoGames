import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { cambiarVista, getAllVideogames, clearAllFilters } from "../../actions/index";
import s from "./Nav.module.css";
import { HiOutlineHome } from "react-icons/hi";


const Nav = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const irHome = (e) => {
    e.preventDefault();
    dispatch(getAllVideogames())
    dispatch(cambiarVista(true));
    history.push("/home");
  };

  const irCreate = (e) => {
    e.preventDefault();
    dispatch(clearAllFilters())
    var path = window.location.pathname;
    if(path === '/create'){
      window.location.reload();
    } else {
      history.push("/create");
    }    
  };

  return (
    <Fragment>
      <div className={s.home}>
        <div>
          <button onClick={irCreate} className={s.BUTTON_VFO}>
            CREAR VIDEOJUEGO
          </button>
        </div>
        <div>
          <button onClick={irHome} className={s.BUTTON_HOME}>
            <HiOutlineHome />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Nav;
