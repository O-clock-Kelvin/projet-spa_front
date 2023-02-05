import {  useState } from 'react';
import { useMutation } from 'react-query';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WalkEditor from '../WalkEditor/WalkEditor';
import walksRequest from '../../requests/walks.request';
import experienceUtil from '../../utils/experience.utils';


import './WalkStartButton.scss';
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
		animal.walks[animal.walks.length - 1] ?? null
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
			setLastWalk(data.data);
			setShowModal(false);
		},
	});

	if (animal && admin == false) {
		/**
		 * durée de la balade max 1h donc on check si la derniere sortie remonte à plus d'une heure, pour déterminer si l'animal est en cours de balade
		 * On vérifie également que l'animal n'est pas déjà sorti dans la journée
		 */

		if (
			lastWalk === null ||
			(DateTime.fromISO(lastWalk?.date).plus({ hour: 1 }) <= DateTime.now() &&
				DateTime.fromISO(lastWalk?.date) <= DateTime.now().startOf('day') )
		) {
			if (
				experienceUtil.experienceConverter(experience) >=
				experienceUtil.experienceConverter(animal.volunteer_experience)
			) {
				return (
					<>
						<Button 
							onClick={() => setShowModal(true)}
							role='button'
							tabIndex='0'
							variant='primary'
							lg={2}													
						>
							Partir en balade
						</Button>

						{/* Modale de confirmation de la balade */}
						
						<Modal show={showModal} onHide={() => setShowModal(false)}>
							<Modal.Header closeButton>
								<Modal.Title>confirmation de balade</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								Etes vous sur de vouloir sortir cet animal ?
							</Modal.Body>
							<Modal.Footer>
								<div className='d-flex'>								
									{isLoading ? (
										'Loading...'
									) : (
										<Button
											className='me-2'
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
									<Button variant='secondary' onClick={() => setShowModal(false)}>Annuler	</Button>
								</div>
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
							onUpdate={(data) => {
								setStartedWalk(undefined);
								setLastWalk(data);
							}}
						/>
						<Button
							variant='primary'
							onClick={() => {
								setShowEndEditor(true);
							}}
							role='button'
							tabIndex='0'
						>
							Terminer la balade
						</Button>
					</>
				);
			} else {
				if (
					DateTime.fromISO(lastWalk.date).plus({ hour: 1 }) >= DateTime.now() &&
					lastWalk.end_date == undefined
				) {
					return (
						<p className='bg-secondary p-2 text-light'>Cet animal est en cours de sortie</p>
					);
				} else {
					return (
						<p className='bg-secondary p-2 text-light'>Cet animal est déjà sorti aujourd'hui</p>
					);
				}
			}
		}
	}
};
StartWalkButton.propTypes = {
	animal: PropTypes.object,
};

export default StartWalkButton;
