import React from 'react';

// composants
import Card from 'react-bootstrap/Card';

// images
import womenWalkingDog from '../../assets/images/women-walks-dog.png';
import cat from '../../assets/images/cats-playing.png';

// fonctions
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.scss';


function Home() {

  const firstName = useSelector((fullstate) => fullstate.loginSettings.firstName);

  return (
    <>
      <h1 className='title-page'>Bonjour {firstName}</h1>
      <div className='home-container'>
        <Link
          to={"/walks"} 
        >
          <Card >
            <Card.Body className='card-body'>
              <div className='description'>
                <Card.Title>Sortir un chien</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>  
              </div>
              <div className='container-image'>
                <Card.Img variant="right" className="image" src={womenWalkingDog} alt="illustration, vielle dame promenant un chien"/>
              </div>
            </Card.Body>
          </Card>
        </Link>

      <Link
        to={"/visits"}
      >
        <Card >
          <Card.Body className='card-body'>
            <div className='description'>
              <Card.Title>Visiter la chatterie</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </div>
            <div className='container-image'>
              <Card.Img variant="right" className="image cat" src={cat} alt="illustration, petit chat souriant" />
            </div>
          </Card.Body>
        </Card>
      </Link>
      </div>
    </>  
  );
}

export default React.memo(Home);
