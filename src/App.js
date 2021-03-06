import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import {renderIf} from './utils/commonUtils';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import AddHouse from './pages/AddHouse';
import HouseInformation from './pages/HouseInformation';
import HouseDetail from './pages/HouseDetail';
import About from './pages/About';
import Help from './pages/Help';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './redux/actions';

class App extends PureComponent {
  componentDidMount = () => {
    // get current user in session if exist
    this.props.actions.fetchUser();
  };

  /**
   * do user logout
   */
  onLogout = () => {
    axios.post('/api/auth/logout')
      .then(res => {
        // redirect to homepage
        window.location.href = '/';
      });
  };

  render () {
    const {loading, user} = this.props.user;
    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <Router>
        <div className={'pageWrapper'}>
          <nav className="navbar navbar-default pageHeader">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/house-information">House Information</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/help">Help</Link></li>
              </ul>

              {
                renderIf(user)(
                  <ul className="nav navbar-nav navbar-right">
                    <p className="navbar-text">Signed in as {user && user.username}</p>
                    <li><a role={'button'} onClick={this.onLogout}>Logout</a></li>
                  </ul>
                )
              }
              {
                renderIf(!user)(
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login">Login</Link></li>
                  </ul>
                )
              }
            </div>
          </nav>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/add-house" component={AddHouse}/>
            <Route path="/house-information" component={HouseInformation}/>
            <Route path="/house/:id" component={HouseDetail}/>
            <Route path="/about" component={About}/>
            <Route path="/help" component={Help}/>
          </div>
          <div className="pageFooter">
            <h5>House information website</h5>
            <a href="https://www.facebook.com/sharer/sharer.php?u=test.com" target="_blank">
              Share on Facebook
            </a>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <a href="http://twitter.com/share?text=test&url=http://test.com" target="_blank">
              Share on Twitter
            </a>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
