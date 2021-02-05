import React from 'react';
import ReactDOM from 'react-dom';
import { stores, StoreContext } from '@src/stores';

import Routers from './router';

ReactDOM.render(
  <StoreContext.Provider value={stores}>
    {Routers}
  </StoreContext.Provider>,
  document.getElementById('root')
);