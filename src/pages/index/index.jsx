import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CreateItem from "../../components/createItem";
import Item from "../../components/item";

const LIST_ITEMS = gql`
  {
    items {
      id
      name
      completed
    }
  }
`;

export default class extends React.Component {

  render() {
    return (
      <React.Fragment>
        <CreateItem cacheQuery={LIST_ITEMS} />

        <Query query={LIST_ITEMS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return "Error";

            return (
              <ul>
                {data.items.map(item => (
                  <Item item={item} />
                ))}
              </ul>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
