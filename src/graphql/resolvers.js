import { gql } from 'apollo-boost';
import {
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    getCartItemsCount,
    getCartTotal
} from "./cart.utils";

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    },
    extend type User {
        id: ID!,
        displayName: String!,
        email: String!,
        createdAt: DateTime!
    },
    extend type Mutation {
        ToggleCartHidden: Boolean!,
        AddItemToCart(item: Item!): [Item]!,
        RemoveItemFromCart(item: Item!): [Item]!,
        ClearItemFromCart(item: Item!): [Item]!,
        SetCurrentUser(user: User!): User!
    }
`;

export const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

export const GET_ITEMS_FROM_CART = gql`
    {
        cartItems @client
    }
`;

export const GET_CART_ITEMS_COUNT = gql`
    {
        itemsCount @client
    }
`;

export const GET_CART_TOTAL = gql`
    {
        cartTotal @client
    }
`;

export const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

const updateCartInCache = (cache, newCartItems) => {
    cache.writeQuery({
        query: GET_CART_ITEMS_COUNT,
        data: { itemsCount: getCartItemsCount(newCartItems)}
    });
    cache.writeQuery({
        query: GET_CART_TOTAL,
        data: { cartTotal: getCartTotal(newCartItems)}
    });
    cache.writeQuery({
        query: GET_ITEMS_FROM_CART,
        data: { cartItems: newCartItems }
    });
};

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });
            return !cartHidden;
        },
        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_ITEMS_FROM_CART
            });
            const newCartItems = addItemToCart(cartItems, item);
            updateCartInCache(cache, newCartItems);

            return newCartItems;
        },
        removeItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_ITEMS_FROM_CART
            });
            const newCartItems = removeItemFromCart(cartItems, item);
            updateCartInCache(cache, newCartItems);
            return newCartItems;
        },
        clearItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_ITEMS_FROM_CART
            });
            const newCartItems = clearItemFromCart(cartItems, item);
            updateCartInCache(cache, newCartItems);
            return newCartItems;
        },
        setCurrentUser: (_root, { user }, { cache }) => {
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user }
            });
            return user;
        }
    }
}

