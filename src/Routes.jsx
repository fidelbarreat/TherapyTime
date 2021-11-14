import { Switch, Route } from 'react-router-dom';

import Home from '../src/paginas/Home';
import Login from '../src/paginas/Login';
import Registrarse from '../src/paginas/Registrarse';
import Perfil from '../src/paginas/Perfil'


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