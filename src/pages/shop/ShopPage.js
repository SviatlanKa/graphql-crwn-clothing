import React from 'react';
import { Route } from 'react-router-dom';
import { default as CollectionsOverview } from '../../components/collections-overview/CollectionsOverviewContainer';
import { default  as CollectionPage } from '../../pages/collection/CollectionPageContainer';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
