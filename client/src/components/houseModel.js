import React, { Component } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItems } from '../actions/houseAction';

class HouseModel extends Component {
    state = {
        modal: false,
        number: '',
        price: '',
        selection: '',
        text: ''
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

    };

    onChange = e => {
        this.setState({ [e.target.price]: e.target.value });
        this.setState({ [e.target.number]: e.target.value });
        this.setState({ [e.target.selection]: e.target.value });
        this.setState({ [e.target.text]: e.target.value });
        this.setState({ [e.target.file]: e.target.value });
    };



    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            number: this.state.number,
            price: this.state.price,
            selection: this.state.selection,
            text: this.state.text
        };

        // Add item via addItem action
        this.props.addItems(newItem);

        // Close modal
        this.toggle();

    };
    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Add Housing Informaiton
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Housing List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Contact Phone Number</Label>
                                <Input type="number" name="number" id="exampleEmail" placeholder="phone" />
                                <Label for="examplePassword">Price</Label>
                                <Input type="number" name="price" id="examplePassword" placeholder="PRICE" />
                                <Label for="exampleSelect">Select Types Of Property</Label>
                                <Input type="select" name="selection" id="exampleSelect">
                                    <option>APARTMENT</option>
                                    <option>HOUSE</option>
                                    <option>TOWN HOUSE</option>
                                    <option>STUDIO</option>
                                </Input>
                                <Label for="exampleText">Property Description</Label>
                                <Input type="textarea" name="text" id="exampleText" />
                                <Label for="exampleFile">File</Label>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Upload the pictures of property
                                </FormText>
                            <Button>Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    items: state.items
});

export default connect(
    mapStateToProps,
    { addItems }
)(HouseModel);