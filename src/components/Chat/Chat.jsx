import React, { useEffect, useState, useContext } from "react";
import { db, auth, st } from "../../utils/firebase-config";
import User from "./User";
import './Chat.css';
import { UserContext } from "../UserContext";

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
		<div className="home_container">
            <div className="users_container">
                {users.map(usuario => (
                <User
                  key={usuario.uid}
                  usuario={usuario}
                  selectUser={selectUser}
                />
                ))}
            </div>
        </div>
	);
};

export default Chat;