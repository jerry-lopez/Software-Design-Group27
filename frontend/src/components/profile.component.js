import React, { Component } from 'react';
import { Form, Button, Card, Container, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../actions/authActions";
import classnames from "classnames";
import AuthNavbar from "./navbarAuth.component";
import "bootstrap/dist/css/bootstrap.min.css"
import states from "../states.json"
const stateOptions = Object.keys(states).map(state => <option key={state} >{state}</option>)


class UserProfile extends Component {
    constructor(props){
        super(props);

        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangeAddressOne= this.onChangeAddressOne.bind(this);
        this.onChangeAddressTwo = this.onChangeAddressTwo.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState= this.onChangeState.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        //this.onChangeUsernameId = this.onChangeUsernameId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fullname: '',
            addressOne: '',
            addressTwo: '',
            city: '',
            state: '',
            zipcode: '',
            username: '',
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChangeFullname = (e) => {
        this.setState({
            fullname: e.target.value
        })
    }

    onChangeAddressOne = (e) => {
        this.setState({
            addressOne: e.target.value
        })
    }

    onChangeAddressTwo = (e) => {
        this.setState({
            addressTwo: e.target.value
        })
    }

    onChangeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    onChangeState = (e) => {
        this.setState({
            state: e.target.value
        })
    }

    onChangeZipcode = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }

    /*
    onChangeUsernameId = (e) => {
        this.setState({
            username_id: this.props.match.params.id
        })
    }
    */
    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            fullname: this.state.fullname,
            addressOne: this.state.addressOne,
            addressTwo: this.state.addressTwo,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            username: this.props.match.params.id
        }

        this.props.createProfile(profileData, this.props.history);
        

    }

    render() {
        const { errors } = this.state;
        return(
            <Container>
            <AuthNavbar />
            <Container className="mt-5 pt-5">
              <Card>
                  <Card.Body>
                      <div className="m-4">
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formGridFullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="name" maxLength="50" placeholder="John Doe" 
                                    required
                                    onChange={this.onChangeFullname}
                                    value={this.state.fullname}
                                    error={errors.fullname}
                                    className={classnames("", { invalid: errors.fullname})}
                                    />
                            </Form.Group>
    
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control maxLength="100" placeholder="1234 Main St" 
                                    required
                                    onChange={this.onChangeAddressOne}
                                    value={this.state.addressOne}
                                    error={errors.addressOne}
                                    className={classnames("", { invalid: errors.addressOne})}
                                    />
                            </Form.Group>
    
                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control maxLength="100" placeholder="Apartment, studio, or floor" 
                                    onChange={this.onChangeAddressTwo}
                                    value={this.state.addressTwo}
                                    error={errors.addressTwo}
                                    className={classnames("", { invalid: errors.addressTwo})}
                                    />
                            </Form.Group>
    
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control maxLength="100" 
                                    required
                                    onChange={this.onChangeCity}
                                    value={this.state.city}
                                    error={errors.city}
                                    className={classnames("", { invalid: errors.city})}
                                    />
                                </Form.Group>
    
                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" 
                                    required
                                    onChange={this.onChangeState}
                                    value={this.state.state}
                                    error={errors.state}
                                    className={classnames("", { invalid: errors.state})}
                                    >
                                    {stateOptions}
                                </Form.Control>
                                </Form.Group>
    
                                <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="number" minLength="5" maxLength="9" 
                                    required
                                    onChange={this.onChangeZipcode}
                                    value={this.state.zipcode}
                                    error={errors.zipcode}
                                    className={classnames("", { invalid: errors.zipcode})}
                                    />
                                </Form.Group>
                            </Form.Row>
    
                            <Form.Group id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Remember Me" />
                            </Form.Group>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                            
                        </Form>
                    </div>
                   </Card.Body>
               </Card>
           </Container>
           </Container>
        );
    }

}

UserProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createProfile }
) (withRouter(UserProfile));