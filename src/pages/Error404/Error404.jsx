import React from 'react';

import {  Row,  Container, Col } from "react-bootstrap";

//Images
import fourofour from '../../assets/images/fourofour.gif';

import './Error404.scss';

function Error404() {
  return (
    <Container className='error-container'>
      <Row>
        <Col xs={12} >
          <div className='error-text' >
            <h1 className='error-text-title' >Erreur 404</h1>
          </div>
          
          <img
            className='error-container-img'
            src={fourofour}
            alt='Bénévole balade un chien'
          />
          <div className='error-text' >
            <h3 className='error-text-subtitle'>Oops !!! Page Introuvable!</h3>
            <p className='error-text-description'>Avec un peut de chance vous venez de chercher un animal qui a trouvé un nouveau foyer</p>
          </div>
        </Col>
      </Row>
      

    </Container>
    
  );
}

Error404.propTypes = {};

export default React.memo(Error404);
