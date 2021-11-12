import React, {Component} from 'react'; 
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import {Button} from "../Button"
import logo from "./logo.png";

class Navbar extends Component {
    state ={clicked:false}
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

   render() {
        return(
            <nav className="NavbarItems">
                <div
                className="navbar-logo"><h1 className="myname"><img className="imag-log" src={logo} alt="Logo" /> TherapyTime</
                h1> </div>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times':'fas fa-bars'} ></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active': 'nav-menu'}>
                    {MenuItems.map ((item, index) =>{
                        return (
                            <li key={index}>
                                <a className={item.cName} href ={item.url}>
                                 {item.title}
                                 </a>
                            </li>
                        )
                    })}    
                </ul>
                <Button>Ingresar</Button>
            </nav>
        )
    }     
}            
export default Navbar

