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
  mutation UpdateCompleted($id: Int!, $completed: Boolean!) {
    updateCompleted(id: $id, completed: $completed) {
      id
      completed
    }
  }
`

const CREATE_ITEM = gql`
  mutation CreateItem($name: String!) {
    createItem(name: $name) {
      id
      name
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
      <React.Fragment>
        <Mutation
          mutation={CREATE_ITEM}
          update={(cache, { data: { createItem } }) => {
            const { items } = cache.readQuery({ query: LIST_ITEMS });
            cache.writeQuery({
              query: LIST_ITEMS,
              data: { items: items.concat([createItem]) },
            })
          }}
        >
          {createItem => (
            <React.Fragment>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  createItem({ variables: { name: input.value } })
                  input.value = "";
                }}
              >
                <input
                  ref={node => {
                    input = node;
                  }}
                />
                <button type="submit">Submit</button>
              </form>
            </React.Fragment>
          )}
        </Mutation>

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
                            updateCompleted({ variables: { completed: !item.completed, id: item.id } })
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
      </React.Fragment>
    )
  }
}
