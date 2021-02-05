import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '@containers/Home';
import About from '@containers/About';
import Detail from '@containers/Detail';
import NotMatch from '@containers/NotMatch'

import { enumRouterPath } from '@enum/enumRouter';

import App from './App';

const routeMap = [
  {
    path: enumRouterPath.Home,
    Component: Home,
    exact: true
  },
  {
    path: enumRouterPath.About,
    Component: About,
    exact: true
  },
  {
    path: enumRouterPath.Detail,
    Component: Detail,
    exact: true
  },
  {
    Component: NotMatch,
  }
];

const Routers = (
  <BrowserRouter basename='/base'>
    <App>
      <Switch>
        {
          routeMap.map((route, index) => {
            const { path, Component, exact } = route;
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