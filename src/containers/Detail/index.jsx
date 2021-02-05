import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { generateUrl } from '@utils/routerHelper';
import { enumTab } from '@enum/enumRouter';

import Address from './Address'
import Trade from './Trade'

function Detail() {
  const { symbol, address } = useParams();

  return (
    <Switch>
      <Route exact path={generateUrl({ symbol, address, tab: enumTab.Address })} component={Address} />
      <Route exact path={generateUrl({ symbol, address, tab: enumTab.Trade })} component={Trade} />
    </Switch>
  )
}

export default Detail;