import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

// Before your test, do next setting 
const middlewares = []; // If you are not using any middleware, leave the array empty or import it and put it in
const mockStore = configureStore(middlewares); // Setting of store based on the middlewares.
const initState = {
     // Define test values of sidebarDataSlice and loginDataSlice
};
// Create the store to pass as prop in the <Provider>
const store = mockStore(initState);

import Nav from './Nav';

Enzyme.configure({adapter: new Adapter()});

// function isFunction(functionToCheck) {
//     return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
//    }

describe('<Nav />', () => {
	let wrapper;
	beforeEach(() => {
	 wrapper = mount(
            <Provider store = {store}>
                <Nav  />
            </Provider>
    );
	});

	it('It should render two <button />', () => {
		expect(wrapper.find('button')).toHaveLength(2);
	});

    it('The first button should contain the text "CREAR VIDEOJUEGO"', () => {
        expect(wrapper.find('button').at(0).text()).toEqual('CREAR VIDEOJUEGO');
	});

    it('The first button should call the function "irCreate" on clic', () => {
        expect(wrapper.find('button').at(0).props().onClick.name).toEqual('irCreate');
	});

    it('The second button should call the function "irHome" on clic', () => {
        expect(wrapper.find('button').at(1).props().onClick.name).toEqual('irHome');
	});

    it('The buttons should have the right className', () => {
        expect(wrapper.find('button').at(0).props().className).toEqual('BUTTON_VFO');
        expect(wrapper.find('button').at(1).props().className).toEqual('BUTTON_HOME');
	});
    
	
});
