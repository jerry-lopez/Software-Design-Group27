import React, { Component } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class AuthNavbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        return (
            <Container fluid="true"> 
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Fuel Quote App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/newForm">New Quote</Nav.Link>
                    <Nav.Link href="/quoteHistory">Quote History</Nav.Link>
                    <Nav.Link href="#" onClick={this.onLogoutClick}>Logout</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

AuthNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
) (AuthNavbar);