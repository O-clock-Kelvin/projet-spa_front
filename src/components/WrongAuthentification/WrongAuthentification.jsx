import React from 'react';
import Alert from 'react-bootstrap/Alert';

import './styles.scss';

function WrongAuthentification() {
  return (
    <Alert variant= 'danger'>
      Identifiants incorrects
    </Alert>  
  );
}

export default React.memo(WrongAuthentification);
