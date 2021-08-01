export const GetVideoGamesByOrigin = (tipo, array) => {
	let newArray = array.filter(el =>
		el.id.split('|')[0] === tipo
	);
	if(newArray.length === 0){
		newArray = ['😓 Ups! No hay resultados para tu consulta...']
	} 
	return newArray;
};

export default GetVideoGamesByOrigin;