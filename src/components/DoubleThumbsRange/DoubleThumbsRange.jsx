import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// import './DoubleThumbsRange.scss';

// function DoubleThumbsRange() {
//   return (
//     <div className="range-slider">
//         <input type="range" step="1" min="0" max="10" value="5" id="slider1" />
//         <input type="range" step="1" min="0" max="10" value="3" id="slider2" />
//     </div>
//   );
// }

// export default React.memo(DoubleThumbsRange);

// import { TwoThumbInputRange } from "react-two-thumb-input-range";

// function DoubleThumbsRange() {
//     const [value, setValue] = useState([0, 15]);
  
//     const onValueChange = (values) => {
//       setValue(values);
//     };
  
//     return <TwoThumbInputRange onChange={onValueChange} values={value} min={0} max={15} />;
// }


import { useRanger} from '@tanstack/react-ranger';

function DoubleThumbsRange({onUpdate}) {
  const rangerRef = useRef(null);
  const [values, setValues] = useState([
    0, 15,
  ]);

  const rangerInstance = useRanger({
    getRangerElement: () => rangerRef.current,
    values,
    min: 0,
    max: 15,
    stepSize: 1,
    onChange: (instance) =>{
      setValues(instance.sortedValues),
      onUpdate(instance.sortedValues);
  }});

  return (
    <>
 
   
    
    
 
      <div
        ref={rangerRef}
        style={{
          position: 'relative',
          userSelect: 'none',
          height: '4px',
          background: '#ddd',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,.6)',
          borderRadius: '2px',
        }}
      >
        {rangerInstance
          .handles()
          .map(
            (
              {
                value,
                onKeyDownHandler,
                onMouseDownHandler,
                onTouchStart,
                isActive,
              },
              i,
            ) => (
              <button
                key={i}
                onKeyDown={onKeyDownHandler}
                onMouseDown={onMouseDownHandler}
                onTouchStart={onTouchStart}
                role="slider"
                aria-valuemin={rangerInstance.options.min}
                aria-valuemax={rangerInstance.options.max}
                aria-valuenow={value}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${rangerInstance.getPercentageForValue(value)}%`,
                  zIndex: isActive ? '1' : '0',
                  transform: 'translate(-50%, -50%)',
                  width: '14px',
                  height: '14px',
                  outline: 'none',
                  borderRadius: '100%',
                  background: 'linear-gradient(to bottom, #eee 45%, #ddd 55%)',
                  border: 'solid 1px #888',
                }}
              />
            ),
          )}
      </div>
      <div>
        AGE: entre {values[0]} et {values[1]} ans;
      </div>

  
    
    </>
  );
}

DoubleThumbsRange.propTypes = {
  onUpdate: PropTypes.func.isRequired
};


export default React.memo(DoubleThumbsRange);