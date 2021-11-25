import './App.css';
import Routes from './Routes';
import UserContextProvider from './components/UserContext';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from './components/Navbar/NavBar';
import PacmanLoader from "react-spinners/PacmanLoader";
import {useState,useEffect} from 'react';


function App() {
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 1500)
        // eslint-disable-next-line
    }, []);

  return (
    <>
      {
        loading ?

        <PacmanLoader color={"#F698D4"} loading={loading}  size={50} />

        :

        <UserContextProvider>

        <Router>
          <NavBar />
          <Routes />

        </Router>

    </UserContextProvider>
    
    }
  
    </>
  );

}

export default App;