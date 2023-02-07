import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import boxesRequest from "../../requests/boxes.request";

import AnimalCard from "../../components/AnimalCard/AnimalCard";
import VisitStartButton from "../../components/VisitStartButton/VisitStartButton";

import '../../styles/_vars.scss';
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

/**
 * FONCTIONS
 */
const errorHandlerBox = (error) => {
	if (error && error.response?.data?.message) {
		switch (error.response.data.message) {
			case "NOT_FOUND":
				return "Ce box n'existe pas";
			case "BAD_INPUT":
				return "Erreur de requête, mauvais paramètre. Merci de retenter plus tard";
			default:
				return "Erreur du serveur, merci de retenter plus tard";
		}
	} else {
		return "Erreur du serveur, merci de retenter plus tard";
	}
};

/**
 * COMPOSANTS
 */
const RenderAnimalsList = ({ animals }) => {
	if (animals && animals.length > 0) {
		return animals.map((animal) => {
			return <AnimalCard animal={animal} key={animal.id} showSpecie />;
		});
	} else {
		return "Ce box est vide";
	}
};
RenderAnimalsList.propTypes = {
	animals: PropTypes.array,
};

const Box = () => {
	const { boxId } = useParams();
	const [box, setBox] = useState();
	const { isLoading, error } = useQuery("getBox", {
		queryFn: async () =>
			boxesRequest.getOne(boxId, {
				includeVisits: true,
				includeAnimals: true,
			}),
		onSuccess: (data) => {
			setBox(data.data);
		},
	});

	if (!isLoading) {
		if (box) {
			return (
				<>
					<Container>
					<Row>
					<Col className="text-center">
	<h3 className='title-page'>Box N° : {''}{box.number}</h3>
					<VisitStartButton box={box} />
					</Col>
					</Row>
					</Container>
					<div className="main-container">
					<div className="cards-container" >
						

							<RenderAnimalsList animals={box.animals} />
</div>
					</div>
				</>
			);
		} else {
			return (
				<div>
					<p>Erreur lors du chargement du box.... </p>
					{errorHandlerBox(error)}
				</div>
			);
		}
	} else {
		/**
		 * @todo better loading screen
		 */
		return <p>Loading...</p>;
	}
};

export default Box;
