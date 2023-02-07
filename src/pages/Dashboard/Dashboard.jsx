import React from "react";

//Components
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";

// Functions
import { useSelector } from "react-redux";

// images
import Volunteer from "../../assets/images/volunteer-with-dog.png";
import DogAndCat from "../../assets/images/dog-and-cat.png";
import DogHugsCat from "../../assets/images/dog-hugs-cat.png";
import PersonAtDesk from "../../assets/images/personatdesk.png";

// CSS
import "./Dashboard.scss";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

function Dashboard() {
  // récupération prénom de l'admin
  const firstName = useSelector(
    (fullstate) => fullstate.loginSettings.firstName
  );

  return (
    <>
      <h1 className='title-page'>Bonjour {firstName} </h1>
      <div className='dashboard-container'>
        <Row>
			
          <CardGroup>
            <Col xs={12} md={6} lg={3}>
              <Card className="dashboard-card" >
                <Card.Img variant='top' src={DogAndCat} />
                <Card.Body>
                  <Button href='/animals' variant='primary' type='submit'>
								Voir tous les animaux
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
						<Card className="dashboard-card" >
                <Card.Img variant='top' src={Volunteer} />
                <Card.Body>
                  <Button href='admin/create/user' variant='primary' type='submit'>
								Créer un bénévole
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
						<Card className="dashboard-card" >
                <Card.Img variant='top' src={DogHugsCat} />
                <Card.Body>
                  <Button href='admin/create/card' variant='primary' type='submit'>
								Créer un animal
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
						<Card className="dashboard-card" >
                <Card.Img variant='top' src={PersonAtDesk} />
                <Card.Body>
                  <Button href='admin/users' variant='primary' type='submit'>
								Liste utilisateurs
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </CardGroup>
        </Row>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
