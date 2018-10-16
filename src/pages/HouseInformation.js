import React, {PureComponent} from 'react';
import {renderIf} from '../utils/commonUtils';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import HouseTemplate from '../components/HouseTemplate';
import {connect} from 'react-redux';

class HouseInformation extends PureComponent {
  pageSize = 10; // 10 items per page

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      houses: [],
      page: 0, // 0-based current page
      total: 0, // total houses number
      sort: -1 // -1: price desc, 1: price asc
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  /**
   * get houses data by page and sort
   */
  fetchData = () => {
    const {user} = this.props.user;
    if (user) {
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

  /**
   * change page then fetchData
   * @param page
   */
  onPageChange = (page) => {
    if (page !== this.state.page) {
      this.setState({page}, this.fetchData);
    }
  };

  /**
   * toggle sort to price desc then fetchData
   */
  toggleSortDesc = () => {
    if (this.state.sort !== -1) {
      this.setState({sort: -1, page: 0}, this.fetchData);
    }
  };

  /**
   * toggle sort to price asc then fetchData
   */
  toggleSortAsc = () => {
    if (this.state.sort !== 1) {
      this.setState({sort: 1, page: 0}, this.fetchData);
    }
  };

  render () {
    const {user} = this.props.user;
    if (!user) {
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
                  <HouseTemplate key={v._id} data={v}/>
                ))
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

export default connect(mapStateToProps)(HouseInformation);
