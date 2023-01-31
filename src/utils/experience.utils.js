const experienceUtil = {
	renderExperienceLevel: (level) => {
		switch (level) {
			case 'BEGINNER':
				return 'débutant';
			case 'MEDIUM':
				return 'intermédiaire';
			case 'EXPERT':
				return 'expert';
			default:
				return 'débutant';
		}
	},

	experienceConverter: (level) => {
		switch (level) {
			case 'MEDIUM':
				return 1;
			case 'EXPERT':
				return 2;
			default: // retourne par défault un niveau débutant (BEGINNER=0)
				return 0;
		}
	},
};

export default experienceUtil;
