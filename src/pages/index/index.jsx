import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const LIST_ITEMS = gql`
  {
    items {
      name
    }
  }
`

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Query query={LIST_ITEMS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return "Error";

          return (
            <ul>
              {data.items.map(item => (
                <li>{item.name}</li>
              ))}
            </ul>
          )
        }}
      </Query>
    )
  }
}
