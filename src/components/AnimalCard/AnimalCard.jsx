import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from 'react-bootstrap/Card';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import animalUtil from '../../utils/animal.utils';
import timeUtil from '../../utils/time.utils';
import catProfil from '../../assets/images/chat-patte.png';
import dogProfil from '../../assets/images/dogProfil.png';

import './AnimalCard.scss';

const AnimalCard = ({ animal, showSpecie }) => {
	const age = timeUtil.convertBirthdayInAge(animal.age);
	return (
		<Card
			className='animal-card'
			key={animal.id}
			// style={{ minWidth: '10px', maxWidth: '17rem' }}
		>
			<Link to={`/animal/${animal.id}`} className='text-dark'>
				<div className='cat-container'>					
				<Card.Img 
						variant='top' 
						className={classnames('card-dog', animal.url_image? '': 'default-picture')} 
						src={animal.url_image ? animal.url_image : (animal.species === 'CAT') ? catProfil : dogProfil} />
										
				
				<Card.Body>
					<Card.Title>{animal.name.toUpperCase()}</Card.Title>
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
				</div>
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
