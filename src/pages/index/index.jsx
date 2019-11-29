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
  query items($date: Date) {
    items(date: $date) {
      id
      name
      completed
    }
  }
`;

export default class extends React.Component {
  date() {
    const date = new Date()
    return date.getFullYear() + '-' +
           ('0'+ (date.getMonth()+1)).slice(-2) + '-' +
           ('0'+ date.getDate()).slice(-2);
  }

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

        <Query query={LIST_ITEMS} variables={{date: this.date()}} key="2">
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
