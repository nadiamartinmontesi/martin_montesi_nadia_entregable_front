import React from 'react';
import data from "./components/data.json";
import Opcion from "./components/Opcion.jsx";
import Recordatorio from './components/Recordatorio';
import Historia from './components/Historia';
import Swal from 'sweetalert2';


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        historial : [],
        contador : 0,
        seleccionAnterior : ""
    }
  }

  componentDidUpdate(prevState) {
    if(prevState.contador !== this.state.contador){
      this.state.historial.push(this.state.seleccionAnterior)
    }
  }

  handleClick = (event) => {
    const id = event.target.id;
    if (this.state.contador >= 7) {
      Swal.fire({
        title: 'Llegaste al final de la historia!',
        text: "¿Quieres recargar la página desde el principio?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, recargar!'
      }).then((result) => {
        if (result.isConfirmed) {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      });
    } else if (id === "A" && this.state.seleccionAnterior !== "A") {
      this.setState({
        contador : this.state.contador + 1,
        seleccionAnterior : "A"
      });
    } else if (id === "A" && this.state.seleccionAnterior === "A") {
      this.setState({
        contador : this.state.contador + 2
      });
    } else if (id === "B" && this.state.seleccionAnterior === "A") {
      this.setState({
        contador : this.state.contador + 3,
        seleccionAnterior : "B"
      });
    } else if (id === "B" && this.state.seleccionAnterior !== "A") {
      this.setState({
        contador : this.state.contador + 2,
        seleccionAnterior : "B"
      });
    }
  }

  render() {
    return (
      <div className="layout">
        <Historia historia={data[this.state.contador].historia}/>
        <div className="opciones">
        <Opcion 
            handleClick={this.handleClick}
            id="A"
            opcion={data[this.state.contador].opciones.a}
          />
        <Opcion 
            handleClick={this.handleClick}
            id="B"
            opcion={data[this.state.contador].opciones.b}
        />
        </div>
        <Recordatorio 
        seleccionAnterior={this.state.seleccionAnterior}
        historial={this.state.historial.map(
          (element, index) => (
            <li key={index}>{element}</li>
          ),
          data[this.state.contador].id
        )}
        />
      </div>
    );
  }

}


export default App;
