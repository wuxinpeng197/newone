import React from 'react';


class Signupform extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            username: '',

            email: '',

            password: '',

            passwordConfirmation: '',

            timezone: '',

            errors: {},

            isLoading: false,

            invalid: false

        }



        this.onChange = this.onChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.checkUserExists = this.checkUserExists.bind(this);

    }



    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });

    }



    // isValid() {
    //
    //     const { errors, isValid } = validateInput(this.state);
    //
    //
    //
    //     if (!isValid) {
    //
    //         this.setState({ errors });
    //
    //     }
    //
    //
    //
    //     return isValid;
    //
    // }



    checkUserExists(e) {

        const field = e.target.name;

        const val = e.target.value;

        if (val !== '') {

            this.props.isUserExists(val).then(res => {

                let errors = this.state.errors;

                let invalid;

                if (res.data.user) {

                    errors[field] = 'There is user with such ' + field;

                    invalid = true;

                } else {

                    errors[field] = '';

                    invalid = false;

                }

                this.setState({ errors, invalid });

            });

        }

    }



    onSubmit(e) {

        e.preventDefault();



        if (this.isValid()) {

            this.setState({ errors: {}, isLoading: true });

            this.props.userSignupRequest(this.state).then(

                () => {

                    this.props.addFlashMessage({

                        type: 'success',

                        text: 'You signed up successfully. Welcome!'

                    });

                    this.context.router.push('/');

                },

                (err) => this.setState({ errors: err.response.data, isLoading: false })

            );

        }

    }



    render() {

        const { errors } = this.state;


        return (

            <form onSubmit={this.onSubmit}>

                <h1>Join our community!</h1>



                <div className="form-group">

                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">

                        Sign up

                    </button>

                </div>

            </form>

        );

    }

}



// SignupForm.propTypes = {
//
//     userSignupRequest: React.PropTypes.func.isRequired,
//
//     addFlashMessage: React.PropTypes.func.isRequired,
//
//     isUserExists: React.PropTypes.func.isRequired
//
// }



// SignupForm.contextTypes = {
//
//     router: React.PropTypes.object.isRequired
//
// }



export default Signupform;