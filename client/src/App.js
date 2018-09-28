import React, { Component } from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './components/home'
import About from './components/About'
import Contact from './components/contact'
import Footer from "./components/Footer";
//import Loginpage from './components/login/Loginpage';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
    render() {

        return (
            <div>
                <Provider store={store}>
            <BrowserRouter>
                <div className="App"  >
                    <Navbar />
                    <Route exact path='/' component={Home}/>
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                </div>
            </BrowserRouter>
                </Provider>
            <Footer/>
            </div>
        );
    }
}

export default App;


