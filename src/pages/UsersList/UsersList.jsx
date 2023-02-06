import React, { useState } from 'react';
import { useQuery } from 'react-query';

// composants bootstrap
import { Card, Col, Row, Container, Badge, Image } from 'react-bootstrap';

// composants
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// fonctions
import usersRequest from '../../requests/users.requests';

// styles
import './UsersList.scss';
import userDefaultPicture from '../../assets/images/user-default.jpeg';

function UsersList() {
	const [users, setAllUsers] = useState([]);
	// requête pour récupérer tous les utilisateurs à l'affichage de la page
	const { isLoading } = useQuery('usersList', {
		queryFn: () => usersRequest.getAllUsers(),
		onSuccess: (data) => {
			console.log(data.data);
			const filteredUsers = data.data.sort((user1, user2) => {
				if (user1.name < user2.name) {
					return -1;
				}

				if (user1.name < user2.name) {
					return 1;
				}

				return 0;
			});
			setAllUsers(filteredUsers);
		},
	});

	// on affiche chaque utilisateur dans une carte
	const renderUser = (user) => {
		return (
			<Col>
				<Card key={user.id} className='user-profile'>
					<Image
						className={`user-profile-img ${
							user.url_image && 'user-profile-has-picture'
						}`}
						variant='top'
						src={user.url_image || userDefaultPicture}
					/>
					<Card.Body>
						<Card.Title className='user-profile-name'>
							{user.firstname} {user.name}
						</Card.Title>
						<Card.Text className='user-profile-role'>
							{user.admin ? (
								<Badge pill bg='secondary'>
									Employé
								</Badge>
							) : (
								<Badge pill bg='dark'>
									Bénévole
								</Badge>
							)}
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		);
	};
	// on affiche l'ensemble des utilisateurs dans un container
	return (
		<Container >
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
