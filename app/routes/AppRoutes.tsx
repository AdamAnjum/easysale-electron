import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import ProductPage from '../pages/ProductPage';


const ContainerRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
);

class AppRoute extends React.Component {

  render() {

    return (
      <AppLayout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <ContainerRoute path="/dashboard" component={DashboardPage} />
          <ContainerRoute path="/product" component={ProductPage} />
          <Redirect from='*' to='/not-found' />
        </Switch>
      </AppLayout>
    );
  }
}

export default AppRoute;
