import React, {useState,useEffect, Component} from 'react';
import { useParams } from 'react-router-dom';
import {Container, Card, Button, Col, Stack, Form} from "react-bootstrap";
import Calendario from "./Calendario";

function Reservar_Cita() {

    let {nombre,email} = useParams();

      return (
        <Container className="text-center justify-content">
            <h1 className="header my-4">Reservar Cita</h1>
 
            <p>Nombre usuario: <b>{nombre}</b></p>
            <p>Email usuario: <b>{email}</b></p>

            <Calendario/>

		</Container>
        );
}

export default Reservar_Cita