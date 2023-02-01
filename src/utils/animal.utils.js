const animalUtil = {
	renderDefaultAnimalPicture: (specie) => {
		switch (specie) {
			case 'CAT':
				return 'https://api.kyivindependent.com/storage/2021/12/loveyoustepan.-instagram-1200x630.jpg';
			case 'DOG':
				return 'https://images.dog.ceo/breeds/appenzeller/n02107908_2809.jpg';
			default:
				return 'https://play-lh.googleusercontent.com/8QnH9AhsRfhPott7REiFUXXJLRIxi8KMAP0mFAZpYgd44OTOCtScwXeb5oPe1E4eP4oF';
		}
	},

	renderSpecie: (specie) => {
		switch (specie) {
			case 'CAT':
				return 'chat';
			case 'DOG':
				return 'chien';
			default:
				return 'autre';
		}
	},
};

export default animalUtil;
