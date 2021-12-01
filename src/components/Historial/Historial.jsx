import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'
import { useContext } from "react";
import { db } from "../../utils/firebase-config";
import { UserContext } from "../UserContext";
import { useState, useEffect } from "react";

function Historial() {

    const [consultas, setConsultas] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        console.log(user.tipo_de_usuario)
        if(user.tipo_de_usuario === "Especialista"){
        const usersRef = db.collection( "consultas");
        // create query object
        const q = usersRef.where("uid_specialist", "==", user.uid);
        // execute query
        const unsub = q.onSnapshot((querySnapshot) => {
        let people = [];
        querySnapshot.forEach((doc) => {
            people.push(doc.data());
        });
        setConsultas([...consultas,...people]);
        });
        return () => unsub();

        } else if (user.tipo_de_usuario === "Paciente"){
        const usersRef = db.collection("consultas");
        // create query object
        const q = usersRef.where("uid_pacient", "==", user.uid);
        // execute query 
        const unsub = q.onSnapshot((querySnapshot) => {
        let people = [];
        querySnapshot.forEach((doc) => {
            people.push(doc.data());
        });
        setConsultas([...consultas,...people]);
        });
        return () => unsub();
        }
        
    }, []);

    let opcion = "";
    let opcion2 = "";
    if(user.tipo_de_usuario === "Especialista"){
        opcion = 'name_pacient'
        opcion2 = "PACIENTE"
    } else if (user.tipo_de_usuario === "Paciente"){
        opcion = 'name_specialist'
        opcion2 = "ESPECIALISTA"
    }

    const columna_pacient = [

        {
            name: 'FECHA',
            selector: 'dateTime',
            sortable: false
        },

        {   
            name: opcion2,
            selector: opcion,
            sortable: true
        },

        {
            name: 'MONTO',
            selector: 'price',
            sortable: true
        },

        {
            name: 'COMENTARIO',
            selector: 'comentario',
            sortable: true
        },
    ]

    const paginacionOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'

    }

    return (
    <div>
        <DataTable
        columns = {columna_pacient}
        data = {consultas}
        tittle = "Historial de consultas"
        pagination
        paginationComponentOptions= {paginacionOpciones}
        fixedHeader
        />
    </div>
    );
}

export default Historial;