import React from 'react';

function LoadingSpinner() {
  return (
    <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default React.memo(LoadingSpinner);
