const {Router} = require('express');
const{ getAllGenresFromDb } = require('../controllers/genres')
const { Genre } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
	let genres = await getAllGenresFromDb();	
	return res.status(200).send(genres);
});

router.post('/', async (req, res) => {
	const {
		name
	} = req.body;
	if (!name)
		return res.status(400).send('Error: name, description and platform are required');
	const createdGenre = await Genre.create({
		name
	});

    //TODO crear relacion con los generos
	return res.status(201).send(createdGenre);
});

module.exports = router;