import React, { useState } from 'react';

// importation composant bootstrap
import Card from 'react-bootstrap/Card';
import FilterDog from '../FilterDog/FilterDog';

// style
import './styles.scss';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { ImEqualizer } from 'react-icons/im';

// images
import Diego from '../../assets/images/Diego.jpeg';

// fonctions
import { getDogs } from '../../requetes/getDogs';


function WalkingDog() {

    const dogs = getDogs();
    console.log(dogs);

    const [filter, setFilter] = useState(false);

    const handleOnClick = () => {
        console.log("click");
        setFilter(true);
    };

  return (
    <>
        <h1 className='title-page'>Sortir un chien</h1>
        <div><ImEqualizer
            className='filter' 
            size={30}
            onClick={handleOnClick}
        /></div>
        {filter && <FilterDog />}
        <div className='cards-container'>
            <Card>
                <Card.Img variant="top" className="card-dog" src={Diego} />
                <Card.Body>
                    <Card.Title>Milou</Card.Title>
                    <Card.Text>
                        <span className="age">2 ans</span>
                        <span><BiFemaleSign className="gender" size={30}/></span>
                    </Card.Text>
                    <Card.Text className="last-walking red">
                        Dernière sortie : 2 jours 15 heures
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Img variant="top"  className="card-dog" src={Diego} />
                <Card.Body>
                    <Card.Title>Milou</Card.Title>
                    <Card.Text>
                        <span className="age">2 ans</span>
                        <span className="gender"><BiMaleSign className="gender" size={30}/></span>
                    </Card.Text>
                    <Card.Text className="last-walking green">
                        Dernière sortie : 0 jours 15 heures
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Img variant="top"  className="card-dog" src={Diego} />
                <Card.Body>
                    <Card.Title>Nina</Card.Title>
                    <Card.Text>
                        <span className="age">2 ans</span>
                        <span className="gender"><BiMaleSign className="gender" size={30}/></span>
                    </Card.Text>
                    <Card.Text className="last-walking orange">
                        Dernière sortie : 1 jours 15 heures
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Img variant="top"  className="card-dog" src={Diego} />
                <Card.Body>
                    <Card.Title>Nina</Card.Title>
                    <Card.Text>
                        <span className="age">2 ans</span>
                        <span className="gender"><BiFemaleSign className="gender" size={30}/></span>
                    </Card.Text>
                    <Card.Text className="last-walking red">
                        Dernière sortie : 2 jours 15 heures
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    </>

  );
}

export default React.memo(WalkingDog);
