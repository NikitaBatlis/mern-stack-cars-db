import React from 'react';
import axios from 'axios'; 
import './App.css';
//Bootstrap Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Components
import Titles from './components/Titles';
import Forms from './components/Forms';
import Cars from './components/Cars';
import Modal from './components/Modal';

export default class App extends React.Component {

  //Contruncted starting state:
  state = {
    cars: [],
    error: "Error - Please try again",
    showModal: false,
    editCar: null
  };

   
  //ON LOAD
 componentWillMount = () => {
      axios.get('/api/cars')
      .then(
        (res) => {
          this.setState({
            cars: res.data
          });
        },
        (error) => {
          console.log(error);
          this.setState({
              error
          });
        }
      )
  }

  //POST
  addProject = (e) => { 
    e.preventDefault();

    const payload = { 
      model: e.target.model.value, 
      make: e.target.make.value,
      color: e.target.color.value,
      registration: e.target.registration.value,
      owner: e.target.owner.value
    }

    axios({
      url: '/api/cars/post',
      method: 'POST',
      data: payload
    })

      .then( res => {
        console.log('Data has been sent to server')
        const newCars = [...this.state.cars];
        newCars.push(res.data.body);
        this.setState({cars: newCars});
        alert('New car was added')
      })
      .catch(error => console.log(`Error message: ${error}`));
      return
  }
 
  //PUT
  editCar = (e) => {
    e.preventDefault(); 

    const payload = {
      ...this.state.editCar,
      owner: e.target.owner.value
    }

     axios({
      url: '/api/cars/update', 
      method: 'PUT',
      data: payload
      })

      .then( res => {
        console.log(res.data);
        const newCars = [...this.state.cars];
        const targetItem = newCars.find(item => item._id === res.data._id);
        targetItem.owner = res.data.owner;
        this.setState({cars: newCars});
        this.hideModal();
      })
      .catch(error => console.log(`Error: ${error}`));
  }

  //DELETE
  deleteCar = (_id) => {
    const payload = {
      _id: _id
    };
    axios({
      url:'/api/cars/delete',
      method: 'DELETE',
      data: payload
    })
    .then(res => {
      const filteredCars = this.state.cars.filter(item => item._id !== _id);
      this.setState({cars: filteredCars});
      alert('Car was deleted')
    })
    .catch(error => console.log(`Error message: ${error}`));
  }
  
  //MODAL HANDLING
  showModal = (car) => {
    this.setState({showModal: true, editCar: car});
  } 

  hideModal = () => {
    this.setState({showModal: false,  editCar: null});
  } 

  render() {
    return (
      <div>
          <div className="main">
              <Container>
                  <Row>
                      <Col className="titleContainer">
                          <Titles />
                      </Col>
                  </Row>
                  <Row>
                      <Col className="formsContainer">
                          <Forms onSubmit={this.addProject} />
                      </Col>
                  </Row>
                  <Row>
                      <Col className="carsContainer">
                          <Cars cars={this.state.cars} deleteCar={this.deleteCar} editCar={this.showModal} />
                      </Col>
                  </Row>
                  <Modal show={this.state.showModal} onHide={this.hideModal} submitEdit={this.editCar}/>
              </Container>
          </div>
      </div>
    );
  }
}


