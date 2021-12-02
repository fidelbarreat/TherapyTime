import React, {useState,useEffect, Component} from 'react';
import { auth, db } from "../../utils/firebase-config";
import { useHistory, Link } from "react-router-dom";
import {Container, Card, Button, Col, Stack, Form, Row} from "react-bootstrap";
import ShowModal from './Modal';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchSpecialist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


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
    const [tablaSpecialists, setTablaSpecialists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    const ref = db.collection("especialistas");

    function getSpecialists() {
        ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
            console.log(items)
        });
        setSpecialists([...specialists,...items]);
        setTablaSpecialists([...specialists,...items]);
        });
    }
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getSpecialists();
            setLoading(false);
        }, 1000)
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

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }
      
      const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaSpecialists.filter((elemento)=>{

            elemento.nombre = "" + elemento.nombre;
            elemento.especialidad = "" + elemento.especialidad;
            elemento.rating = "" + elemento.rating;
            if(elemento.nombre.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(terminoBusqueda.toLowerCase())
            ){
                return elemento;
            } 
            
            else if (terminoBusqueda === "Calificación")
            {
                return elemento;
            }

            else if (elemento.especialidad.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(terminoBusqueda.toLowerCase()))
            {
                return elemento;
            }

            else if(elemento.rating.toString().includes(terminoBusqueda)){
                return elemento;
            }

            });

        setSpecialists(resultadosBusqueda);
      }

    return (
		<>
                <Container className="text-center justify-content">
                <h1 className="header my-4">Búsqueda de especialista</h1>
		
			    <Stack direction="horizontal" gap={3} className="my-4">
                
                    <Form.Control className="me-autob text-center" placeholder="Inserte el especialista que desea buscar..." 
                    value={busqueda}
                    onChange = {handleChange}
                    />

                    <button className="btn btn-success">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>

			    <select onChange={handleChange} >
			    {["Calificación","0","1","2","3","4","5"].map(name => <option value={name}>{name}</option>)}
			    </select>

			    </Stack>
                <Row className="mirow">
			    {specialists &&
                specialists.map((specialist) => {
                    let name = specialist.nombre;
                    let especialidad = specialist.especialidad;
                    return(
                        
                        <Col xs= {6}>
                        <Card className="text-centerb" border={'dark'}>
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>
                                {especialidad}
                                </Card.Text>
                                <Button as={Col} className="btn-sm1" variant="secondary" onClick={() => onPress(specialist)}>
                                    Descripción
                                </Button>{' '}

                                <ShowModal 
                                    show={modalShow}
                                    data = {activeItem}
                                    onHide={() => setModalShow(false)}
                                />

                        <Link       
                            to={`/Reservar_Cita/${btoa(specialist.nombre)}/${btoa(specialist.email)}`}>
                            <Button as={Col} className="btn-sm2 my-2" variant="warning">Reservar</Button>
                        </Link>

                            </Card.Body>

                    <Card.Footer className="text-muted">Calificación: {specialist.rating}</Card.Footer>

                    </Card>
                    </Col>
                )})}
                </Row>
                </Container>
		
         </>
	);

};

export default SearchSpecialist