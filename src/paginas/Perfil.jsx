import React from "react";

import { auth } from "../firebase-config";
import { useHistory } from "react-router";

import FormularioModPerfil from "../components/FormularioModPerfil";

export default function Perfil(){
    
    const h = useHistory();

    if( !auth.currentUser ){
        h.push('/login');
    }


    return(
        <>
            <h1>PERFIL DE USUARIO</h1>

            <FormularioModPerfil/>
        </>
    )


}