const express = require("express");
const { getGame } = require("../controllers/videogame");
const { Videogame } = require("../db");

const router = express.Router();
router.use(express.json());

router.get("/:id", async (req, res) => {
  let game;
  try{
     game = await getGame(req.params.id);
  }catch(err){
    switch(err.message){
      case "E001": return res.status(404).send({message: 'game not found'})
      case "E002": return res.status(400).send({message: 'id must be an uuid'})
      case "E003": return res.status(500).send({message: 'unexpected error external api'})
      default: return res.status(500).send({message: 'internal server error'})
    }
  }
  return res.status(200).send(game);
});

router.post("/", async (req, res) => {
  const { name, description, released, rating, platforms, genres, background_image } =
    req.body;
  if (!name || !description || !platforms)
    return res
      .status(400)
      .send("Error: name, description and platform are required");
  const createVideoGame = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms,
    background_image
  });
  await createVideoGame.setGenres(genres);
  return res.status(201).send(createVideoGame);
});

module.exports = router;
