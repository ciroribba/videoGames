const { Router } = require("express");
const { getVideoGamesFromApi, getVideoGamesFromDB, getGameByNameApi, getGameByNameDB } = require("../controllers/videogames");

const router = Router();

router.get("/", async (req, res) => {
  let result;
  const name = req.query.name?.trim();

    if (name) {
    const videgameNameFromApi = await getGameByNameApi(name);
    const videgameNameFromDB = await getGameByNameDB(name);
    result = videgameNameFromDB.concat(videgameNameFromApi);
  } else {

    const videogamesFromApi = await getVideoGamesFromApi();
    const videogamesFromDb = await getVideoGamesFromDB();
    result = videogamesFromDb.concat(videogamesFromApi);
  }

  return res.status(200).send(result);
});

module.exports = router;
