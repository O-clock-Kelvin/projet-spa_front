import React from 'react';

// composants
import Card from 'react-bootstrap/Card';

// images
import womenWalkingDog from '../../assets/images/women-walks-dog.png';
import cat from '../../assets/images/cats-playing.png';

// fonctions
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Home.scss';


function Home() {
  
  const firstName = useSelector((fullstate) => fullstate.loginSettings.firstName);

  return (
    <>
      <h1 className='title-page'>Bonjour {firstName}</h1>
      <div className='home-container'>
        <Card >
          <Link
            to={"/walks"} 
          > 
            <Card.Body className='card-body'>
              <div className='description'>
                <Card.Title>Sortir un chien</Card.Title>
                <Card.Text>
                <p>Accompagner les chiens en balade c’est contribuer à leur bien-être mais aussi à leur sociabilisation.
                  Faites de l’éducation positive pendant les sorties, jouez avec eux et donnez leur plein d’amour.
                </p>
                </Card.Text>  
              </div>
              <div className='container-image'>
                <img className="image" src={womenWalkingDog} alt="illustration, vielle dame promenant un chien"/>
              </div>
            </Card.Body>
          </Link>
        </Card>

        <Card >
          <Link
            to={"/visits"}
          >
            <Card.Body className='card-body'>
              <div className='description'>
                <Card.Title>Visiter la chatterie</Card.Title>
                <Card.Text>
                  <p>Rendre visite aux chats permettra aux plus craintifs de se sociabiliser et de trouver un nouveau foyer plus rapidement.
                    N’hésitez pas à les caresser, les brosser et leur faire des gros calins.
                  </p>
                </Card.Text>
              </div>
              <div className='container-image'>
                <img className="image cat" src={cat} alt="illustration, chatons" />
              </div>
            </Card.Body>
          </Link>
        </Card>

      </div>
    </>  
  );
}

export default React.memo(Home);
