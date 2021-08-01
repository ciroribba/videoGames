import React, { Fragment }from 'react';
import { Link } from "react-router-dom";
import s from './LandingPage.module.css';
import img1 from '../../assets/laImagen.png';




const LandingPage = () => {
  
  return (
    <Fragment>
        <div className={s.padre}>
          <Link to='/home' className={ s.linkStyle }>
            <button className={s.hijo}>VideoGames By Ciro</button>
          </Link>
        </div>        
      
      <div className={s.container}>
        <img src={img1} alt='img1'className={s.slideInUpImg1}/>
      </div>
      
    </Fragment>
  );
};

export default LandingPage;
