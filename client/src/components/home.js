import React, { Component } from 'react';
//import HouseList from './HouseList';
import HouseModel from './houseModel';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
    render() {
        return (
                <div>
                <Container>
                    <HouseModel/>
                </Container>
                </div>
        );
    }
}

export default Home;