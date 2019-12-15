import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styles from "./createItem.module.scss";
import { currentDate } from "../../utils/currentDate";

const CREATE_ITEM = gql`
  mutation CreateItem($name: String!) {
    createItem(name: $name) {
      id
      name
      completed
    }
  }
`;

export default class extends React.Component {
  render() {
    let input;
    return (
      <Mutation
        mutation={CREATE_ITEM}
        update={(cache, { data: { createItem } }) => {
          const { items } = cache.readQuery({
            query: this.props.cacheQuery,
            variables: { date: currentDate() }
          });
          cache.writeQuery({
            query: this.props.cacheQuery,
            data: { items: items.concat([createItem]) },
            variables: { date: currentDate() }
          });
        }}
      >
        {createItem =>
          <React.Fragment>
            <form
              className={styles.createItem}
              onSubmit={e => {
                e.preventDefault();
                createItem({ variables: { name: input.value } });
                input.value = "";
              }}
            >
              <input
                type="text"
                ref={node => {
                  input = node;
                }}
              />
              <button type="submit">Submit</button>
            </form>
          </React.Fragment>}
      </Mutation>
    );
  }
}
