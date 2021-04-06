import React, { Component } from 'react';
import { Form, Container, Col, Button, Card } from "react-bootstrap";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class NewFuelQuote extends Component {
    constructor(props) {
        super(props);

        this.onChangeGallons = this.onChangeGallons.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // The remaining variables will be added once the database becomes available
        this.state = {
            numOfGallons: 0,
            date: new Date()
        }
    }

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onChangeGallons = (e) => {
        this.setState({
            numOfGallons: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const quote = {
            numOfGallons: this.state.numOfGallons,
            date: this.state.date
        }

        console.log(`Success ${quote}`);

        axios.post('http://localhost:5000/newForm', quote)
            .then(res => console.log(res.data));

        //window.location = '/newForm';
    }


    render() {
        return (
            <Container className="mt-5 mb-5 pt-5">
                <div>
                    <button onClick={this.onLogoutClick}>Logout</button>
                </div>
                <Card>
                  <Card.Body>
                    <Container>
                        <Form onSubmit={ this.onSubmit }>
                            <Form.Row>
                            <Col xs={7}>
                                <Form.Label>Enter the amount of Gallons needed.</Form.Label>
                                <Form.Control type="number"
                                    placeholder="Gallons requested" 
                                    required
                                    value={this.state.numOfGallons}
                                    onChange={this.onChangeGallons}
                                    />
                            </Col>
                            <Col>
                                <Form.Label>Delivery Date</Form.Label>
                                <Form.Control type="date"
                                    valued={this.state.date}
                                    onChange={this.onChangeDate}
                                    />
                            </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Delivery Address will be taken from your profile.</Form.Label>
                                    <Form.Control type="text" placeholder="Address"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <div>
                                        <br />
                                        <p>Suggested price is currently pending.</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <br />
                                        <p>Total Amount feature is currently pending.</p>
                                    </div>
                                </Col>
                            </Form.Row>
                            <div style={{display: 'flex', justifyContent:'center'}}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Container>
                  </Card.Body>
                </Card>
            </Container>
        )
    } 
}

NewFuelQuote.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
) (NewFuelQuote); 