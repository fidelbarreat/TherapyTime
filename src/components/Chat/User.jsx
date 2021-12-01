

function User(usuario) {
	return (
        
		<div className="user_wrapper">
        <div className="user_info">
          <div className="user_detail">
            <h4>{usuario.usuario.nombre}</h4>
          </div>
        </div>
        </div>

	);
}

export default User;