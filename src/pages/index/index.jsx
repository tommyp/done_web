import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const LIST_ITEMS = gql`
  {
    items {
      id
      name
      completed
    }
  }
`

const UPDATE_COMPLETED = gql`
  mutation UpdateCompleted($id: Int!) {
    updateCompleted(id: $id) {
      completed
    }
  }
`

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let input;
    return (
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
                      <input key={`chk-${item.id}`} type="checkbox"
                        checked={item.completed}
                        onChange={e => {
                          e.preventDefault()
                          updateCompleted({ variables: { completed: input.checked, id: item.id } })
                        }}
                        ref={node => {
                          input = node;
                        }}
                      />
                    )}
                  </Mutation>

                  {item.name}
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
    )
  }
}
