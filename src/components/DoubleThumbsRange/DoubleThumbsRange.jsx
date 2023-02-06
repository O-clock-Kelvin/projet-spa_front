import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useRanger } from '@tanstack/react-ranger';

import './DoubleThumbsRange';

function DoubleThumbsRange({ values, setValues }) {

    const rangerRef = useRef(null);
    
    const rangerInstance = useRanger({
        getRangerElement: () => rangerRef.current,
        values,
        min: 0,
        max: 20,
        stepSize: 1,
        onChange: (instance) => {
            console.log("instance");
            console.log(instance);
            setValues(instance.sortedValues);
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
    values: PropTypes.array,
    setValues: PropTypes.func
};

export default React.memo(DoubleThumbsRange);