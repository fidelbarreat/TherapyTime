import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { db, auth, googleProvider } from "../../utils/firebase-config";
import { UserContext } from "../UserContext";
import { useState } from "react";
import './formularioLogin.css';
import image from "../../images/login.png";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";

function FormularioLogin() {
	const { setUser } = useContext(UserContext);
	const history = useHistory();
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const handleOnChange = (event) => {
		const { value, name: inputName } = event.target;
		console.log({ inputName, value });
		setValues({ ...values, [inputName]: value });
	};

	const handleGoogleLogin = async () => {
		await auth.signInWithPopup(googleProvider);
		const docRef = db.collection("users").doc(auth.currentUser.uid);

		docRef
			.get()
			.then((doc) => {
				console.log(doc.data());

				if (doc.data() == null) {
					const newGoogleLogin = {
						// uid: auth.currentUser.uid,
						email: auth.currentUser.email,
						password: "",
						nombre: auth.currentUser.displayName,
						fecha_de_nacimiento: "",
						telefono: "",
						tipo_de_usuario: "Paciente",
						file: "",
					};

					docRef.set(newGoogleLogin).catch((err) => {
						console.log(err.message);
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});

		history.push("/");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await auth.signInWithEmailAndPassword(values.email, values.password);
		history.push("/");
	};

	return (
		<div className="login-container">
			<Container>
				<Row>
					<Col sm={6}><img src={image} alt="" width="100%"/></Col>
					<Col sm={6}>
						<Card className="card">
							<Card.Body>
								<Card.Title>Inicio de Sesión</Card.Title>
								{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
								<Card.Text>
									<Form className="form" onSubmit={handleSubmit}>
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Correo</Form.Label>
											<Form.Control
												className="email"
												name="email"
												id="email"
												type="email"
												placeholder="Ingresa tu correo"
												value={values.email}
												onChange={handleOnChange}
											/>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicPassword">
											<Form.Label>Contraseña</Form.Label>
											<Form.Control
												className="clave"
												name="password"
												id="password"
												type="password"
												placeholder="Ingresa tu contraseña"
												value={values.password}
												onChange={handleOnChange}
											/>

											<Form.Text className="text-muted">
												Nunca compartas tu contraseña con nadie.
											</Form.Text>
										</Form.Group>

										<Button
											className="submitLogin"
											variant="primary"
											type="submit"
											onClick={handleSubmit}
										>
											Ingresar
										</Button>
										<br />
										<br />
										<Button
											className="loginWithGoogle"
											variant="primary"
											type="button"
											onClick={handleGoogleLogin}
										>
											Ingresar con Google
										</Button>
									</Form>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
			
				</Row>
			</Container>
		</div>
	);
}

export default FormularioLogin;
