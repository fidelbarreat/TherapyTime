import { createUserWithEmailAndPassword } from '@firebase/auth';
import React from "react";
import { useState} from "react";
import { auth, db , st } from "../../utils/firebase-config";
import FormularioRegistro from './FormularioRegistro';



function Registrarse(){

    return <FormularioRegistro/>;

};


export default Registrarse;