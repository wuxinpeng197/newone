import React, {PureComponent} from 'react';
import {renderIf} from '../utils/commonUtils';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class HouseInformation extends PureComponent {
  pageSize = 10;

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      user: window._user,
      houses: [],
      page: 0,
      total: 0,
      sort: -1
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    if (this.state.user) {
      this.setState({loading: true});
      axios.get('/api/house/list', {
        params: {
          limit: this.pageSize,
          offset: this.state.page * this.pageSize,
          sort: this.state.sort
        }
      })
        .then(res => {
          this.setState({houses: res.data.data, total: res.data.total, loading: false});
        })
        .catch(err => {
          console.error(err);
          this.setState({loading: false});
        });
    }
  };

  onPageChange = (page) => {
    if (page !== this.state.page) {
      this.setState({page}, this.fetchData);
    }
  };

  toggleSortDesc = () => {
    if (this.state.sort !== -1) {
      this.setState({sort: -1, page: 0}, this.fetchData);
    }
  };

  toggleSortAsc = () => {
    if (this.state.sort !== 1) {
      this.setState({sort: 1, page: 0}, this.fetchData);
    }
  };

  render () {
    if (!this.state.user) {
      return <Redirect to={'/login'}/>;
    }

    const pageNum = Math.ceil(this.state.total / this.pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 clearfix">
            <h2 className="page-header">House Information</h2>
            <div>
              <button type="button" className={this.state.sort === -1 ? 'btn btn-primary' : 'btn btn-default'}
                      onClick={this.toggleSortDesc}>
                Sort by price desc
              </button>
              &nbsp;
              <button type="button" className={this.state.sort === 1 ? 'btn btn-primary' : 'btn btn-default'}
                      onClick={this.toggleSortAsc}>
                Sort by price asc
              </button>
            </div>
            <br/>
            <nav>
              <div>Page:</div>
              <ul className="pagination">
                {
                  Array.apply(0, new Array(pageNum)).map((v, i) => (
                    <li key={i} className={this.state.page === i ? 'active' : ''}>
                      <a role="button" onClick={() => this.onPageChange(i)}>{i + 1}</a>
                    </li>
                  ))
                }
              </ul>
            </nav>
            {
              renderIf(this.state.loading)(
                <p>Loading...</p>
              )
            }
            {
              renderIf(!this.state.loading)(
                this.state.houses.map(v => (
                  <div key={v._id} className="card">
                    <div>
                      <h4>{v.name}</h4>
                    </div>
                    <div className={'clearfix'}>
                      <div className={'pull-left'}>
                        <p>
                          <img src={'/public/uploads/' + v.image} style={{width: 100, height: 100}}/>
                        </p>
                      </div>
                      <div className={'pull-left'} style={{marginLeft: 20}}>
                        <p>Price: {v.price}</p>
                        <p>Created: {new Date(v.createTime).toLocaleString()}</p>
                        <Link to={'/house/' + v._id}>View Detail...</Link>
                      </div>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>
    );
  }
}