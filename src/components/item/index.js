import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styles from "./item.module.scss";

const UPDATE_COMPLETED = gql`
  mutation UpdateCompleted($id: Int!, $completed: Boolean!) {
    updateCompleted(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export default class extends React.Component {
  itemName(item) {
    if (item.completed) {
      return (
        <strike>
          {item.name}
        </strike>
      );
    } else {
      return item.name;
    }
  }

  render() {
    const { item } = this.props;

    return (
      <li className={styles.item}>
        <Mutation mutation={UPDATE_COMPLETED}>
          {(updateCompleted, { data }) =>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={e => {
                e.preventDefault();
                updateCompleted({
                  variables: {
                    completed: !item.completed,
                    id: item.id
                  }
                });
              }}
            />}
        </Mutation>
        {this.itemName(item)}
      </li>
    );
  }
}
