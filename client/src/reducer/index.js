import {
  GetVideoGamesByOrder,
  GetVideoGamesByGenres,
  GetVideoGamesByOrigin,
} from "../controllers/index";

const initialState = {
  allVideogames: [],
  videosByNames: [],
  videoGamesFiltrados: [],
  videoGamesOrdenados: [],
  videogameDetail: [],
  vistaEstado: true,
  vistaExito: false,
  videoGamesFiltrados2: [], 
  allGeneres:[], 
  error: ''
};

const videogameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ERROR":
      return {
        ...state,
        error: payload,
      };
    case "GET_VIDEOGAMES":
      return {
        ...state,
        allVideogames: payload,
        videoGamesFiltrados: payload,
      };
    case "GET_VIDEOGAME_NAME":
      state.videosByNames = payload;
      state.videoGamesFiltrados2 = payload;
      return {
        ...state
      };
    case "GET_VIDEOGAME_DETAIL":
      return {
        ...state,
        videogameDetail: payload,
      };
    case "CHANGE_VIEW":
      return {
        ...state,
        vistaEstado: payload,
      };
      case "SET_VIDEOGAMES_ORDEN":
        const arr =  GetVideoGamesByOrder(payload, state.allVideogames)
        const newState = {
          ...state,
          videoGamesFiltrados: arr
        };
      return newState;
      case "SET_VIDEOGAMES_ORDEN_NAMES":
        const arr2 =  GetVideoGamesByOrder(payload, state.videosByNames)
        const newState2 = {
          ...state,
          videoGamesFiltrados2: arr2
        };
      return newState2;
      case "GET_VIDEOSGAMES_GENRES":
      return {
        ...state,
        allGeneres: payload
      };
      case "SET_VIDEOGAMES_GENERO":{
        state.videoGamesFiltrados = GetVideoGamesByGenres(payload, state.allVideogames);  
           return {
            ...state
          };
      };
      case "SET_VIDEOGAMES_GENERO_SEARCH":
        state.videoGamesFiltrados2 = GetVideoGamesByGenres(payload, state.videosByNames);   
           return {
            ...state
          };
      
      case "SET_VIDEOGAMES_ORIGIN":
        state.videoGamesFiltrados = GetVideoGamesByOrigin(payload, state.allVideogames);   
           return {
            ...state
          };

      case "CLEAR_FILTERS":
            state.videoGamesFiltrados = []; 
            state.videoGamesFiltrados2 = [];
            state.allVideogames = [];
            state.videosByNames = [];
               return {
                ...state
              };
      case "SET_VIDEOGAMES_ORIGIN_Filtro":{
        const newArray7 = GetVideoGamesByOrigin(payload, state.videosByNames);   
           return {
          ...state,
          videoGamesFiltrados2: newArray7
        };
      };
    default:
      return state;
  }
};

export default videogameReducer;
