'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import NetshoesTemplate from './templates/Netshoes';

import ProductsContainer from './containers/ProductsContainer';
import NotFoundPage from './components/NotFoundPage';

const routes = (

  <Route path="/" component={NetshoesTemplate}>
    <IndexRoute component={ProductsContainer} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
