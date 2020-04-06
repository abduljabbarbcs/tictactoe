import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../utils/routes';

const Routes = () => {
  const renderRoutes = () => {
    return routes.map((route, key) => {
      return <Route key={key} exact={route.exact} path={route.path}>{route.component}</Route>
    })
  }
  return <Switch>{renderRoutes()}</Switch>
}

export default Routes;