import React from 'react';

//Components
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

// Functions
import { useSelector } from 'react-redux';

// images
import womenWalkingDog from '../../assets/images/women-walks-dog.png';
import DogAndCat from '../../assets/images/dog-and-cat.png';
import DogHugsCat from '../../assets/images/dog-hugs-cat.png';

// CSS
import './Dashboard.scss';

function Dashboard() {

  // récupération prénom de l'admin
  const firstName = useSelector((fullstate) => fullstate.loginSettings.firstName);

  return (
    <>
      <h1 className='title-page'>Bonjour {firstName} </h1>
      <div className='dashboard-container'>
        <CardGroup>
          <Card>
            <Card.Img className='dashboard-container' variant="top" src={DogAndCat} />
            <Card.Body>
              <Button href="/create/card" variant="primary" type="submit">Liste des Animaux</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img variant="top" src={womenWalkingDog} />
            <Card.Body>
              <Button href="/create/card" variant="primary" type="submit">Créer un Bénévole</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img variant="top" src={DogHugsCat} />
            <Card.Body>
              <Button href="/create/card" variant="primary" type="submit">Créer Animal</Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
