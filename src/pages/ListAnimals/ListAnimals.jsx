import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

// composants bootstrap
import { Button } from 'react-bootstrap';
import { ImEqualizer } from 'react-icons/im';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// composants
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import FilterAnimals from '../../components/FilterAnimals/FilterAnimals';

// fonctions
import animalsRequest from '../../requests/animals.request';

// images
import Diego from '../../assets/images/Diego.jpeg';
import Cat from '../../assets/images/photo-cat.jpg';

function ListAnimals() {

    const [animals, setAnimals] = useState([]);
    const [reloadButton, setReloadButton] = useState(false);
    const [filter, setFilter] = useState(false);

    // requête pour récupérer tous les animaux à l'affichage de la page
    const { isLoading, error, data, isFetching } = useQuery('repoData', () => animalsRequest.getAllAnimals());

    useEffect(() => {
      if (data) {
        console.log(data);
        setAnimals(data.data);
      }
    }, [isLoading, error, data, isFetching]);

    // au click sur le filtre on affiche le composant
    const openFilter = () => {
      setFilter(true);
      setReloadButton(false);
    };

    // pour revoir la liste de tous les animaux on refait la requête
    const reloadAnimals = async () => {
      try {
        const data = await animalsRequest.getAllAnimals();
        setAnimals(data.data);
        setReloadButton(false);	
      } catch (error) {
        console.log(error);
      }
    };

    // on affiche chaque carte du chien de la liste récupérée
    const renderAnimal = (animal) => {
      return (
        <Card key={animal.id}>
          <Link
            to={`/animal/${animal.id}`}
          >
            <Card.Img variant='top' className='card-dog' src={animal.species === 'CAT' ? Cat : Diego} />
            <Card.Body>
              <Card.Title>{animal.name}</Card.Title>
            </Card.Body>
          </Link>
        </Card>
      );
    };

    return (
      <>
        <h1 className='title-page'>Liste des animaux</h1>
        <div>
          <ImEqualizer className='filter' size={30} onClick={openFilter} />
        </div>
        <div>
          {reloadButton && (
            <Button className='reload-button' type='button' onClick={reloadAnimals}>
              Revoir la liste de tous les animaux
            </Button>
          )}
        </div>
          {filter && (
            <FilterAnimals
              // getDogsByFilter={getDogsByFilter}
              setFilter={setFilter}
              setFilteredAnimals={setAnimals}
              setReloadButton={setReloadButton}
            />
          )}
        <div className='cards-container'>
          {!isLoading && animals ? (
            animals.map((animal) => renderAnimal(animal))
          ) : (
            <LoadingSpinner />
          )}
			</div>
		</>
    );
  }
  
  export default React.memo(ListAnimals);
  
