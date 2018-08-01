import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; // To connect component with redux // and don't forget to wrap in export
import asyncComponent from './hoc/asyncComponent/asyncComponent'; // Use lazy loading component

import * as actions from './store/actions/index';

// Using Normal Component
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

// Using Lazy loading to Component
// Lazy loading is way to load component when it's needed
// Lazy loading Checkout Component
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});

// Lazy loading Orders Component
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

// Lazy loading Auth Component
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
