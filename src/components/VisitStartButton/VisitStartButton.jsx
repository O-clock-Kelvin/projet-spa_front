import { useState } from 'react';
import { useMutation } from 'react-query';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import visitRequest from '../../requests/visits.request';
import VisitEditor from '../VisitEditor/VisitEditor';

import '../../styles/index.scss';

/**
 * design de test, a supprimer
 */
const buttonStyle = { backgroundColor: 'lightgray', display: 'inline-block' };
const VisitStartButton = ({ box }) => {
	const { id, admin } = useSelector((state) => state.loginSettings);

	const [startedVisit, setStartedVisit] = useState(undefined); // contiendra les informations de la balade créée en BDD lors du départ en balade
	const [showModal, setShowModal] = useState(false);
	const [showEndEditor, setShowEndEditor] = useState(false);
	const [lastVisit, setLastVisit] = useState(
		box.visits[box.visits.length - 1] ?? null
	);

	const {
		isLoading,
		mutate: startVisit,
		error,
	} = useMutation({
		mutationFn: (data) => {
			return visitRequest.create(id, data.box_id);
		},
		onSuccess: (data) => {
			setStartedVisit(data.data);
			setLastVisit(data.data);
			setShowModal(false);
		},
	});

	if (box && admin == false) {
		/**
		 * durée de la balade max 1h donc on check si la derniere sortie remonte à plus d'une heure, pour déterminer si l'animal est en cours de balade
		 * On vérifie également que l'animal n'est pas déjà sorti dans la journée
		 */

		if (
			lastVisit === null ||
			DateTime.fromISO(lastVisit?.date) <= DateTime.now().startOf('day')
		) {
			return (
				<>
					<Button
						onClick={() => setShowModal(true)}
						role='button'
						tabIndex='0'
						className=' box-header-button'
					>
						Visiter ce box
					</Button>

					{/* Modale de confirmation de la balade */}
					<Modal show={showModal} onHide={() => setShowModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Confirmation de la visite</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Etes vous sur de vouloir visiter cette box ?
						</Modal.Body>
						<Modal.Footer>
							<div className='d-flex'>
								{isLoading ? (
									<Button className='me-2' variant='primary' disabled>
										Chargement...
									</Button>
								) : (
									<Button
										className='me-2'
										variant='primary'
										onClick={() => {
											startVisit({ box_id: box.id });
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
								<Button variant='secondary' onClick={() => setShowModal(false)}>
									Annuler{' '}
								</Button>
							</div>
						</Modal.Footer>
					</Modal>
				</>
			);
		} else {
			if (
				startedVisit ||
				(lastVisit.user_id == id &&
					lastVisit.end_date == undefined &&
					DateTime.fromISO(lastVisit.date).plus({ hour: 1 }) >= DateTime.now())
			) {
				return (
					<>
						<VisitEditor
							visit={startedVisit || lastVisit}
							show={showEndEditor}
							endingVisit={true}
							onClose={() => setShowEndEditor(false)}
							onUpdate={(data) => {
								setStartedVisit(undefined);
								setLastVisit(data);
							}}
						/>
						<Button
							onClick={() => {
								setShowEndEditor(true);
							}}
							role='button'
							tabIndex='0'
							className='btn-primary w-25 p-1 is-walking'
						>
							Terminer la visite
						</Button>
					</>
				);
			} else {
				if (
					DateTime.fromISO(lastVisit.date).plus({ hour: 1 }) >=
						DateTime.now() &&
					lastVisit.end_date == undefined
				) {
					return (
						<p className='bg-secondary p-2 text-light'>
							Ce box est déjà en cours de visite
						</p>
					);
				} else {
					return (
						<p className='bg-secondary p-2 text-light'>
							Ce box a déjà été visité aujourd'hui
						</p>
					);
				}
			}
		}
	}
};
VisitStartButton.propTypes = {
	box: PropTypes.object,
};

export default VisitStartButton;
