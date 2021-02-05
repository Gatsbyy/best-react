import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { enumRouterPath } from '@enum/enumRouter';
import LoadableComponent from '@components/LoadableComponent'

import App from './App';

const routeMap = [
  {
    path: enumRouterPath.Home,
    Component: () => { return import('@containers/Home') },
    exact: true
  },
  {
    path: enumRouterPath.About,
    Component: () => { return import('@containers/About') },
    exact: true
  },
  {
    path: enumRouterPath.Detail,
    Component: () => { return import('@containers/Detail') },
    exact: true
  },
  {
    Component: () => { return import('@containers/NotMatch') },
  }
];

const Routers = (
  <BrowserRouter basename='/base'>
    <App>
      <Switch>
        {
          routeMap.map((route, index) => {
            const { path, Component, exact } = route;
            const Page = LoadableComponent(Component);
            return (
              <Route
                key={index}
                exact={exact}
                path={path}
              >
                <Page />
              </Route>
            );
          })
        }
      </Switch>
    </App>
  </BrowserRouter>
);

export default Routers;