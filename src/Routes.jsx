import { Switch, Route } from 'react-router-dom';

import Home from './components/HomePage/Home';
import Login from './components/Login/Login';
import Registrarse from './components/RegistroPersona/Registrarse';
import Perfil from './components/Perfil/Perfil'


import PrivateRoute from '../src/components/ProtectedRoutes/PrivateRoute';



function Routes() {
  return (
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Registrarse" component={Registrarse} />
      
      {/* Protected Route */}
      <PrivateRoute exact path="/Perfil" component={Perfil} />

      <Route exact path="/" component={Home} />
      <Route path="*">
        <h1>404 Not found</h1>
      </Route>
    </Switch>
  );
}

export default Routes;