import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CreateItem from "../../components/createItem";
import Item from "../../components/item";

const USER = gql`
  {
    profile {
      email
    }
  }
`;

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
        <Query query={USER} key="1">
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return "Error";

            return <h1>{data.profile.email}</h1>;
          }}
        </Query>

        <CreateItem cacheQuery={LIST_ITEMS} />

        <Query query={LIST_ITEMS} key="2">
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return "Error";

            return (
              <React.Fragment>
                <ul>
                  {data.items.map(item => (
                    <Item item={item} key={item.id} />
                  ))}
                </ul>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
