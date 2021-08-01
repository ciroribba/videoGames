import React, { Fragment } from "react";
import s from "./Order.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  ImSortAlphaAsc,
  ImSortAlphaDesc,
  ImSortNumericAsc,
  ImSortNumbericDesc,
} from "react-icons/im";
import {
  setVideogameOrderAll,
  setVideogameOrderNames  
} from "../../actions/index";

const Order = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const setOrder = (e) => {
    e.preventDefault();
    if (state.vistaEstado) {
      dispatch(setVideogameOrderAll(e.target.id));
    } else {
      dispatch(setVideogameOrderNames(e.target.id));
    }
  };

  return (
    <Fragment>
      <div className={s.orden}>
        <ImSortAlphaAsc onClick={setOrder} id="A-Z" size={15} className={s.more_text} />
        <ImSortAlphaDesc onClick={setOrder} id="Z-A" size={15} className={s.more_text} />
        <ImSortNumericAsc onClick={setOrder} id="Less Rating" size={15} className={s.more_text} />
        <ImSortNumbericDesc onClick={setOrder} id="More Rating" size={15} className={s.more_text} />
      </div>
    </Fragment>
  );
};

export default Order;
