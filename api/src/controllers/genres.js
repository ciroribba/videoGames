const axios = require('axios');
require('dotenv').config()
const {BASE_URL} = require('../utils/constans');
const { API_KEY } = process.env;
const { Genre } = require("../db");


const getAllGenresFromApi = async () => {
	const params = {key: API_KEY}
	let result = await axios.get(BASE_URL+ '/genres', {params: params});	
	let allGenres = result.data.results.map(game => ({id: game.id, name: game.name}));
	return allGenres;
};

const getAllGenresFromDb = async () => {
	let allgenders = await Genre.findAll();
	return allgenders;
};

module.exports = {
	getAllGenresFromApi,
	getAllGenresFromDb
}