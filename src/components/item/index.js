import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const UPDATE_COMPLETED = gql`
  mutation UpdateCompleted($id: Int!, $completed: Boolean!) {
    updateCompleted(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export default class extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <li key={item.id}>
        <Mutation mutation={UPDATE_COMPLETED}>
          {(updateCompleted, { data }) => (
            <input
              key={`chk-${item.id}`}
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
            />
          )}
        </Mutation>

        {item.name}
      </li>
    );
  }
}
