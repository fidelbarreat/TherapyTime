import React from "react";

import { auth } from "../../utils/firebase-config";
import { useHistory } from "react-router-dom";

import CheckoutView from "./CheckoutView";

export default function Checkout(){
    
    const h = useHistory();

    // if( !auth.currentUser ){
    //     h.push('/login');
    // }
    
    return(
        <>
            <CheckoutView/>
        </>
    )


}