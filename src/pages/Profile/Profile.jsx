/** @format */

import { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import usersRequest from "../../requests/users.requests";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { actionSetToken } from "../../actions/tokenAction";
import experienceUtil from "../../utils/experience.utils";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

//SCSS
import "./Profile.scss";

const schema = yup.object().shape({
	firstname: yup
		.string()

		.min(2)
		.max(24),
	name: yup.string().nullable(true).notRequired(true).min(2).max(24),
	email: yup.string().email(),
	phone_number: yup
		.string()
		.nullable(true)
		.notRequired(true)
		.matches(
			/(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/m,
			"Veuillez renseigner un numero de telephone valide"
		),
	password: yup
		.string()
		.nullable(true)
		.notRequired(true)
		.min(8, "Les mots de passe doivent comporter au moins 8 caractères")
		.max(24),
});

/**
 * ProfileEditor
 * Composant permettant à un utilisateur d'éditer son profile
 */
const ProfileEditor = ({ user, closeEditor, setUser }) => {
	const { isLoading, mutate, error } = useMutation({
		mutationFn: async ({ id, newUserData }) =>
			usersRequest.update(id, newUserData),
		onSuccess: (data) => {
			setUser(data.data);
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
				case "BAD_INPUT":
					return "Données non valides, vérifiez votre formulaire";
				case "INTERNAL_ERROR":
					return "Erreur interne. Merci de retenter plus tard";
				default:
					return "Erreur interne. Merci de retenter plus tard";
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
				className=' edit-container'
			>
				<Card className='edit'>
					<Card.Body>
						<Card.Title className='text-center'>FICHE PROFIL</Card.Title>
						<ListGroup className='edit-form'>
							<ListGroup.Item>
								<input className='form-control' {...register("name")} />
							</ListGroup.Item>
							<ListGroup.Item>
								<input className='form-control' {...register("firstname")} />
							</ListGroup.Item>
							<ListGroup.Item>
								<input className='form-control' {...register("email")} />
							</ListGroup.Item>
							<ListGroup.Item>
								<input
									className='form-control'
									placeholder='********'
									{...register("password", {
										required: false,
										value: null, // pour contourner la validation de Yup, en back si le password=null, il n'est pas mis à jour
									})}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								<input className='form-control' {...register("phone_number")} />
							</ListGroup.Item>
						</ListGroup>
					</Card.Body>
					{!isLoading ? (
						<>
							<>
								<Button onClick={""} className='edit-button'>
									valider
								</Button>
								<Button
									variant=''
									onClick={() => closeEditor()}
									role='button'
									tabIndex='0'
								>
									annuler
								</Button>
							</>
						</>
					) : (
						"Loading"
					)}
				</Card>
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
	const dispatch = useDispatch();
	const [user, setUserData] = useState(null);
	const { isLoading: loading, error } = useQuery(
		"LoadProfile",
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

	const renderError = (error) => {
		if (error.response) {
			switch (error.response.data.message) {
				case "BAD_INPUT":
					return "Données requises non valides";
				case "INTERNAL_ERROR":
					return "Erreur interne. Merci de retenter plus tard";
				case "NOT_FOUND":
					return "Profile non trouvé";
				default:
					return "Erreur interne. Merci de retenter plus tard";
			}
		}
	};
	if (!loading) {
		if (!error && user) {
			return (
				<div>
					<div className='profile-card-container'>
						{showEditor ? (
							<ProfileEditor
								user={user}
								setUser={(newUser) => {
									setUserData({
										...user,
										...newUser.data,
									});
									dispatch(actionSetToken(newUser.token));
								}}
								closeEditor={() => {
									setShowEditor(false);
								}}
							/>
						) : (
							<>
								<Card className='profile'>
									<Card.Header className='text-center'>
										<Card.Title className='text-center'>
											{user.firstname} {user.name}
										</Card.Title>
									</Card.Header>
									<Card.Img
										variant='top'
										src={
											user.profile_picture
												? user.profile_picture
												: "https://thispersondoesnotexist.com/image"
										}
										alt={` ${user.firstname} ${user.name}`}
									/>

									<Card.Body>
										<Card.Title className='text-center'>
											{user.admin ? "EMPLOYE" : "BENEVOLE"}
										</Card.Title>
									</Card.Body>

									<Card.Body>
										<Card.Text>
											Expérience :{""}{" "}
											{experienceUtil.renderExperienceLevel(user.experience)}
										</Card.Text>
										<Card.Text>Email : {user.email}</Card.Text>
										<Card.Text>
											Téléphone: {user.phone_number || "non renseigné"}
										</Card.Text>
										<Card.Footer>
											<Button
												onClick={() => {
													setShowEditor(true);
												}}
											>
												Editer mes informations
											</Button>
										</Card.Footer>
									</Card.Body>
								</Card>
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
