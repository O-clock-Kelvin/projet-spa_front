import catProfil from '../../src/assets/images/chat-patte.png';
import dogProfil from '../../src/assets/images/dogProfil.png';

const animalUtil = {
	renderDefaultAnimalPicture: (specie) => {
		switch (specie) {
			case 'CAT':
				return catProfil;
			case 'DOG':
				return dogProfil;
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
