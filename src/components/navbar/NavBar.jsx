import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import { auth } from "../../utils/firebase-config";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../../images/logo.png";
import "./Navbar.css";

function NavBar() {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	let isAdmin = user?.email === "admin@admin.com";

	const handleLogout = async () => {
		await auth.signOut();
		setUser(null);
		history.push("/");
	};

	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="nav" sticky="top">
				<Container>
					{/* <Navbar.Brand><div className = "logo">TherapyTime</div></Navbar.Brand> */}
					<Navbar.Brand>
						<img className="imag-log" src={logo} alt="Logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav justify-content-end">
						<Nav className="me-auto ">
							<Nav.Link>
								<Link to={ isAdmin? "/Admin":"/"} className="link">
									Home
								</Link>
							</Nav.Link>

							{	isAdmin && (
								<Nav.Link>
									<Link to="/Request" className="link">
										Solicitudes
									</Link>
								</Nav.Link>
							)}

							{!!user && !isAdmin && (
								<Nav.Link>
									<Link to="/Perfil" className="link">
										Perfil
									</Link>
								</Nav.Link>
							)}
							
							{!!user && !isAdmin && (
								<Nav.Link>
									<Link to="/Especialistas" className="link">
										Especialistas
									</Link>
								</Nav.Link>
							)}

							{!!user && !isAdmin && (
								<Nav.Link>
									<Link to="/Historial" className="link">
										Consultas
									</Link>
								</Nav.Link>
							)}
							
							{!!user ? (
								<div>
									<Button variant="warning" onClick={handleLogout}>
										Logout {user.name}
									</Button>
								</div>
							) : (
								<>
									<Nav.Link>
										<Link to="/Login" className="link">
											Login
										</Link>
									</Nav.Link>
									<Nav.Link>
										<Link to="/Registrarse" className="link">
											Registarse
										</Link>
									</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
export default NavBar;