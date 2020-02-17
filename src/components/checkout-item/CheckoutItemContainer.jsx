import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import CheckoutItem from "./CheckoutItem";

const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($item: Item!) {
        removeItemFromCart(item: $item) @client
    }
`;

const CLEAR_ITEM_FROM_CART = gql`
    mutation ClearItemFromCart($item: Item!) {
        clearItemFromCart(item: $item) @client
    }
`;

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`;

const CheckoutItemContainer = (props) => {
    console.log(props);
    return (
    <Mutation mutation={REMOVE_ITEM_FROM_CART}>
        {
            removeItemFromCart => (
                <Mutation mutation={CLEAR_ITEM_FROM_CART}>
                    {
                        clearItemFromCart => (
                            <Mutation mutation={ADD_ITEM_TO_CART}>
                                {
                                    addItemToCart => (
                                        <CheckoutItem
                                            {...props}
                                            clearItem={item => clearItemFromCart({ variables: { item }})}
                                            addItem={item => addItemToCart({ variables: { item }})}
                                            removeItem={item => removeItemFromCart({ variables: { item }})}
                                        />
                                    )
                                }
                            </Mutation>
                        )
                    }
                </Mutation>
            )
        }
    </Mutation>
);}

export default CheckoutItemContainer;