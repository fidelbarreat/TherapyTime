import { UserContext } from "../UserContext";
import React, {useContext } from "react";
import { useParams } from "react-router-dom";
import  Channel  from "./Channel";
import { db } from "../../utils/firebase-config";

export default function Chat_vivo(){

    const { user, setUser } = useContext(UserContext);
    let {id} = useParams();
    return(
		<div>
            
            <Channel user={user} db={db}/>
 
        </div> 
    )
}