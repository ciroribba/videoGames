const axios = require("axios");
require("dotenv").config();
const { BASE_URL } = require("../utils/constans");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const { QueryTypes } = require('sequelize');
const { conn } = require('../db');
const{ getGameFromApi } = require('./videogame');
const { Op } = require("sequelize");

const getVideoGamesFromApi = async () => {
  let params = { key: API_KEY , page_size:20};
  const apiVideoGamePromises = []
  const apiCompleteVideoGamePromises = []
  const allVideogames = []

  for (let index = 1; index < 6; index++) {
    params = {...params, page: index}
    apiVideoGamePromises.push(axios.get(BASE_URL + "/games", { params: params }));
  }

  await Promise.all(apiVideoGamePromises)
  .then(responses => {
    responses.forEach(response => {
      allVideogames.push(...response.data.results)
    })
  })

  allVideogames.forEach(videogame => {
    apiCompleteVideoGamePromises.push(getGameFromApi(videogame.id))
  });

  const resultFromApi = []
  await Promise.all(allVideogames)
  .then(responses => {
    responses.forEach(game => {
      resultFromApi.push({
        id: "api|" + game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map((p) => p.platform.name),
        genres: game.genres.map((genre) => ({id: genre.id, name:genre.name})),
      })
    })
  });
  return resultFromApi;
};

const getVideoGamesFromDB = async () => {
  let allVideoGamesFromDB = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["id","name"],
      through: {
        attributes: []
      }
    },
  });

  const videoGamesFromDB = allVideoGamesFromDB.map(function (result) {
    return {
      ...result.dataValues,
      id: "db|" + result.dataValues.id,
    };
  });

  return videoGamesFromDB;
};

const getGameByNameApi = async (name) => {
  const params = { key: API_KEY, search: name };

  let busquedaNombre = await axios.get(BASE_URL + `/games`, { params: params });
  const results = busquedaNombre.data.results;
  if(results.length === 0){
    return results;
  }
  
  return results.map(game => ({
    id: "api|" + game.id,
    name: game.name,
    background_image: game.background_image,
    released: game.released,
    rating: game.rating,
    platforms: game.platforms?.map((p) => p.platform.name),
    genres: game.genres?.map((genre) => ({id: genre.id, name:genre.name})),
}))
};

const getGameByNameDB = async (name) => {
  const allVideoGamesbyNameFromDB = await Videogame.findAll({
    where: {
      name:{[Op.like]: `%${name}%`}
    },
    include: {
      model: Genre,
      attributes: ["id","name"],
      through: {
        attributes: []
      }
    },
  });

  const videoGamesFromDB = allVideoGamesbyNameFromDB.map(function (result) {
    return {
      ...result.dataValues,
      id: "db|" + result.dataValues.id,
    };
  });
  return videoGamesFromDB;
};




module.exports = {
  getGameByNameApi,
  getGameByNameDB,
  getVideoGamesFromDB,
  getVideoGamesFromApi,
};