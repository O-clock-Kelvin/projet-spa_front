import { useState } from 'react';
import { useMutation } from 'react-query';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WalkEditor from '../WalkEditor';
import walksRequest from '../../requests/walks.request';

const experienceConverter = (level) => {
	switch (level) {
		case 'MEDIUM':
			return 1;
		case 'EXPERT':
			return 2;
		default: // retourne par défault un niveau débutant (BEGINNER=0)
			return 0;
	}
};

/**
 * design de test, a supprimer
 */
const buttonStyle = { backgroundColor: 'lightgray', display: 'inline-block' };
const StartWalkButton = ({ animal }) => {
	const { id, experience, admin } = useSelector((state) => state.loginSettings);

	const [startedWalk, setStartedWalk] = useState(undefined); // contiendra les informations de la balade créée en BDD lors du départ en balade
	const [showModal, setShowModal] = useState(false);
	const [showEndEditor, setShowEndEditor] = useState(false);
	const [lastWalk, setLastWalk] = useState(
		animal.walks[animal.walks.length - 1] || undefined
	);
	const {
		isLoading,
		mutate: startWalk,
		error,
	} = useMutation({
		mutationFn: (data) => {
			return walksRequest.create(id, data.animal_id);
		},
		onSuccess: (data) => {
			setStartedWalk(data.data);
			setShowModal(false);
		},
	});

	if (animal && admin == false) {
		if (lastWalk) {
			/**
			 * durée de la balade max 1h donc on check si la derniere sortie remonte à plus d'une heure, pour déterminer si l'animal est en cours de balade
			 * On vérifie également que l'animal n'est pas déjà sorti dans la journée
			 */

			if (
				DateTime.fromISO(lastWalk.date).plus({ hour: 1 }) <= DateTime.now() &&
				DateTime.fromISO(lastWalk.date) <= DateTime.now().startOf('day') &&
				startedWalk == undefined
			) {
				if (
					experienceConverter(experience) >=
					experienceConverter(animal.volunteer_experience)
				) {
					return (
						<>
							<div
								onClick={() => setShowModal(true)}
								role='button'
								tabIndex='0'
								style={buttonStyle}
							>
								Partir en balade
							</div>

							{/* Modale de confirmation de la balade */}
							<Modal show={showModal} onHide={() => setShowModal(false)}>
								<Modal.Header closeButton>
									<Modal.Title>confirmation de balade</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									Etes vous sur de vouloir partir en balade ?
								</Modal.Body>
								<Modal.Footer>
									<Button
										variant='secondary'
										onClick={() => setShowModal(false)}
									>
										Annuler
									</Button>
									{isLoading ? (
										'Loading...'
									) : (
										<Button
											variant='primary'
											onClick={() => {
												startWalk({ animal_id: animal.id });
											}}
										>
											Oui
										</Button>
									)}
									{error && (
										<div style={buttonStyle}>
											Une erreur est survenue, merci de retenter plus tard
										</div>
									)}
								</Modal.Footer>
							</Modal>
						</>
					);
				} else {
					return (
						<div style={buttonStyle}>
							Vous ne pouvez pas partir en balade (expérience insuffisante)
						</div>
					);
				}
			} else {
				if (
					startedWalk ||
					(lastWalk.user_id == id &&
						lastWalk.end_date == undefined &&
						DateTime.fromISO(lastWalk.date).plus({ hour: 1 }) >= DateTime.now())
				) {
					return (
						<>
							<WalkEditor
								walk={startedWalk || lastWalk}
								show={showEndEditor}
								endingWalk={true}
								onClose={() => setShowEndEditor(false)}
								onUpdate={() => {
									setStartedWalk(undefined);
									setLastWalk(undefined);
								}}
							/>
							<div
								style={buttonStyle}
								onClick={() => {
									setShowEndEditor(true);
								}}
								role='button'
								tabIndex='0'
							>
								Terminer la balade
							</div>
						</>
					);
				} else {
					if (
						DateTime.fromISO(lastWalk.date).plus({ hour: 1 }) >=
							DateTime.now() &&
						lastWalk.end_date == undefined
					) {
						return (
							<div style={buttonStyle}>Cet animal est en cours de sortie</div>
						);
					} else {
						return (
							<div style={buttonStyle}>
								Cet animal est déjà sorti aujourd'hui
							</div>
						);
					}
				}
			}
		}
	}
};
StartWalkButton.propTypes = {
	animal: PropTypes.object,
};

export default StartWalkButton;
