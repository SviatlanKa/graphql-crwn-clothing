import { gql } from 'apollo-boost';
import { addItemToCart } from "./cart.utils";

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    },
    extend type Mutation {
        ToggleCartHidden: Boolean!,
        AddItemToCart(item: Item!): [Item]
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
            cache.writeQuery({
                query: GET_ITEMS_FROM_CART,
                data: { cartItems: newCartItems }
            });
            return newCartItems;
        }
    }
}

