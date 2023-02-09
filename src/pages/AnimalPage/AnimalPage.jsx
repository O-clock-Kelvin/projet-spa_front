import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import animalsRequest from '../../requests/animals.request';
import errorUtils from '../../utils/error.utils';
import timeUtil from '../../utils/time.utils';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

import './AnimalPage.scss';

import StartWalkButton from '../../components/WalkStartButton/WalkStartButton';
import AnimalWalksList from '../../components/AnimalWalksList';
import BoxVisitsList from '../../components/BoxVisitsList/BoxVisits';
import { DateTime } from 'luxon';
import animalUtil from '../../utils/animal.utils';

import catProfil from '../../assets/images/chat-patte.png';
import dogProfil from '../../assets/images/dogProfil.png';

const TagsList = ({ tags }) => {
	if (tags) {
		return (
			<ul className='tags-animal-page d-flex flex-row justify-content-center'>
				{tags.map((tag) => (
					<li className='tag me-1' key={tag.tag_id}>
						{tag.tag.name}
					</li>
				))}
			</ul>
		);
	} else {
		/**
		 * @todo check si il faut afficher quelque chose si l'animal n'a pas de tags
		 */
		return null;
	}
};
TagsList.propTypes = {
	tags: PropTypes.array,
};

const AnimalPage = () => {
	let { animalId } = useParams();
	const [animal, setAnimal] = useState();
	// use query
	const { error, isLoading } = useQuery('getAnimal', {
		queryFn: async () =>
			animalsRequest.get(animalId, {
				includeTags: true,
				includeWalks: true,
				includeBox: true,
			}),

		onSuccess: (data) => {
			setAnimal(data.data);
		},
	});

	const renderElapsedTimeSinceLastWalk = (date) => {
		const startOfDay = DateTime.fromISO(date).startOf('day').toISO();
		const duration = timeUtil.convertDateInDaysUntilToday(startOfDay);
		switch (duration) {
			case 0:
				return "aujourd'hui";
			case 1:
				return 'hier';
			default:
				return `il y a ${duration} jours`;
		}
	};

	if (!isLoading) {
		if (animal) {
			return (
				<>
					<h1 className='title-page'>Fiche de {animal.name}</h1>

					<div className='d-flex flex-row justify-content-center m-5 flex-wrap'>
						<div
							className='d-flex flex-row p-4 animal-information me-5'
							style={{ minHeight: '400px', maxHeight: '27rem' }}
						>
							<div className='d-flex flex-column justify-content-between'>
								<div
									className='d-flex flex-row align-items-start justify-content-between'
									style={{ maxWidth: '17.5rem' }}
								>
									<Image
										className={classnames(
											'card-dog',
											'rounded',
											animal.url_image ? '' : 'default-picture'
										)}
										src={
											animal.url_image
												? animal.url_image
												: animal.species === 'CAT'
												? catProfil
												: dogProfil
										}
										alt={animal.name}
									/>

									<div className='d-flex flex-column'>
										<div className='p-2 tag-info'>
											<p>
												{timeUtil.convertBirthdayInAge(animal.age)}
												<br />
												An
												{timeUtil.convertBirthdayInAge(animal.age) > 1
													? 's'
													: ''}{' '}
											</p>
										</div>
										<div className='p-2 tag-info'>
											<p>{animalUtil.renderSize(animal.size)}</p>
										</div>
										<div className='p-2 tag-info'>
											<p>{animal.gender === 'MALE' ? 'Mâle' : 'Femelle'}</p>
										</div>
									</div>
								</div>
								<div
									className=' d-flex flex-column justify-content-between align-items-center'
									style={{ height: 180 }}
								>
									<TagsList tags={animal.tags} />
									{animal.species == 'DOG' ? (
										<span className='tag-info' style={{ padding: '0.4rem' }}>
											cage:{animal.box.number}
										</span>
									) : (
										<Link to={`/box/${animal.box.id}`}>
											<span className='tag-info' style={{ padding: '0.4rem' }}>
												box: {animal.box.number}
											</span>
										</Link>
									)}

									{animal.species === 'DOG' && (
										<StartWalkButton animal={animal} />
									)}
									{animal.walks[0] ? (
										<p>
											Dernière sortie :{' '}
											{renderElapsedTimeSinceLastWalk(
												animal.walks[animal.walks.length - 1].date
											)}
										</p>
									) : (
										<p className='mt-3'>Jamais sorti</p>
									)}
								</div>
							</div>
						</div>
						<div
							className='d-flex flex-column'
							style={{ minWidth: '300px', maxWidth: '500px' }}
						>
							<div>
								<h4 className='subtitle-page'>Biographie</h4>
								<div className='animal-bio'>
									{animal.bio ? animal.bio : "Cet animal n'a pas de bio."}
								</div>
							</div>
							<div>
								{animal.species === 'DOG' && (
									<>
										<h4 className='subtitle-page'>Dernières balades</h4>
										<AnimalWalksList animalId={animal.id} />
									</>
								)}
								{animal.species === 'CAT' && (
									<>
										<h4 className='subtitle-page'>Dernières visites du box</h4>
										<BoxVisitsList boxId={animal.box_id} />
									</>
								)}
							</div>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<div>
					<p>Erreur lors du chargement de la page de l'animal... </p>
					{errorUtils.errorHandler(error)}
				</div>
			);
		}
	} else {
		/**
		 * @todo better loading screen
		 */
		return <p>Loading...</p>;
	}
};

export default AnimalPage;
