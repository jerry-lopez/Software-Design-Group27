import React, { Component } from 'react';
import { Form, Container, Col, Button, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { quoteForm } from "../actions/authActions";
import AuthNavbar from "./navbarAuth.component";
import DatePicker from "react-datepicker";

class NewFuelQuote extends Component {
    constructor(props) {
        super(props);

        this.onChangeGallons = this.onChangeGallons.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAddress= this.onChangeAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
        this.state = {
            numOfGallons: 0,
            deliveryAddress: '',
            deliveryDate: new Date(),
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

    onChangeGallons = (e) => {
        this.setState({
            numOfGallons: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date.target.value
        })
    }

    onChangeAddress = (e) => {
        this.setState({
            deliveryAddress: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const quote = {
            numOfGallons: this.state.numOfGallons,
            date: this.state.date,
            deliveryAddress: this.state.deliveryAddress,
            username: this.props.match.params.id
        }

        console.log(`Success ${quote}`);

        this.props.quoteForm(quote, this.props.history);

        
    }


    render() {
        const { errors } = this.state;
        return (
            <Container>
                <AuthNavbar />
            <Container className="mt-5 mb-5 pt-5">
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
                                    error={errors.numOfGallons}
                                    />
                            </Col>
                            <Col>
                                <Form.Label>Delivery Date</Form.Label>
                                <Form.Control type="date" placeholder=" "
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                    error={errors.onChangeDate}
                                    />
                            </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Delivery Address will be taken from your profile.</Form.Label>
                                    <Form.Control type="text" placeholder="Address"
                                        value={this.state.deliveryAddress}
                                        onChange={this.onChangeAddress}
                                        error={errors.onChangeAddress}
                                    />
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
        </Container>
        )
    } 
}

NewFuelQuote.propTypes = {
    quoteForm: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { quoteForm }
) (withRouter(NewFuelQuote)); 