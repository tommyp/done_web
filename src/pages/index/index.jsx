import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import CreateItem from "../../components/createItem";

const LIST_ITEMS = gql`
  {
    items {
      id
      name
      completed
    }
  }
`;

const UPDATE_COMPLETED = gql`
  mutation UpdateCompleted($id: Int!, $completed: Boolean!) {
    updateCompleted(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

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
                ))}
              </ul>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
