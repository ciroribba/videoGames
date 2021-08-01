import React from 'react';
import { HiSearch } from "react-icons/hi";
import s from './SearchBar.module.css';


export const Searchbar =({handleChange, handleSubmit, name}) => {
 
    return (
      <div className={s.padre}>
        <form onSubmit={(e) => handleSubmit(e)} >
          <div>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => handleChange(e)}
              className={s.input_search}
            /> 
            &nbsp;
            <button type="submit" className={s.BUTTON_SEA}><HiSearch /></button>
          </div>
          
        </form>
                
      </div>
    );
  
}

export default Searchbar;