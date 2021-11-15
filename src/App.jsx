import './App.css';
import Routes from './Routes';
import UserContextProvider from './components/UserContext';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from './components/Navbar/NavBar';

function App() {
  
  return (

    <UserContextProvider>

        <Router>
          <NavBar />
          <Routes />

        </Router>

    </UserContextProvider>


  );

}

export default App;