import React, {PureComponent} from 'react';
import {renderIf} from '../utils/commonUtils';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class Home extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      user: window._user,
      houses: [],
      favHouses: []
    };
  }

  componentDidMount = () => {
    if (this.state.user) {
      axios.get('/api/house/list-mine')
        .then(res => {
          this.setState({houses: res.data});
        });
      axios.get('/api/house/list-favs')
        .then(res => {
          this.setState({favHouses: res.data});
        });
    }
  };

  render () {
    return (
      <div className={'homepage'}>
        {
          renderIf(this.state.user)(
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <Link className={'btn btn-default btn-lg'} to={'/add-house'}>Add</Link>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <table className="table">
                    <caption>My Houses</caption>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Create Time</th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.houses.map(v => (
                        <tr key={v._id}>
                          <td>{v.name}</td>
                          <td>{new Date(v.createTime).toLocaleString()}</td>
                          <td><Link to={'/house/' + v._id}>View Detail...</Link></td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <table className="table">
                    <caption>My Favs</caption>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Create Time</th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.favHouses.map(v => (
                        <tr key={v._id}>
                          <td>{v.house.name}</td>
                          <td>{new Date(v.house.createTime).toLocaleString()}</td>
                          <td><Link to={'/house/' + v.house._id}>View Detail...</Link></td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}