import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
function App() {
  return (
    <Router>
      
        <div className="App">
          <Navbar />
          
          
        </div> 
        <Footer />
    </Router>    
  );
}

export default App;
