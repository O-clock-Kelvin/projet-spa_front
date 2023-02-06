import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import walksRequest from '../../requests/walks.request';
import { DateTime } from 'luxon';
const schema = yup.object().shape({
	comment: yup.string().nullable(),
	feeling: yup.string().oneOf(['BAD', 'MEDIUM', 'GOOD']),
});

const WalkEditor = ({ walk, show, endingWalk, onClose, onUpdate }) => {
	const {
		register,
		handleSubmit,
		// 		formState: { errors },
		// $
	} = useForm({
		defaultValues: {
			comment: walk.comment || '',
			feeling: walk.feeling || 'GOOD',
		},
		resolver: yupResolver(schema),
	});
	const {
		isLoading,
		error,
		mutate: editWalk,
	} = useMutation({
		mutationFn: (data) => {
			if (endingWalk) {
				walksRequest.update(walk.id, {
					...data,
					end_date: DateTime.now().toISO(),
				});
			} else {
				walksRequest.update(walk.id, data);
			}
		},
		onSuccess: (_, data) => {
			onUpdate(data); // on utilise la fonction de callback défini dans le composant parent
		},
	});

	const submitUpdate = (formData) => {
		editWalk(formData);
	};
	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{endingWalk ? 'Fin de balade' : 'Edition de la balade'}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleSubmit((data) => submitUpdate(data))}>
					<div className='m-5 d-flex flex-column'>
						<textarea
							className='mb-3'
							{...register('comment')}
							placeholder='Noter ici un résumé de votre balade'
						/>
						<select
							className='p-1'
							{...register('feeling')}
							defaultChecked={walk.feeling || 'GOOD'}
							defaultValue={walk.feeling || 'GOOD'}
						>
							<option value='GOOD'>Bonne</option>
							<option value='MEDIUM'>Moyenne</option>
							<option value='BAD'>Mauvaise</option>
						</select>
					</div>
					{endingWalk ? (
						<Button
							variant='primary'
							type='submit'
							disabled={isLoading ? true : false}
						>
							{isLoading ? 'Loading...' : 'Terminer la balade'}
						</Button>
					) : (
						<Button
							variant='primary'
							type='submit'
							disabled={isLoading ? true : false}
						>
							{isLoading ? 'Loading...' : 'Sauvegarder'}
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

WalkEditor.propTypes = {
	walk: PropTypes.object,
	show: PropTypes.bool,
	endingWalk: PropTypes.bool,
	onClose: PropTypes.func,
	onUpdate: PropTypes.func,
};

export default WalkEditor;
