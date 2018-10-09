import React, {PureComponent} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class AddHouse extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      price: 0,
      address: '',
      contact: '',
      type: '', // apartment, house, studio,
      redirectToHome: false,
      user: window._user
    };
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  onImageChange = (event) => {
    this.setState({image: event.target.value});
  };

  onPriceChange = (event) => {
    this.setState({price: event.target.value});
  };

  onAddressChange = (event) => {
    this.setState({address: event.target.value});
  };

  onContactChange = (event) => {
    this.setState({contact: event.target.value});
  };

  onTypeChange = (event) => {
    this.setState({type: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('price', this.state.price);
    data.append('address', this.state.address);
    data.append('contact', this.state.contact);
    data.append('type', this.state.type);
    data.append('image', document.querySelector('#inputImage').files[0]);

    axios.post('/api/house/add', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        alert('Success.');
        this.setState({redirectToHome: true});
      })
      .catch(err => {
        alert('Failed.');
      });
  };

  render () {
    if (this.state.redirectToHome || !this.state.user) {
      return <Redirect to={'/'}/>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.handleSubmit} style={{maxWidth: 400, margin: '0 auto'}}>
              <h1>Add House</h1>
              <br/>
              <div className="form-group">
                <label htmlFor="inputName">Title</label>
                <input type="text" className="form-control" id="inputName"
                       value={this.state.name} onChange={this.onNameChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputImage">Image</label>
                <input type="file" className="form-control" id="inputImage"
                       value={this.state.image} onChange={this.onImageChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputPrice">Price/week</label>
                <input type="number" className="form-control" id="inputPrice"
                       value={this.state.price} onChange={this.onPriceChange} required min={0}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress"
                       value={this.state.address} onChange={this.onAddressChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputContact">Contact</label>
                <input type="text" className="form-control" id="inputContact"
                       value={this.state.contact} onChange={this.onContactChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputType">Type</label>
                <select className="form-control" id="inputType" value={this.state.type}
                        onChange={this.onTypeChange} required>
                  <option disabled value={''}/>
                  <option value={'apartment'}>apartment</option>
                  <option value={'house'}>house</option>
                  <option value={'studio'}>studio</option>
                </select>
              </div>
              <div className={'text-center'}>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}