import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_CART_ITEMS_COUNT } from "../../graphql/resolvers";
import CartIcon from "./CartIcon";

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const CartIconContainer = () => (
    <Query query={GET_CART_ITEMS_COUNT}>
        {
            ({ data: { itemsCount }}) => (
                <Mutation mutation={TOGGLE_CART_HIDDEN}>
                    {
                        toggleCartHidden => <CartIcon itemsCount={itemsCount} toggleCartHidden={toggleCartHidden}/>
                    }
                </Mutation>
            )
        }
    </Query>
);

export default CartIconContainer;