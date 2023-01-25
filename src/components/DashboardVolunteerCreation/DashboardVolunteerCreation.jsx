import React from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// functions
import { useSelector } from "react-redux";

import "./styles.scss";

function DashboardVolunteerCreation() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("RESULT", data);
    alert(JSON.stringify(data));
  };
  console.log(errors);

  const firstName = useSelector(
    (fullstate) => fullstate.loginSettings.firstName
  );

  return (
    <>
      <h1 className="title-page">Bonjour {firstName} </h1>
      <div className="dashboard-container">
        <Form className="dashboard-container-form" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="firstname">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              {...register("First name", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              {...register("Last name", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tel">
            <Form.Label>Numéro de telephone</Form.Label>
            <Form.Control
              type="tel"
              {...register("Mobile number", {required: true, minLength: 12, maxLength: 12})}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Niveau d'expérience du bénévole</Form.Label>
            <Form.Select aria-label="Default select example" name="level" {...register("level", { required: true })}>
                <option value="beginner">Débutant</option>
                <option value="medium">Moyen</option>
                <option value="expert">Expérimenté</option>
          </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">Créer Bénévole</Button>
        </Form>
{/* 
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Prénom</label>
          <input type="text" {...register("First name", { required: true })} />

          <label>Nom</label>
          <input
            type="text"
            {...register("Last name", { required: true, maxLength: 100 })}
          />
          <label>Email</label>
          <input
            type="text"
            {...register("Email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <label>Numéro de telephone</label>
          <input
            type="tel"
            {...register("phone", {
              required: true,
              maxLength: 11,
              minLength: 8,
            })}
          />
          <label>Niveaux d'expérience</label>
          <select
            className="form-select"
            name="level"
            {...register("level", { required: true })}
          >
            <option value="beginner">Débutant</option>
            <option value="medium">Moyen</option>
            <option value="expert">Expérimenté</option>
          </select>
          <label>Mot de passe</label>
          <input
            type="password"
            {...register("Password", { required: true, maxLength: 8 })}
          />

          <input type="submit" />
        </form> */}
      </div>
    </>
  );
}

export default React.memo(DashboardVolunteerCreation);
