export const GetVideoGamesByGenres = (genre, array) => {
	let newArray = array.filter((el) =>
		el.genres.some( g => g.name === genre)
	);
	if(newArray.length === 0){
		newArray = ['😓 Ups! No hay resultados para tu consulta...']
	} 
	return newArray;
};

export default GetVideoGamesByGenres;