import React, { Component } from 'react';
import AuthNavbar from "./navbarAuth.component";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class QuoteHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {history: []};
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return(
            <Container>
                <AuthNavbar />
            <div className="container">
                <h3>Quote History Page</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Gallons Requested</th>
                            <th>Delivery Address</th>
                            <th>Delivery Date</th>
                            <th>Suggested Price</th>
                            <th>Total Amount Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>250</td>
                            <td>1234 Test Drive</td>
                            <td>May 7 2021</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Container>
        )
    }
}

QuoteHistory.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {  }
) (withRouter(QuoteHistory));