import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col} from "react-bootstrap";

import api from "../../api";
import {useNavigate} from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./DashboardAnimalCreation.scss";

// Schéma pour la géstion des champs obligatoires dans le formulaire d'envoi d'une fiche animal

const schema = yup.object().shape({
  species: yup
    .string()
    .required("Veuillez choisir une espéce"),
  
  name: yup
    .string()
    .required("Veuillez renseigner un nom"),

  url_image: yup
    .string()
    .required("Veuillez renseigner une image de profil"),

  bio: yup
    .string(),

  gender: yup
    .string()
    .required("Veuillez renseigner son sexe"),  

  size: yup
    .string()
    .required("Veuillez choisir une taille"),  
  
  volunteer_experience: yup
    .string()
    .required(),

  box_id: yup
    .number()
    .required("Veuillez renseigner le numéro de la cage"),

  age: yup
    .date()
    .required("Veuillez renseigner la data de naissance."),
});

function DashboardAnimalCreation() {

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema)
  });
  console.log(errors);

  const [
    resStatus, 
    setResStatus
  ] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    console.log(data);

    api
      .post("/animals", data)
      .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
          setResStatus("Animal créé avec succées");

          navigate("/admin");
          console.log(resStatus);
        } else {
          setResStatus("error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
  };

  //TODO Ouvrir une modale avec une message de validation du formulaire de création d'un bénévole

  return (
    <>
      <h1 className="title-page">Création fiche animal</h1>
      <div className="dashboard-container">
        <Form
          className="dashboard-container-form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/* ==================colonne 1================== */}
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>Espèce</Form.Label>
                <Form.Select
                  aria-label=""
                  name="species"
                  {...register("species")}
                >
                  <option>Séléctionner</option>
                  <option value="Dog">Chien</option>
                  <option value="Cat">Chat</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name")}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">
                  {errors.name?.message}
                </div>
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Label>Tempéramment</Form.Label>
                <Form.Select aria-label="" name="tags" {...register("tags")}>
                  <option>Séléctionner</option>
                  <option value="1">Joueur</option>
                  <option value="4">Doux</option>
                  <option value="2">Sociable</option>
                  <option value="5">Calin</option>
                  <option value="3">Energique</option>
                  <option value="6">Calme</option>
                  <option value="7">Associable</option>
                  <option value="8">Fugueur</option>
                </Form.Select>
              </Form.Group> */}

              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Âge</Form.Label>
                    <Form.Control
                      type="date"
                      {...register("age")}
                      className={`form-control ${
                        errors.age ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.age?.message}
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Taille</Form.Label>
                    <Form.Select
                      aria-label=""
                      name="size"
                      {...register("size")}
                    >
                      <option>Séléctionner</option>
                      <option value="SMALL">Petit</option>
                      <option value="MEDIUM">Moyen</option>
                      <option value="BIG">Grand</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sexe</Form.Label>
                    <Form.Select
                      aria-label=""
                      name="gender"
                      {...register("gender")}
                    >
                      <option>Séléctionner</option>
                      <option value="FEMALE">Femelle</option>
                      <option value="MALE">Mâle</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>N° de la Cage</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("box_id")}
                      className={`form-control ${
                        errors.box_id ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.box_id?.message}
                    </div>
                  </Form.Group>
                </Col>

                <Form.Group className="mb-3">
                  <Form.Label>Niveau d'expérience du bénévole</Form.Label>
                  <Form.Select
                    aria-label=""
                    name="level"
                    {...register("volunteer_experience")}
                  >
                    <option>Séléctionner</option>
                    <option value="BEGINNER">Débutant</option>
                    <option value="MEDIUM">Moyen</option>
                    <option value="EXPERT">Expérimenté</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Col>

            {/* ==================colonne 2================== */}

            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image profil</Form.Label>
                <Form.Control
                  type="text"
                  {...register("url_image")}
                  className={`form-control ${errors.url_image ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.url_image?.message}</div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Biographie</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("bio")}
                  className={`form-control ${errors.bio ? "is-invalid" : ""}`}
                />
                 
                <div className="invalid-feedback">{errors.bio?.message}</div>
              </Form.Group>
            </Col>
            {/* =================================================== */}
          </Row>
          <Button variant="primary" type="submit">
              Créer Animal
          </Button>
        </Form>
      </div>
    </>
  );
}

export default React.memo(DashboardAnimalCreation);
