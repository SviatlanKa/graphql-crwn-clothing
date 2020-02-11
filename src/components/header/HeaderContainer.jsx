import React from 'react';
import { Query } from 'react-apollo';
import { GET_CART_HIDDEN } from "../../graphql/resolvers";
import Header from "./Header";

const HeaderContainer = () => (
    <Query query={GET_CART_HIDDEN}>
        {
            ({ data }) => {
                return <Header hidden={data.cartHidden}/>
            }
        }

    </Query>
);

export default HeaderContainer;
