import React from 'react';

//Components
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

// Functions
import { useSelector } from 'react-redux';

// images
import Volunteer from '../../assets/images/volunteer-with-dog.png';
import DogAndCat from '../../assets/images/dog-and-cat.png';
import DogHugsCat from '../../assets/images/dog-hugs-cat.png';

// CSS
import './styles.scss';

function Dashboard() {

  // récupération prénom de l'admin
  const firstName = useSelector((fullstate) => fullstate.loginSettings.firstName);

  return (
    <>
      <h1 className='title-page'>Bonjour {firstName} </h1>
      <div className='dashboard-container'>
        <CardGroup>
          <Card>
            <Card.Img variant="top" src={DogAndCat} />
            <Card.Body>
              <Button href="/create/card" variant="primary" type="submit">Voir tous les animaux</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img variant="top" src={Volunteer} />
            <Card.Body>
              <Button href="admin/create/user" variant="primary" type="submit">Créer un bénévole</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img variant="top" src={DogHugsCat} />
            <Card.Body>
              <Button href="/create/card" variant="primary" type="submit">Créer un animal</Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
