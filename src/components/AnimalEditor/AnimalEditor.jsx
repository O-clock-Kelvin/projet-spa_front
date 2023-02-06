import {  useState } from "react";

import animalsRequest from "../../requests/animals.request";

import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import dataTags from "../../data/tags";

import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import { Form, Button, Row, Badge, CloseButton, Col } from "react-bootstrap";

const schema = yup.object().shape({
  species: yup.string(),
  name: yup.string(),
  url_image: yup.string(),
  bio: yup.string(),
  gender: yup.string(),
  size: yup.string(),
  volunteer_experience : yup.string(),
  box_id: yup.number(),
  age: yup.date(),
});

const AnimalEditor = ({ animal, closeEditor, setAnimal}) => {
  console.log("ANIMAL", animal);
  const assignedTagsList = animal.tags.map((tag) => tag.tag_id);
  console.log(assignedTagsList);

  const { isLoading, mutate, error } = useMutation({
    mutationFn: async ({ id, newAnimalData}) =>
      animalsRequest.update(id, newAnimalData),
    onSuccess: (data) => {
      setAnimal(data.data);
      closeEditor();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      species: animal.species,
      name: animal.name,
      url_image: animal.url_image,
      bio: animal.bio,
      gender: animal.gender,
      size: animal.size,
      volunteer_experience: animal.volunteer_experience, 
      box_id: animal.box_id,
      age: animal.age,
      tags: animal.tags,
    },
    resolver: yupResolver(schema),
  });

  // Gestion de tags 

  console.log("TEST",animal.tags.map((existingTag) => dataTags.filter((tag) => tag.id != existingTag.tag_id)));
  // console.log("TEST2", animal.tags.filter(tag) => dataTags.includes(tag.tag_id)));

  const [tags, setTags] = useState(assignedTagsList);
  const [tagsList, setTagsList] = useState(dataTags.filter((tag) => !assignedTagsList.includes(tag.id)));

  
  const renderError = (error) => {
    if (error.response) {
      switch (error.response.data.message) {
      case "BAD_INPUT":
        return "Données non valides, vérifiez votre formulaire";
      case "INTERNAL_ERROR":
        return "Erreur interne. Merci de retenter plus tard";
      default:
        return "Erreur interne. Merci de retenter plus tard";
      }
    }
  };



  const handleOnAddTag = (e) => {
    console.log(e.target.value);
    console.log(tagsList);
    setTagsList((oldState) =>
      oldState.filter((tag) => tag.id !== Number(e.target.value))
    );
    setTags((oldState) => [...oldState, Number(e.target.value)]);
  };

  const cancelTag = (tagToCancel) => {
    console.log(tagToCancel);

    setTags((oldState) => oldState.filter((tag) => tag !== tagToCancel));
    const oldTag = dataTags.filter((tag) => tag.id == tagToCancel);
    console.log(oldTag);
    setTagsList((oldState) => [...oldState, oldTag[0]]);
  };



  const renderTag = (tag) => {
   
    const tagId = Number(tag);
    const tagFound = dataTags.find((tag) => tag.id === tagId);

    console.log("TAGGGG", tag);
    return (
      <div className='container-badge'>
        <Badge className='position-relative' key={tagFound.name}>{tagFound.name}
          <CloseButton className='position-absolute top-0 start-100 translate-middle' onClick={() => cancelTag(tag)} />
        </Badge>
      </div>
    );
    
  };

  // end gestion tags

  return (
    <>
      {error ? <p>{renderError(error)}</p> : null}
      <Form
        className="dashboard-container-form"
        onSubmit={handleSubmit((data) =>
          mutate({ id: animal.id, newAnimalData: data})
        )}
      >
        {/* ==================colonne 1================== */}
        <Row>
          <Col md={6} xs={12} >
            <Form.Group className="mb-3">
              <Form.Label>Espèce</Form.Label>
              <Form.Select
                aria-label=""
                name="species"
                {...register("species")}
              >
                <option>Séléctionner</option>
                <option value="DOG">Chien</option>
                <option value="CAT">Chat</option>
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

            <Form.Group className="mb-3">
              <Form.Label>Tempéramment</Form.Label>
              <Form.Select
                aria-label='Default select example'
                {...register("tags")}
                onChange={handleOnAddTag}
                  
              >
                <option>Sélectionner</option>
                {tagsList.map((tag) => (
                  <option key={tag.id} value={`${tag.id}`}>
                    {tag.name}
                  </option>
                ))}
              </Form.Select>
              <div className='tags-container'>
                {tags && tags.map((tag) => renderTag(tag))}
              </div>
            </Form.Group>

            <Row>
              <Col md={6} xs={12} >
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

          <Col md={6} xs={12} >
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
        {!isLoading ? (
          <>
            <Button 
              onClick={""} 
              variant="primary"
            >
              Valider
            </Button>
            <Button 
              onClick={() => closeEditor()} 
              variant="secondary"
              role="button"
              tabIndex="0"
            >
              Annuler
            </Button>
          </>
        ) : (
          "Loading"
        )}
      </Form>
      
    </>
  );
};
AnimalEditor.propTypes = {
  animal: PropTypes.object,
  closeEditor: PropTypes.func,
  setAnimal: PropTypes.func,
};

export default AnimalEditor;