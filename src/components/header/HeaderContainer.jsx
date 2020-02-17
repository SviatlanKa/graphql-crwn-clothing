import React from 'react';
import { Query } from 'react-apollo';
import { GET_CART_HIDDEN, GET_CURRENT_USER } from "../../graphql/resolvers";
import Header from "./Header";

const HeaderContainer = () => (
    <Query query={GET_CURRENT_USER}>
        {
            ({ data: { currentUser }}) => (
                <Query query={GET_CART_HIDDEN}>
                    {
                        ({ data: { cartHidden } }) =>
                            <Header currentUser={currentUser} hidden={cartHidden} />
                    }
                </Query>
            )
        }
    </Query>

);

export default HeaderContainer;

