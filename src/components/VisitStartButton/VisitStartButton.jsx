import { useState } from 'react';
import { useMutation } from 'react-query';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import visitRequest from '../../requests/visits.request';
import VisitEditor from '../VisitEditor/VisitEditor';

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
					<div
						onClick={() => setShowModal(true)}
						role='button'
						tabIndex='0'
						style={buttonStyle}
					>
						Visiter cette box
					</div>

					{/* Modale de confirmation de la balade */}
					<Modal show={showModal} onHide={() => setShowModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>confirmation de la visite</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Etes vous sur de vouloir visiter cette box ?
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={() => setShowModal(false)}>
								Annuler
							</Button>
							{isLoading ? (
								'Loading...'
							) : (
								<Button
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
						<div
							style={buttonStyle}
							onClick={() => {
								setShowEndEditor(true);
							}}
							role='button'
							tabIndex='0'
						>
							Terminer la visite
						</div>
					</>
				);
			} else {
				if (
					DateTime.fromISO(lastVisit.date).plus({ hour: 1 }) >=
						DateTime.now() &&
					lastVisit.end_date == undefined
				) {
					return (
						<div style={buttonStyle}>Ce box est déjà en cours de visite</div>
					);
				} else {
					return (
						<div style={buttonStyle}>Ce box a déjà été visité aujourd'hui</div>
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
