import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '@containers/Home';
import About from '@containers/About';

import App from './App';

const routeMap = [
  {
    path: '/',
    Component: Home,
    exact: true
  },
  {
    path: '/about',
    Component: About,
    exact: true
  }
];

const Routers = (
  <BrowserRouter basename='/base'>
    <App>
      <Switch>
        {
          routeMap.map((route, index) => {
            const { path, Component, exact} = route;
            return (
              <Route
                key={index}
                exact={exact}
                path={path}
              >
                <Component />
              </Route>
            );
          })
        }
      </Switch>
    </App>
  </BrowserRouter>
);

export default Routers;