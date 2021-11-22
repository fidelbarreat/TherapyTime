import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import { auth } from "../../utils/firebase-config";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../images/logo.png";
import "./Navbar.css";

function NavBar() {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = async () => {
		await auth.signOut();
		setUser(null);
		history.push("/");
	};

	return (
		<>
			<Navbar expand="lg" className="nav" fixed="top">
				<Container>
					{/* <Navbar.Brand><div className = "logo">TherapyTime</div></Navbar.Brand> */}
					<Navbar.Brand>
						<img className="imag-log" src={logo} alt="Logo" />
					</Navbar.Brand>
					<Navbar.Collapse id="basic-navbar-nav justify-content-end">
						<Nav className="me-auto ">
							<Nav.Link>
								<Link to="/" className="link">
									Home
								</Link>
							</Nav.Link>

							{!!user && (
								<Nav.Link>
									<Link to="/Perfil" className="link">
										Perfil
									</Link>
								</Nav.Link>
							)}

							{!!user ? (
								<div>
									<button type="button" onClick={handleLogout}>
										Logout {user.name}
									</button>
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
