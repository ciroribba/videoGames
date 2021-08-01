export const GetVideoGamesByOrder = (order, array) => {
	switch (order) {
		case 'A-Z':			
			return array.sort((a, b) => {
				if (a.name > b.name) {
					return 1;
				} else {
					return -1;
				}
			});
		case 'Z-A':
			return array.sort((a, b) => {
				if (a.name < b.name) {
					return 1;
				} else {
					return -1;
				}
			});
		case 'More Rating':
			return array.sort((a, b) => {
				if (a.rating < b.rating) {
					return 1;
				} else {
					return -1;
				}
			});
		case 'Less Rating':
			return array.sort((a, b) => {
				if (a.rating > b.rating) {
					return 1;
				} else {
					return -1;
				}
			});

		default:
			return [];
	}
};
export default GetVideoGamesByOrder;