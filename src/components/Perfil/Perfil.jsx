import React from "react";

import { auth } from "../../utils/firebase-config";
import { useHistory } from "react-router-dom";

import FormularioModPerfil from "./FormularioModPerfil";

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