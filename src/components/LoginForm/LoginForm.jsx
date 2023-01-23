import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

// import { useDispatch } from 'react-redux';
// import { actionLoginFetch } from '../../actions/loginActions';


//SCSS
import "./LoginForm.scss";

//Images
import manWalkingDog from '../../assets/images/clipart1525964.png';

//Icons from IcoMoon
import { ImUser, ImLock } from "react-icons/im";


function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword=(event) => {
    setPassword(event.target.value);
  };

//   const handleOnSubmit= (event) => {
//     event.preventDefault();
//     if (!email.trim() || !password.trim()) {
//       return;
//     }
//     dispatch(
//         actionLoginFetch(email.trim(), password),
//     );
//   };

  return (
    <div className="login">
      <h2 className="login-title">App de gestion des actions de bénévolats</h2>
      <Container className="login-container">
        <div className="login-container-elements">
          <img
            className="login-container-img"
            src={manWalkingDog}
            alt="Bénévole balade un chien"
          />

        <h2 className="login-title-mobile">App de gestion des actions de bénévolats</h2>
          <Form className="login-form"
          // onSubmit={handleOnSubmit}
          >
          <div className="login-form-elements">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
                  <InputGroup.Text>
                    <ImUser />
                  </InputGroup.Text>
              
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleOnChangeEmail}
              />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <InputGroup>

            <InputGroup.Text>
                    <ImLock />
                  </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleOnChangePassword}
              />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
              Se Connecter
            </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

LoginForm.propTypes = {};

export default React.memo(LoginForm);
