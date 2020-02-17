import React from 'react';
import { Query } from 'react-apollo';
import { gql } from "apollo-boost";
import CheckoutPage from './CheckoutPage';

const GET_ITEMS_AND_TOTAL_FROM_CART = gql`
    {
        cartItems @client
        cartTotal @client
    }`;


const CheckoutPageContainer = () => (
    <Query query={GET_ITEMS_AND_TOTAL_FROM_CART}>
        {
            ({ data: { cartItems, cartTotal }}) => (
                <CheckoutPage cartItems={cartItems} total={cartTotal} />

            )
        }
    </Query>
);

export default CheckoutPageContainer;