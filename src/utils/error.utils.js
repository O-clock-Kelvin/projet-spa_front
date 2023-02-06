const errorUtils = {

    errorHandler: (error) => {
		if (error && error.response?.data?.message) {
			switch (error.response.data.message) {
				case 'NOT_FOUND':
					return "Cet animal n'existe pas.";
				case 'BAD_INPUT':
					return 'Erreur de requête. Merci de retenter plus tard.';
				default:
					return 'Erreur du serveur, merci de retenter plus tard.';
			}
		} else {
			return 'Erreur du serveur, merci de retenter plus tard.';
		}
	},
};

export default errorUtils;