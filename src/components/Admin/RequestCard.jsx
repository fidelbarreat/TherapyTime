import React from 'react'

import "./request.css"

const RequestCard = ({request, onReject, onAccept}) => {
    return (
        <div className="request" key={request.email}>
            <div className="request-info">
                <h3>{request.nombre}</h3>
                {request.file !== ""? <a href={request.file} download>Descargar Curriculum</a> : <h6>No existe Curriculum</h6>}
            </div>
            <div className="request-btns">
                <button onClick={() => onAccept(request)}>✔️</button>
                <button onClick={() => onReject(request)}>❌</button>
            </div>
        </div>
    )
}

export default RequestCard
