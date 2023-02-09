import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { DateTime } from 'luxon';
import visitsRequest from '../../requests/visits.request';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const schema = yup.object().shape({
	comment: yup.string().nullable(),
	feeling: yup.string().oneOf(['BAD', 'MEDIUM', 'GOOD']),
});

const VisitEditor = ({ visit, show, endingVisit, onClose, onUpdate }) => {
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm({
		defaultValues: {
			comment: visit.comment || '',
			feeling: visit.feeling || 'GOOD',
		},
		resolver: yupResolver(schema),
	});

	const {
		isLoading,
		error,
		mutate: editVisit,
	} = useMutation({
		mutationFn: async (data) => {
			if (endingVisit) {
				return visitsRequest.update(visit.id, {
					...data,
					end_date: DateTime.now().toISO(),
				});
			} else {
				return visitsRequest.update(visit.id, data);
			}
		},
		onSuccess: (data) => {
			onUpdate(data.data); // on utilise la fonction de callback défini dans le composant parent
		},
	});

	const submitUpdate = (formData) => {
		editVisit(formData);
	};
	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{endingVisit ? 'Fin de visite' : 'Edition de la visite'}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleSubmit((data) => submitUpdate(data))}>
					<div className='m-5 d-flex flex-column'>
						<textarea
							// style={{ width: '100%' }}
							className='mb-3'
							{...register('comment')}
							placeholder='Noter ici un résumé de votre visite'
						/>
						<select
							className='p-1'
							{...register('feeling')}
							defaultChecked={visit.feeling || 'GOOD'}
							defaultValue={visit.feeling || 'GOOD'}
						>
							<option value='GOOD'>Bonne</option>
							<option value='MEDIUM'>Moyenne</option>
							<option value='BAD'>Mauvaise</option>
						</select>
					</div>
					{endingVisit ? (
						<Button
							variant='primary'
							type='submit'
							disabled={isLoading ? true : false}
						>
							{isLoading ? (
								<LoadingSpinner className='color-primary' />
							) : (
								'Terminer la visite'
							)}
						</Button>
					) : (
						<Button
							variant='primary'
							type='submit'
							disabled={isLoading ? true : false}
						>
							{isLoading ? (
								<LoadingSpinner className='color-primary' />
							) : (
								'Sauvegarder'
							)}
						</Button>
					)}
				</Form>
				{error && (
					<div>Une erreur est survenue. Merci de retenter plus tard.</div>
				)}
			</Modal.Body>
		</Modal>
	);
};

VisitEditor.propTypes = {
	visit: PropTypes.object,
	show: PropTypes.bool,
	endingVisit: PropTypes.bool,
	onClose: PropTypes.func,
	onUpdate: PropTypes.func,
};

export default VisitEditor;
