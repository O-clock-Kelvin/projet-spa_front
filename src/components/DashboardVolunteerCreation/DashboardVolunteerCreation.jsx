import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../api';
import {useNavigate} from 'react-router-dom';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// functions
import { useSelector } from "react-redux";

import "./styles.scss";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("Veuillez renseigner un prénom")
    .min(2)
    .max(24),
  
  name: yup
    .string()
    .required("Veuillez renseigner un nom")
    .min(2)
    .max(24),

  email: yup
    .string()
    .email()
    .required("Veuillez renseigner un email valide"),
  
  phone_number: yup
    .string()
    .matches(/(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/m, "Veuillez renseigner un numero de telephone valide")
    .required("Veuillez renseigner un numero de telephone valide"),
  
  password: yup
    .string()
    .min(
      6,
      "Les mots de passe doivent comporter au moins 6 caractères"
    )
    .max(24)
    .required("Veuillez renseigner un mot de passe"),
  
  experience: yup
    .string()
    .required(),
});

function DashboardVolunteerCreation() {
  const firstName = useSelector(
    (fullstate) => fullstate.loginSettings.firstName
  );

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
    .post("/users", data)
    .then(function (response) {
      console.log(response.status);
      if (response.status === 200) {
        setResStatus("Compte crée avec succès");
        console.log(resStatus);
      } else {
        setResStatus("error");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    navigate("/admin");
};

//TODO Ouvrir une modale avec une message de validation du formulaire de création d'un bénévole

  return (
    <>
      <h1 className="title-page">Bonjour {firstName} </h1>
      <div className="dashboard-container">
        <Form className="dashboard-container-form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              {...register("firstname")}
              className={`form-control ${
                errors.firstName ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.firstName?.message}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              {...register("name")}
              className={`form-control ${
                errors.name ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.name?.message}
            </div>   
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              {...register("email")}
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.email?.message}
            </div>   
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Numéro de telephone</Form.Label>
            <Form.Control
              type="text"
              {...register("phone_number")}
              className={`form-control ${
                errors.phone_number ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.phone_number?.message}
            </div>   
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control 
              type="password" 
              {...register("password")} 
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.password?.message}
            </div>   
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Niveau d'expérience du bénévole</Form.Label>
            <Form.Select 
              aria-label="" 
              name="level" 
              {...register("experience")}>
                <option value="beginner">Débutant</option>
                <option value="medium">Moyen</option>
                <option value="expert">Expérimenté</option>
          </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">Créer Bénévole</Button>
        </Form>

      </div>
    </>
  );
}

export default React.memo(DashboardVolunteerCreation);
