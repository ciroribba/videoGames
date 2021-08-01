import {createStore, applyMiddleware, compose} from 'redux';
import videogameReducer from '../reducer/index';
import thunk from 'redux-thunk';

const store = createStore(videogameReducer, compose(applyMiddleware(thunk)));

export default store;