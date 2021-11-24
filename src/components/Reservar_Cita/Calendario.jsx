import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class Calendario extends Component {

    state={
        fecha: new Date(),
    }
      
    onChange=fecha=>{
        this.setState({fecha: fecha});
      }
      
    mostrarFecha = fecha=>{
        alert(fecha);
      }

    render() {
        return (
          <>
            <div className="contenedor">
              <div className="center">
               <DatePicker selected={this.state.fecha} 
                onChange={this.onChange}
                minDate={new Date()}
                maxDate={new Date("2022", "11", "24")}
                showDisabledMonthNavigation
                showTimeSelect
                excludeTimes={[
                    new Date(30),
                ]}
                dateFormat="MMMM d, yyyy h:mm aa"
               />
               <br /><br />
    
               <input type="button" value="Mostrar Fecha" className="btn btn-primary" onClick={()=>this.mostrarFecha(this.state.fecha)}/>
              </div>
            </div>
          </>
        );
    }

  }
  
  export default Calendario;