import React from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// functions
import { useSelector } from "react-redux";

import "./styles.scss";

function DashboardVolunteerCreation() {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
          <Form.Group className="mb-3" controlId="volunteerFirstname">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              {...register("First name", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="volunteerLastName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              {...register("Last name", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="volunteerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="VolunteerTel">
            <Form.Label>Numéro de telephone</Form.Label>
            <Form.Control
              type="tel"
              {...register("Mobile number", {required: true, minLength: 8, maxLength: 12})}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="volunteerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...register("Password", {required: true, minLength: 8})} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="volunteerLevel">
            <Form.Label>Niveau d'expérience du bénévole</Form.Label>
            <Form.Select aria-label="Default select example" name="level" {...register("level", { required: true })}>
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
