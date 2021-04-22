import React, { Component } from 'react';
import { Form, Button, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class UserLogin extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/newForm");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated && this.props.clientInfo) {
            this.props.history.push("/newForm"); // push user fuel quote component
        }
        else if (nextProps.auth.isAuthenticated && !this.props.clientInfo){
            this.props.history.push("/profile");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.loginUser(userData);

    }

    render() {
        const { errors } = this.state;
        return(
            <Container className="mt-5 pt-5">
                <Card>
                    <Card.Body>
                    <div className="m-4">
                        <form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" 
                                required
                                onChange={this.onChangeUsername}
                                value={this.state.username}
                                error={errors.username}
                                className={classnames("", {
                                    invalid: errors.username || errors.usernamenotfound
                                })}
                            />
                            <span className="red-text">{errors.username}{errors.usernamenotfound}</span>
                            <Form.Text className="text-muted">
                            Please enter your unique username.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" 
                                required
                                onChange={this.onChangePassword}
                                value={this.state.password}
                                error={errors.password}
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
                        </Form.Group>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="primary" type="submit">
                            Submit
                            </Button>
                        </div>
                        </form>
                        <div>
                        <span><a href="/register">Register Account</a></span>
                        </div>
                        
                    </div>
                    
                    </Card.Body>
                </Card>
                </Container>
        )
    }
}

UserLogin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
) (UserLogin);