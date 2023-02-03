import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

// composants bootstrap
import { Card, Col, Row, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

// composants
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

// fonctions
import usersRequest from "../../requests/users.requests";

// styles
import "./UsersList.scss";


function UsersList() {

  const [users, setAllUsers] = useState([]);
  // requête pour récupérer tous les utilisateurs à l'affichage de la page
  const { isLoading, error, data, isFetching } = useQuery("repoData", {
    queryFn: () => usersRequest.getAllUsers(),
    onSuccess:(data) => {
      console.log("DATA", data),
      setAllUsers(data.data);
    }
  }
  );

  useEffect(() => {
  
  }, [isLoading, error, data, isFetching]);

  // on affiche chaque utilisateur dans une carte
  const renderUser = (user) => {
    return (
      <Col>
        <Card key={user.id} className="user-profile">
          <Link
            to={`/user/${user.id}`}
          >
            <Card.Img className="user-profile-img" variant="top" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" />
            <Card.Body>
              <Card.Title className="user-profile-name" >{user.firstname} {user.name}</Card.Title>
              <Card.Text className="user-profile-role">{user.admin ? 
                <Badge pill bg="secondary">Employé</Badge> 
                : 
                <Badge pill bg="dark">Bénévole</Badge> 
              }
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <h1 className='title-page'>Liste des Utilisateurs </h1>
      <Row xs={1} md={4}>
        
        {!isLoading && users ? (
          users.map((user) => renderUser(user))
        ) : (
          <LoadingSpinner />
        )}
      </Row>
    </Container>
  );
}

export default React.memo(UsersList);