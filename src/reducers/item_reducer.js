import { createReducer } from "redux-starter-kit";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from 'react';

const LIST_ITEMS = gql`
  {
    items {
      name
    }
  }
`

const itemReducer  = createReducer([], {
  LIST_ITEMS: (state, action) => {
    return <Query query={LIST_ITEMS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return "Error";

        return (
          <ul>
            {data.items.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
        )
      }}
    </Query>
  }
})

export { itemReducer }
