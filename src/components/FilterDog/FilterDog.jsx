import React, { useState} from 'react';
import { ToggleButtonGroup } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './styles.scss';

function FilterDog() {

    const [gabaritValue, setGabaritValue] = useState('big');
    const [sexValue, setSexValue] = useState('male');
    const [valueAge, setvalueAge] = useState(5);
    const [tags, setTags] = useState([]);
    
    const handleOnChangeGabarit = (e) => {
        console.log(e.target.value);
        setGabaritValue(e.target.value);
    };

    const handleOnChangeSex = (e) => {
        console.log(e.target.value);
        setSexValue(e.target.value);
    };

    const handleOnAddTag = (e) => {
        console.log(e.target.value);
        console.log(tags);
        setTags((oldState) => [...oldState, e.target.value]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(gabaritValue, sexValue, valueAge, tags);
    };


    
    return (

        <div
        className="modal show"
        style={{ display: 'block', position: 'fixed' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title>Filtres</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleOnSubmit}>
                    <Modal.Body>

                        <div className='container-filter'>

                            <div className='filter-part'>
                                <h3 className='category'>Gabarit</h3>
                                <ToggleButtonGroup type="radio" name="size" defaultValue={gabaritValue}>
                                    <ToggleButton
                                        id="tbg-radio-1" 
                                        value="big" 
                                        onChange={handleOnChangeGabarit}
                                        >   
                                        GROS
                                    </ToggleButton>
                                    <ToggleButton 
                                        id="tbg-radio-2" 
                                        value="medium"
                                        onChange={handleOnChangeGabarit}
                                        >
                                        MOYEN
                                    </ToggleButton>
                                    <ToggleButton
                                        id="tbg-radio-3"
                                        value="small"
                                        onChange={handleOnChangeGabarit}
                                    >
                                        PETIT
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            <div className='filter-part'>
                                <h3 className='category'>Sexe</h3>
                                <ToggleButtonGroup type="radio" name="gender" defaultValue={sexValue}>
                                    <ToggleButton
                                        id="tbg-radio-4"
                                        value="male" 
                                        onChange={handleOnChangeSex}
                                        >   
                                        MALE
                                    </ToggleButton>
                                    <ToggleButton
                                        id="tbg-radio-5"
                                        value="female"
                                        onChange={handleOnChangeSex}
                                    >
                                        FEMELLE
                                    </ToggleButton>
                                </ToggleButtonGroup>
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
                                <Form.Select aria-label="Default select example" onChange={handleOnAddTag}>
                                    <option>Séléctionner</option>
                                    <option value="1" >Joueur</option>
                                    <option value="4" >Doux</option>
                                    <option value="2" >Sociable</option>
                                    <option value="5" >Calin</option>
                                    <option value="3" >Energique</option>
                                    <option value="6" >Calme</option>
                                    <option value="7" >Associable</option>
                                    <option value="8" >Fugueur</option>
                                </Form.Select>
                            </div>

                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">Annuler</Button>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Valider
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal.Dialog>
        </div>
    );
}

export default React.memo(FilterDog);
