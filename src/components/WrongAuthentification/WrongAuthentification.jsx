import React from 'react';

function WrongAuthentification() {
  return (
    <div className="alert alert-danger" role="alert">
        Identifiants incorrects
    </div>
  );
}

export default React.memo(WrongAuthentification);
