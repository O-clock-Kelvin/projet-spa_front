import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

// composants
// import { Button } from 'react-bootstrap';
import { ImEqualizer } from 'react-icons/im';

// fonctions
import animalsRequest from '../../requests/animals.request';

function ListAnimals() {

    // récupération de l'experience du bénévole pour récupérer les bons chiens
    // const [animals, setAnimals] = useState([]);
    // const [reloadButton, setReloadButton] = useState(false);
    // const [filter, setFilter] = useState(false);

    // requête pour récupérer tous les animaux à l'affichage de la page
    const { isLoading, error, data, isFetching } = useQuery('repoData', () => animalsRequest.getAllAnimals());

    useEffect(() => {
      if (data) {
        console.log(data);
      }
    }, [isLoading, error, data, isFetching]);

    // au click sur le filtre on affiche le composant
    // const openFilter = () => {
    //   setFilter(true);
    // };

    return (
      <>
        <h1 className='title-page'>Liste des animaux</h1>
        <div>
          <ImEqualizer className='filter' size={30}  />
        </div>
        <div>
          {/* {reloadButton && (
            <Button className='reload-button' type='button' onClick={reloadAnimals}>
              Revoir la liste
            </Button>
          )} */}
        </div>
          {/* {filter && (
            <FilterAnimals
              getDogsByFilter={getDogsByFilter}
              setFilteredDogs={setDogs}
              setFilter={setFilter}
              setReloadButton={setReloadButton}
            />
          )} */}
        <div className='cards-container'>
          {/* {!isLoading && dogs ? (
            dogs.map((dog) => renderDog(dog))
          ) : (
            <LoadingSpinner />
          )} */}
			</div>
		</>
    );
  }
  
  export default React.memo(ListAnimals);
  
