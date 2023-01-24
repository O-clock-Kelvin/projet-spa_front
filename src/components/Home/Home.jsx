import React from 'react';

// composants
import Card from 'react-bootstrap/Card';

// images
import womenWalkingDog from '../../assets/images/women-walking-dog.png';
import cat from '../../assets/images/chat.png';


// fonctions
import { useSelector } from 'react-redux';

import './styles.scss';


function Home() {

  const firstName = useSelector((fullstate) => fullstate.loginSettings.firstName);

  return (
    <>
      <h1 className='title-page'>Bonjour {firstName} </h1>
      <div className='home-container'>
        <Card >
        <Card.Body className='card-body'>
          <div className='description'>
            <Card.Title>Sortir un chien</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>  
          </div>
          <Card.Img variant="right" src={womenWalkingDog} />
        </Card.Body>
      </Card>

      <Card >
        <Card.Body className='card-body'>
          <div className='description'>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </div>
          <Card.Img variant="right" className="cat" src={cat} />
        </Card.Body>
      </Card>
      </div>
    </>
    
  );
}

export default React.memo(Home);
