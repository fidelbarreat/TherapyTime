import React, {useState,useEffect} from 'react';
import { auth, db } from "../../utils/firebase-config";
import { useHistory } from "react-router-dom";
import {Container, Card, Button, Col, Stack, Form} from "react-bootstrap";
import ShowModal from './Modal';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchSpecialist.css';

const SearchSpecialist = () => {
    
    const h = useHistory();
    if( !auth.currentUser ){
        h.push('/login');
    }

    //Use States
    const [modalShow, setModalShow] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const onPress = (item) => {
        setActiveItem(item)
        setModalShow(true)
    }

    const [selected, updateSelect] = useState();
	const onChange = (e) => updateSelect(String(e.target.value));

    const [specialists, setSpecialists] = useState([]);
    const [loadaing, setLoading] = useState(false);

    const ref = db.collection("especialistas_pendientes");

    function getSpecialists() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
            console.log(items)
        });
        setSpecialists([...specialists,...items]);
        setLoading(false);
        });
    }
    
    useEffect(() => {
        getSpecialists();
        console.log(specialists)
            // eslint-disable-next-line
        }, []);

    console.log(specialists)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true
            }
        },
        {
            breakpoint: 720,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows:false
            }
        }
        ]
    };
    return (
		<Container className="text-center justify-content">
			<h1 className="header my-4">Búsqueda de especialista</h1>
		
			<Stack direction="horizontal" gap={3} className="my-4">

			<Form.Control className="me-auto text-center" placeholder="Inserte el especialista que desea buscar..." />
			<Button variant="secondary">Buscar</Button>
			<div className="vr" />

			<select onChange={onChange}>
			{["Rating","Nombre","Especialidad"].map(name => <option value={name}>{name}</option>)}
			</select>

			</Stack>
			<Slider {...settings}>
			{specialists && specialists.map((specialist, index) => {
                let name = specialist.nombre;
                let phone = specialist.telefono;
                return(
                    
                    <Card className="text-center">
                        <Card.Img variant="top" src="holder.js/50px50" /> 
                        
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>
                            {phone}, id: {index}
                            </Card.Text>
                            <Button as={Col} className="btn-sm" variant="secondary" onClick={() => onPress(specialist)}>
                                Ver perfil
                            </Button>{' '}

                            <ShowModal 
                                show={modalShow}
                                data = {activeItem}
                                onHide={() => setModalShow(false)}
                            />

                            <Button as={Col} className="btn-sm" variant="warning">Reservar</Button>
                        
                        </Card.Body>

                <Card.Footer className="text-muted">{index}</Card.Footer>

                </Card>
            )})}
            </Slider>
		</Container>
	);

};

export default SearchSpecialist