import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import CartDropdown from './CartDropdown';
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const ADD_ITEM_TO_CART = gql`
    {
        cartItems @client
    }
`;

const CartDropdownContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>{
        toggleCartHidden => (
            <Query query={ADD_ITEM_TO_CART}>
                {
                    ({ data: { cartItems } }) => (
                        <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden}/>
                    )
                }
            </Query>
        )
    }
    </Mutation>
);

export default CartDropdownContainer;