import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { actionLoginFetch } from '../../actions/loginActions';


function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword=(event) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit= (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      return;
    }
    dispatch(
        actionLoginFetch(email.trim(), password),
    );
  };

  return (
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
  );
}

LoginForm.propTypes = {};

export default React.memo(LoginForm);
