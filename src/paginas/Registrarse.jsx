import { createUserWithEmailAndPassword } from '@firebase/auth';
import React from "react";
import { useState} from "react";
import { auth, db , st } from "../firebase-config";
import FormularioRegistro from '../components/FormularioRegistro';



function Registrarse(){

    return <FormularioRegistro/>;

};


export default Registrarse;