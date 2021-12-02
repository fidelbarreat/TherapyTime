import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowModal(props){
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.data?.nombre}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Especialidad: {props.data?.especialidad}</h4>
                <p>
                    {props.data?.biografia}
                </p>
                <h4>Rating: {props.data?.rating}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
}

export default ShowModal;