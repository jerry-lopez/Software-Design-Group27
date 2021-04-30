import React, { Component } from 'react';
import { BrowserRouter as Router, 
  Route,
  Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//Needed for Redux
import { Provider } from "react-redux";
import store from "./store";

//Pages
//import RegisterPage from "./pages/register";
//import ProfilePage from "./pages/profile";

//Components
import UserLogin from "./components/login-component";
import NewFuelQuote from "./components/fuelQuote.component";
import QuoteHistory from "./components/quoteHistory.component";
import RegisterPage from "./components/register.component";
import ProfilePage from "./components/profile.component";
import PrivateRoute from "./components/private-route/privateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header
  const token = localStorage.jwtToken;
  setAuthToken(token);
  
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // Get back the time in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={UserLogin} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
            <PrivateRoute exact path="/newForm/:id" component={NewFuelQuote} />
            <PrivateRoute path="/quoteHistory" component={QuoteHistory} />
          </Switch>
        </Router>
      </Provider>
      
      
    );
  }
}


export default App;
