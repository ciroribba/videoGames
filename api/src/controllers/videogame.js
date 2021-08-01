const axios = require('axios');
require('dotenv').config()
const {BASE_URL} = require('../utils/constans');
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

const validUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const getGameFromApi = async (id) => {
    const params = {key: API_KEY}
    let result;
    try{
        result = await axios.get(BASE_URL+ `/games/${id}`, {params: params});   
    }catch(err){
        switch (err.response.status){
            case 404: throw new Error('E001');
            default: throw new Error('E003');
        }
    }
    
    const game = result.data;
    return {
        id: "api|" + game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map((p) => p.platform.name),
        genres: game.genres.map((genre) => ({id: genre.id, name:genre.name})),
        description: game.description
    };
};

const getGameFromDb = async (id) => {
    if(!validUUID.test(id)){
        throw new Error('E002');
    }

    let game; 
    game = await Videogame.findOne({
        where: {
            id: id
         },
        include: {
          model: Genre,
          attributes: ["id","name"],
          through: {
              attributes: []
          }
        },
      });

    if(!game){
        throw new Error('E001');
    }

    return {
        ...game.dataValues,
        id: "db|" + game.dataValues.id,
      };;
};

const getGame = async (param) => {
    const aux = param.split("|")
    const type = aux[0];
    const id = aux[1];
    let game
    if (type === "db"){
        game = await getGameFromDb(id);
    }else{
        game = await getGameFromApi(id);
    }
    return game;
};

module.exports = {
    getGame,
    getGameFromApi
}