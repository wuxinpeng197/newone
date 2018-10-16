import React, {PureComponent} from 'react';
import {renderIf} from '../utils/commonUtils';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class HouseDetail extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      fav: false
    };
  }

  componentDidMount = () => {
    this.fetchData();
    this.checkFav();
  };

  /**
   * check if current user have favourite this house
   */
  checkFav = () => {
    const {user} = this.props.user;
    if (user) {
      axios.post('/api/house/check-fav', {
        houseId: this.props.match.params.id
      })
        .then(res => {
          this.setState({fav: res.data.fav});
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  /**
   * Add or cancel favourite
   */
  toggleFav = () => {
    const {user} = this.props.user;
    if (user) {
      axios.post('/api/house/toggle-fav', {
        houseId: this.props.match.params.id
      })
        .then(res => {
          this.setState(prevState => ({fav: !prevState.fav}));
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  /**
   * fetch house detail information
   */
  fetchData = () => {
    const {user} = this.props.user;
    if (user) {
      this.setState({loading: true});
      axios.get('/api/house/detail', {
        params: {
          id: this.props.match.params.id
        }
      })
        .then(res => {
          this.setState({data: res.data, loading: false});
        })
        .catch(err => {
          console.error(err);
          this.setState({loading: false});
        });
    }
  };

  render () {
    const {user} = this.props.user;
    if (!user) {
      return <Redirect to={'/login'}/>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="page-header">House Detail</h2>
            {
              renderIf(this.state.loading)(
                <p>Loading...</p>
              )
            }
            {
              renderIf(!this.state.loading)(
                <div>
                  <div>
                    <button className={'btn btn-default'} type="button" onClick={this.toggleFav}>
                      {this.state.fav ? 'Cancel fav' : 'Add fav'}
                    </button>
                  </div>
                  <hr/>
                  <div className={'row'}>
                    <div className={'col-xs-6'}>
                      <img src={'/public/uploads/' + this.state.data.image} style={{maxWidth: 500}}/>
                    </div>
                    <div className={'col-xs-6'}>
                      <h4>name:</h4>
                      <p>{this.state.data.name}</p>
                      <h4>price:</h4>
                      <p>{this.state.data.price}</p>
                      <h4>address:</h4>
                      <p>
                        <a target='_blank' href={'https://www.google.com.hk/maps/place/' + this.state.data.address}>
                          <span className="glyphicon glyphicon-map-marker"/>&nbsp;{this.state.data.address}
                        </a>
                      </p>
                      <h4>contact:</h4>
                      <p>{this.state.data.contact}</p>
                      <h4>type:</h4>
                      <p>{this.state.data.type}</p>
                      <h4>createTime:</h4>
                      <p>{new Date(this.state.data.createTime).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

export default connect(mapStateToProps)(HouseDetail);
