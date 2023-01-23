import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import WrongAuthentification from '../WrongAuthentification/WrongAuthentification';

import { useDispatch, useSelector } from 'react-redux';
import { actionLoginFetch } from '../../actions/loginActions';

function LoginForm() {

  // utilisation du state pour variables utiles dans le composant 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // utilisation de la fonction dispatch de redux pour lancer une action
  const dispatch = useDispatch();

  const isLoading = useSelector((fullstate) => fullstate.loginSettings.isLoading);
  const noAutorisation = useSelector((fullstate) => fullstate.loginSettings.noAutorisation);

  // on modifie et enregistre la valeur de l'email dans le state
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword=(event) => {
    setPassword(event.target.value);
  };

  // au submit on envoie l'email et le password à actionLoginFetch
  const handleOnSubmit= (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      return;
    }
    dispatch(
        actionLoginFetch({email: email.trim(), password}),
    );
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Form
            onSubmit={handleOnSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                value={email}
                onChange={handleOnChangeEmail} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={handleOnChangePassword}    
                />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}
      {noAutorisation && (<WrongAuthentification />)}
    </> 
  );
}

LoginForm.propTypes = {};

export default React.memo(LoginForm);
