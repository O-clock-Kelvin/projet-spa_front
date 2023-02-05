import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery } from 'react-query';
import boxesRequest from '../../requests/boxes.request';
import { Form } from 'react-bootstrap';
const BoxSelector = ({ specie, onBoxSelect }) => {
	console.log('BS SPECIE', specie);
	const [boxList, setBoxList] = useState([]);
	const { loading } = useQuery(['loadBoxes', specie], {
		queryFn: async () =>
			boxesRequest.getAll({
				type: specie,
			}),

		onSuccess: (data) => {
			setBoxList(data.data);
		},
	});

	if (!loading) {
		if (boxList.length > 0) {
			return (
				<Form.Select
					aria-label=''
					disabled={!specie}
					onChange={(e) => onBoxSelect(e.target.value)}
				>
					{specie ? (
						<option value={undefined}>Sélectionner</option>
					) : (
						<option value={undefined}>Sélectionnez une espèce</option>
					)}

					{boxList.map((box) => (
						<option key={box.id} value={box.id}>
							{box.number}
						</option>
					))}
				</Form.Select>
			);
		} else {
			return (
				<Form.Select aria-label='' disabled={true}>
					<option>Pas de box disponible</option>
				</Form.Select>
			);
		}
	} else {
		return (
			<Form.Select aria-label='' disabled={true}>
				<option>Chargement...</option>
			</Form.Select>
		);
	}
};

BoxSelector.propTypes = {
	specie: PropTypes.string,
	onBoxSelect: PropTypes.func,
};
export default BoxSelector;
