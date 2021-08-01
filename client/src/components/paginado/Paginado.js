import React, { Fragment } from "react";
import s from './Paginado.module.css';

const Paginado = ({ paginas, handleClickPaginas }) => {
  
    return (
      <Fragment>
        {paginas.map((e) => (
          <button key={e} id={e} onClick={handleClickPaginas} className={s.BUTTON_PAG}>
            {e}
          </button>
        ))}
      </Fragment>
    );
  
};

export default Paginado;
