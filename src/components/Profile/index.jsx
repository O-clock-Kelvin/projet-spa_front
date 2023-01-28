/** @format */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import usersRequest from '../../requests/users.requests';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	firstname: yup
		.string()

		.min(2)
		.max(24),
	name: yup.string().min(2).max(24),
	email: yup.string().email(),
	phone_number: yup
		.string()
		.matches(
			/(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/m,
			'Veuillez renseigner un numero de telephone valide'
		),
	password: yup
		.string()
		.nullable()
		.notRequired()
		.min(8, 'Les mots de passe doivent comporter au moins 8 caractères')
		.max(24),
});

/**
 * ProfileEditor
 * Composant permettant à un utilisateur d'éditer son profile
 */
const ProfileEditor = ({ user, closeEditor, setUser }) => {
	const { isLoading, mutate, error } = useMutation({
		mutationFn: async ({ id, newUserData }) => {
			await usersRequest.update(id, newUserData);
		},
		onSuccess: (_, data) => {
			setUser(data.newUserData);
		},
	});

	const {
		register,
		handleSubmit,
		// formState: { errors },

		// getValues,
	} = useForm({
		defaultValues: {
			email: user.email,
			firstname: user.firstname,
			name: user.name,
			phone_number: user.phone_number,
		},
		resolver: yupResolver(schema),
	});

	const renderError = (error) => {
		if (error.response) {
			switch (error.response.data.message) {
				case 'BAD_INPUT':
					return 'Données non valides, vérifiez votre formulaire';
				case 'INTERNAL_ERROR':
					return 'Erreur interne. Merci de retenter plus tard';
				default:
					return 'Erreur interne. Merci de retenter plus tard';
			}
		}
	};
	return (
		<>
			{error ? <p>{renderError(error)}</p> : null}
			<form
				onSubmit={handleSubmit((data) =>
					mutate({ id: user.id, newUserData: data })
				)}
			>
				<fieldset>
					<input {...register('email')} />
				</fieldset>
				<fieldset>
					<input {...register('firstname')} />
				</fieldset>
				<fieldset>
					<input {...register('name')} />
				</fieldset>
				<fieldset>
					<input
						placeholder='********'
						{...register('password', {
							required: false,
							value: null, // pour contourner la validation de Yup, en back si le password=null, il n'est pas mis à jour
						})}
					/>
				</fieldset>
				<fieldset>
					<input {...register('phone_number')} />
				</fieldset>

				{!isLoading ? (
					<>
						<button type='submit'>Valider</button>
						<span onClick={() => closeEditor()} role='button' tabIndex='0'>
							annuler
						</span>
					</>
				) : (
					'Loading'
				)}
			</form>
		</>
	);
};
ProfileEditor.propTypes = {
	user: PropTypes.object,
	closeEditor: PropTypes.func,
	setUser: PropTypes.func,
};

/**
 * ProfilePage
 * Page de profile de l'utilisateur
 */
const ProfilePage = () => {
	const { id } = useSelector((fullstate) => fullstate.loginSettings);
	const [user, setUserData] = useState(null);
	const { isLoading: loading, error } = useQuery(
		'LoadProfile',
		() => usersRequest.getProfile(id),
		{
			onSuccess: (data) => {
				if (data.data) {
					setUserData(data.data);
				}
			},
		}
	);

	const [showEditor, setShowEditor] = useState(false);

	const renderExperienceLevel = (level) => {
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
	};

	const renderError = (error) => {
		if (error.response) {
			switch (error.response.data.message) {
				case 'BAD_INPUT':
					return 'Données requises non valides';
				case 'INTERNAL_ERROR':
					return 'Erreur interne. Merci de retenter plus tard';
				case 'NOT_FOUND':
					return 'Profile non trouvé';
				default:
					return 'Erreur interne. Merci de retenter plus tard';
			}
		}
	};
	if (!loading) {
		if (!error && user) {
			return (
				<div>
					{user.firstname} {user.name}
					<br />
					{user.admin ? 'Employé' : 'Bénévole'}
					<div>
						<img
							width={100}
							src={
								user.profile_picture
									? user.profile_picture
									: 'https://thispersondoesnotexist.com/image'
							}
							alt={` ${user.firstname} ${user.name}`}
						/>
					</div>
					<div>
						{showEditor ? (
							<ProfileEditor
								user={user}
								setUser={(newUser) => {
									setUserData({
										...user,
										...newUser,
									});
								}}
								closeEditor={() => {
									setShowEditor(false);
								}}
							/>
						) : (
							<>
								<ul>
									<li>email: {user.email}</li>
									<li>prénom: {user.firstname}</li>
									<li>nom: {user.name}</li>
									<li>role: {user.admin ? 'employé' : 'bénévole'}</li>
									<li>expérience: {renderExperienceLevel()}</li>
									<li>Téléphone: {user.phone_number}</li>
								</ul>
								<button
									onClick={() => {
										setShowEditor(true);
									}}
								>
									Editer mes informations
								</button>
							</>
						)}
					</div>
				</div>
			);
		} else {
			return renderError(error);
		}
	} else {
		return <p>Chargement de votre profile...</p>;
	}
};

export default ProfilePage;
