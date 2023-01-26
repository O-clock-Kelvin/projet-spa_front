import React, { useState} from 'react';
import { ToggleButtonGroup } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';

import './styles.scss';

function FilterDog() {

    // const [checked, setChecked] = useState(false);
    // const [radioValueGabarit, setRadioValueGabarit] = useState('0');
    const radioValueGabarit = '0';
    const [radioValueSex, setRadioValueSex] = useState('2');
    const [valueAge, setvalueAge] = useState(5);

    const gabarit = [
        { name: 'big', description: 'GROS', value: '1' },
        { name: 'medium', description: 'MOYEN',  value: '1' },
        { name: 'small', description: 'PETIT', value: '2' }
    ];

    const sex = [
        { name: 'male', description: 'MALE', value: '1'},
        { name: 'female', description: 'FEMALE', value: '2'}
    ];

    const handleOnClik = (e) => {
        console.log(e.target);
        console.log(e.currentTarget.text);
    };

    const [value, setValue] = useState([]);
    const handleChange = (val) => {
        console.log(val);
        setValue(val);
    };

  return (
    <div className='container-filter'>

        <div className='filter-part'>
        <h3 className='category'>Gabarit</h3>
            <ButtonGroup>
                {gabarit.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    // variant={radioValueGabarit === '0' ? 'not-selectionned' : 'selectionned'}
                    name="checkbox"
                    value="0"
                    checked={radioValueGabarit === radio.value}
                    onClick={handleOnClik}
                >
                    {radio.description}
                </ToggleButton>
            ))}
            </ButtonGroup>
            
            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                <ToggleButton id="tbg-btn-1" value='big'>
                    GROS
                </ToggleButton>
                <ToggleButton id="tbg-btn-2" value='medium'>
                    MOYEN
                </ToggleButton>
                <ToggleButton id="tbg-btn-3" value='small'>
                    PETIT
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
        
        <div className='filter-part'>
            <h3 className='category'>Sexe</h3>
            <ButtonGroup>
                {sex.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    // variant={idx % 2 ? 'selectionned' : 'not-selectionned'}
                    name="radio"
                    value={radio.value}
                    checked={radioValueSex === radio.value}
                    onChange={(event) => setRadioValueSex(event.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
            </ButtonGroup>
        </div>

        <div className='filter-part'>
            <h3 className='category'>Age</h3>
            <Form.Range
                min="0" max="15" step="1" value={valueAge} onChange={(e) => setvalueAge(e.target.value)}
             />
             <p>{valueAge} ans</p>
        </div>

        <div className='filter-part'>
            <h3 className='category'>Tempéramment</h3>
            <Form.Select aria-label="Default select example">
                <option>Séléctionner</option>
                <option value="1">Joueur</option>
                <option value="2">Dynamique</option>
                <option value="3">Rapide</option>
                <option value="3">Calme</option>
                <option value="3">Câlin</option>
            </Form.Select>
        </div>

    </div>
  );
}

export default React.memo(FilterDog);
