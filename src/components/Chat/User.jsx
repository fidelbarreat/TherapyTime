import { Link } from "react-router-dom";

function User(usuario) {
	return (
        
		<div className="user_wrapper">
        <div className="user_info">
          <div className="user_detail">
            <Link to={`/Chat_vivo/${btoa(usuario.usuario.uid)}`}><h4>{usuario.usuario.nombre}</h4></Link>
          </div>
        </div>
        </div>

	);
}

export default User;