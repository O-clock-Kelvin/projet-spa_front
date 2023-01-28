/** @format */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import usersRequest from '../../requests/users.requests';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { actionSetUserName } from '../../actions/userAction';

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
const ProfileEditor = ({ user, callback }) => {
	const dispatch = useDispatch();
	const { isLoading, mutate, error } = useMutation({
		mutationFn: async ({ id, newUserData }) => {
			await usersRequest.update(id, newUserData);
		},
		onSuccess: (_, variables) => {
			console.log('SUCCESS DATA', variables);
			dispatch(actionSetUserName(variables.newUserData.firstname));
		},
	});

	const {
		register,
		handleSubmit,
		// formState: { errors },
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
						<span onClick={() => callback()} role='button' tabIndex='0'>
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
	callback: PropTypes.func,
};

/**
 * ProfilePage
 * Page de profile de l'utilisateur
 */
const ProfilePage = () => {
	const { id } = useSelector((fullstate) => fullstate.loginSettings);

	const {
		isLoading: loading,
		data,
		error,
	} = useQuery('LoadProfile', () => usersRequest.getProfile(id));
	// eslint-disable-next-line no-unused-vars

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
		if (!error && data) {
			return (
				<div>
					{data.data.firstname} {data.data.name}
					<br />
					{data.data.admin ? 'Employé' : 'Bénévole'}
					<div>
						<img
							width={100}
							src={
								data.data.profile_picture
									? data.data.profile_picture
									: 'https://thispersondoesnotexist.com/image'
							}
							alt={` ${data.data.firstname} ${data.data.name}`}
						/>
					</div>
					<div>
						{showEditor ? (
							<ProfileEditor
								user={data.data}
								callback={() => setShowEditor(false)}
							/>
						) : (
							<>
								<ul>
									<li>email: {data.data.email}</li>
									<li>prénom: {data.data.firstname}</li>
									<li>nom: {data.data.name}</li>
									<li>role: {data.data.admin ? 'employé' : 'bénévole'}</li>
									<li>expérience: {renderExperienceLevel()}</li>
									<li>Téléphone: {data.data.phone_number}</li>
								</ul>
								<button onClick={() => setShowEditor(true)}>
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
