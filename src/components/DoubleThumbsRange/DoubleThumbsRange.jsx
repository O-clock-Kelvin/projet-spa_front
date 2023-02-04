import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRanger } from '@tanstack/react-ranger';

import './DoubleThumbsRange';

function DoubleThumbsRange({ onUpdate }) {

    const rangerRef = useRef(null);
    const [values, setValues] = useState([
        0, 20,
    ]);

    const rangerInstance = useRanger({
        getRangerElement: () => rangerRef.current,
        values,
        min: 0,
        max: 15,
        stepSize: 1,
        onChange: (instance) => {
            setValues(instance.sortedValues),
            onUpdate(instance.sortedValues);
        }
    });

    return (
        <>
            <div
                ref={rangerRef}
                style={{
                    position: 'relative',
                    userSelect: 'none',
                    height: '8px',
                    background: '#eb651c',
                    borderRadius: '5px',
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
                                    width: '16px',
                                    height: '16px',
                                    outline: 'none',
                                    borderRadius: '100%',
                                    background: '#35450a',
                                    border: 'solid 1px #35450a',
                                }}
                            />
                        ),
                    )}
            </div>
            <div 
                style={{ 
                    fontSize: '1.1rem',
                    marginTop: '5px',
                    }}>
                De {values[0]} à {values[1]} ans
            </div>
        </>
    );
}

DoubleThumbsRange.propTypes = {
    onUpdate: PropTypes.func.isRequired
};

export default React.memo(DoubleThumbsRange);