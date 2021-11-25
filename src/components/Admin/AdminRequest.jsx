import React from "react";
import "../HomePage/home.css";
import "./request.css"

import RequestCard from "./RequestCard";

import { useState, useEffect } from "react";
import { db } from "../../utils/firebase-config";

export default function AdminRequest(){

  const [requests, setRequests] = useState([])

  useEffect(() => {
    db.collection("especialistas_pendientes").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log( doc.data() );
            setRequests( current => [...current, doc.data()] );
          });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
  }, [])

  const onReject = (request) => {
    
    setRequests( requests.filter( r => r!==request ) );

    let q = db.collection("especialistas_pendientes").where("email", "==", request.email);

    q.get().then(snap => {
      snap.forEach(doc => {
        doc.ref.delete();
      });
    });

  }

  const onAccept = (request) => {
    
    setRequests( requests.filter( r => r!==request ) );
  
    let q = db.collection("especialistas_pendientes").where("email", "==", request.email);

    q.get().then(snap => {
      snap.forEach(doc => {
        doc.ref.delete();
      });
    });
    
    try{
    
      db.collection("especialistas").doc(request.email).set(request)
      
    } catch (error) {
      console.log(error.message);
    }
  
  }

  return(
    <main>
        
      <section className="request-container">
        {requests.length !== 0? requests.map( r => <RequestCard onAccept={onAccept} onReject={onReject} key={r.email} request={r} /> ) : <h2>No hay solicitudes pendientes</h2> }
      </section>

    </main>
  )

}