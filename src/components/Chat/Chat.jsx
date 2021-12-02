import React, { useEffect, useState, useContext } from "react";
import { db, auth, st } from "../../utils/firebase-config";
import User from "./User";
import './Chat.css';
import { UserContext } from "../UserContext";
import image from "../../images/register.png";
import { Form, Button, Container, Card, Col, Row } from "react-bootstrap";

function Chat() {
	
    const [users, setUsers] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [chat, setChat] = useState("");


    useEffect(() => {
        if(user.tipo_de_usuario === "Especialista"){
        const usersRef = db.collection( "pacientes");
        // create query object
        const q = usersRef.where("uid", "not-in", [auth.currentUser.uid]);
        // execute query
        const unsub = q.onSnapshot((querySnapshot) => {
          let people = [];
          querySnapshot.forEach((doc) => {
            people.push(doc.data());
          });
          setUsers([...users,...people]);
        });
        return () => unsub();

        } else if (user.tipo_de_usuario === "Paciente"){
        const usersRef = db.collection( "especialistas");
        // create query object
        const q = usersRef.where("uid", "not-in", [auth.currentUser.uid]);
        // execute query 
        const unsub = q.onSnapshot((querySnapshot) => {
          let people = [];
          querySnapshot.forEach((doc) => {
            people.push(doc.data());
          });
          setUsers([...users,...people]);
        });
        return () => unsub();
        }
        
      }, []);
    
    const selectUser = (usuario) => {
        setChat(usuario);
        console.log(usuario);
    };

	return (
    <Container className="text-center justify-content mt-5">
      <Row>
        <h1>Chats</h1>
        <Col xs={6}>
                {users.map(usuario => (
                <User
                  key={usuario.uid}
                  usuario={usuario}
                  selectUser={selectUser}
                />
                ))}
                </Col>
                
        <Col xs={6}>
          <img className="myim"src={image} alt="" width="100%"/>
        </Col>
                </Row>
                </Container>
	);
};

export default Chat;