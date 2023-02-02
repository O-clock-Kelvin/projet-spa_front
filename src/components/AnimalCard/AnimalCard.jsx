import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import animalUtil from '../../utils/animal.utils';
import timeUtil from '../../utils/time.utils';

const AnimalCard = ({ animal, showSpecie }) => {
	const age = timeUtil.convertBirthdayInAge(animal.age);
	return (
		<Card key={animal.id}>
			<Link to={`/animals/${animal.id}`}>
				<Card.Img
					variant='top'
					className='card-dog'
					src={
						animal.url_image ||
						animalUtil.renderDefaultAnimalPicture(animal.species)
					}
				/>
				<Card.Body>
					<Card.Title>{animal.name}</Card.Title>
					<Card.Text>
						{showSpecie && animalUtil.renderSpecie(animal.species)}
					</Card.Text>
					<Card.Text>
						<span className='age'>
							{age} an{age > 1 ? 's' : ''}
						</span>
						<span>
							{animal.gender === 'MALE' ? (
								<BiMaleSign className='gender' size={30} />
							) : (
								<BiFemaleSign className='gender' size={30} />
							)}
						</span>
					</Card.Text>
				</Card.Body>
			</Link>
		</Card>
	);
};

AnimalCard.propTypes = {
	animal: PropTypes.object,
	showSpecie: PropTypes.bool,
};
AnimalCard.defaultProps = {
	showSpecie: false,
};

export default AnimalCard;
