import React, { Component} from 'react'
import { BrowserRouter, Route, Switch,  NavLink } from 'react-router-dom';
import creatAdvertisement from  './components/creatAdvertisement';
import Navigation from "./components/navigation";

const bg = {
    height: '100%',
    color: 'red',
    //background: url("../../source/1.jpg"),
    background: require("./捕获.PNG"),
};
export default class Header extends Component {
    constructor () {
        super()
        this.state = {
            name: ''
        }
    }
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path="/creatAdvetisement" component={creatAdvertisement} />
                    </Switch>
                </div>
            </BrowserRouter>

        )
    }
}