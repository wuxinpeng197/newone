import React from 'react';

import Signupform from './signupform';

//import { connect } from 'react-redux';

//import { userSignupRequest, isUserExists } from '../../actions/signupActions';

//import { addFlashMessage } from '../../actions/flashMessages.js';



class Signuppage extends React.Component {

    render() {

        //const { userSignupRequest, addFlashMessage, isUserExists } = this.props;

        return (

            <div className="row">

                <div className="col-md-4 col-md-offset-4">

                    <Signupform/>

                </div>

            </div>

        );

    }

}
export default Signuppage;