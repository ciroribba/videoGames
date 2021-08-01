import axios from 'axios';
import {
	VIDEOGAME_URL,
	VIDEOGAME_GENRES,
	VIDEOGAME_NAME,
	VIDEOGAME_ID,
} from '../utils/constants';

export const getAllVideogames = () => async (dispatch) => {
	try {
		const res = await axios.get(VIDEOGAME_URL);
		dispatch({type: 'GET_VIDEOGAMES', payload: res.data});
	} catch (err) {
		dispatch({type: 'ERROR', payload: 'No se pudo conectar con el servidor'});
	}
};

export const clearAllVideogames = () =>  {	
		return {type: 'GET_VIDEOGAMES', payload: undefined};
};

export const clearAllFilters = () =>  {	
	return {type: 'CLEAR_FILTERS', payload: undefined};
};

export const getVideogameSearch = (name) => async (dispatch) => {
	try {
		const res = await axios.get(VIDEOGAME_NAME + name);
		if(res.data.length === 0){
			dispatch({type: 'GET_VIDEOGAME_NAME', payload: ['😓 No hay resultados para tu búsqueda!!!']});
		}else {
			dispatch({type: 'GET_VIDEOGAME_NAME', payload: res.data});
		}		
	} catch (err) {
		dispatch({type: 'ERROR', payload: 'No se pudo conectar con el servidor'});
	}
};

export const clearVideogameSearch = () =>  {	
		return {type: 'GET_VIDEOGAME_NAME', payload: undefined};
};

export const cambiarVista = (bool) => (dispatch) => {
	dispatch({type: 'CHANGE_VIEW', payload: bool});
};

// export const getVideogameDetail = (id) => async (dispatch) => {
// 	try {
// 		const res = await axios.get(VIDEOGAME_ID + id);
// 		dispatch({type: 'GET_VIDEOGAME_DETAIL', payload: res.data});
// 	} catch (err) {
// 		dispatch({type: 'GET_VIDEOGAME_DETAIL', payload: '😓 Hubo un error interno, actualiza la página o haz click en volver'});
// 	}
// };

export const getVideogameDetail = (id) => (dispatch) => {
	axios.get(VIDEOGAME_ID + id)
	.then(respuesta => {
	  dispatch({ type: "GET_VIDEOGAME_DETAIL", payload: respuesta.data });
	})
	.catch((err) => {
	  dispatch({type: 'GET_VIDEOGAME_DETAIL', payload: '😓 Hubo un error interno, actualiza la página o haz click en volver'});
	});
};

// export function getVideogameDetail(id) {
//     return function (dispatch) {
//         fetch(VIDEOGAME_ID + id)
//           .then(respuesta => {
//             dispatch({ type: "GET_VIDEOGAME_DETAIL", payload: respuesta.json().data });
//           })
// 		  .catch((err) => {
// 			dispatch({type: 'GET_VIDEOGAME_DETAIL', payload: '😓 Hubo un error interno, actualiza la página o haz click en volver'});
// 		  });
//       };
// }



export const clearDetail = () =>  {
		return {type: 'GET_VIDEOGAME_DETAIL', payload: undefined};	
};

export const setVideogameOrderAll = (orden) => (dispatch) => {
	dispatch({
		type: 'SET_VIDEOGAMES_ORDEN',
		payload: orden,
	});
};



export const setVideogameOrderNames = (orden) => (dispatch) => {
	dispatch({
		type: 'SET_VIDEOGAMES_ORDEN_NAMES',
		payload: orden,
	});
};

export const getVidegamesAllGenres = () => async (dispatch) => {
	try {
		const res = await axios.get(VIDEOGAME_GENRES);
		dispatch({type: 'GET_VIDEOSGAMES_GENRES', payload: res.data});
	} catch (err) {
		dispatch({type: 'ERROR', payload: 'No se pudo conectar con el servidor'});
	}
};

export const setVideogamesGenero = (genero) => (dispatch) => {
	dispatch({
		type: 'SET_VIDEOGAMES_GENERO',
		payload: genero,
	});
};

export const setVideogamesGeneroSearch = (genero) => (dispatch) => {
	dispatch({
		type: 'SET_VIDEOGAMES_GENERO_SEARCH',
		payload: genero,
	});
};

export const setVideogamesOrigin = (genero) => (dispatch) => {
	dispatch({
		type: 'SET_VIDEOGAMES_ORIGIN',
		payload: genero,
	});
};

export const setVideogamesOriginFiltro = (genero) => (dispatch) => {
	dispatch({
		type: 'SET_VIDEOGAMES_ORIGIN_Filtro',
		payload: genero,
	});
};








