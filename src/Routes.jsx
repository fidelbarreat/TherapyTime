import { Switch, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Login from './components/Login/Login';
import Registrarse from './components/RegistroPersona/Registrarse';
import Perfil from './components/Perfil/Perfil'
import SearchSpecialist from './components/SearchSpecialist/SearchSpecialist';
import PrivateRoute from '../src/components/ProtectedRoutes/PrivateRoute';
import Reservar_Cita from './components/Reservar_Cita/Reservar_Cita';
import Pagar from './components/Pagar/Pagar';



function Routes() {
  return (
    <Switch>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Registrarse" component={Registrarse}/>
      
      {/* Protected Route */}
      <PrivateRoute exact path="/Perfil" component={Perfil}/>
      <PrivateRoute exact path="/Especialistas" component={SearchSpecialist}/>
      <PrivateRoute exact path="/Reservar_Cita/:nombre/:email" component={Reservar_Cita}/>
      <PrivateRoute exact path="/Pagar" component={Pagar}/>
      {/* <PrivateRoute exact path="/Pagar" component={Pagar}/> */}

      <Route exact path="/" component={Home} />
      <Route path="*">
        <h1>404 Not found</h1>
      </Route>
    </Switch>
  );
}

export default Routes;