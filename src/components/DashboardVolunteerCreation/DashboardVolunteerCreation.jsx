import React from 'react';

// composants

// fonctions
import { useSelector } from 'react-redux';

import './DashboardVolunteerCreation.scss';


function DashboardVolunteerCreation() {

  const firstName = useSelector((fullstate) => fullstate.loginSettings.firstName);

  return (
    <>
      <h1 className='title-page'>Bonjour {firstName} </h1>
      <div className='container'>
        
      </div>
    </>
    
  );
}

export default React.memo(DashboardVolunteerCreation);
