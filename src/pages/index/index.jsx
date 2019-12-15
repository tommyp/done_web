import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CreateItem from "../../components/createItem";
import Item from "../../components/item";
import styles from "./index.module.scss";
import { currentDate } from "../../utils/currentDate";

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
  render() {
    return (
      <React.Fragment>
        <Query query={USER} key="1">
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return "Error";

            return (
              <h1>
                {data.profile.email}
              </h1>
            );
          }}
        </Query>

        <section>
          <CreateItem cacheQuery={LIST_ITEMS} />

          <Query query={LIST_ITEMS} variables={{ date: currentDate() }} key="2">
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return "Error";

              return (
                <React.Fragment>
                  <ul className={styles.itemList}>
                    {data.items.map(item => <Item item={item} key={item.id} />)}
                  </ul>
                </React.Fragment>
              );
            }}
          </Query>
        </section>
      </React.Fragment>
    );
  }
}
