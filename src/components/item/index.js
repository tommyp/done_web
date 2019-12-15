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
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

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

  toggleCompletedIcon(status) {
    if (status) {
      return "❌";
    } else {
      return "✅";
    }
  }

  actions(item) {
    return (
      <ul className="actions">
        <li>
          <Mutation mutation={UPDATE_COMPLETED}>
            {(updateCompleted, { data }) =>
              <button
                onClick={e => {
                  e.preventDefault();
                  updateCompleted({
                    variables: {
                      completed: !item.completed,
                      id: item.id
                    }
                  });
                }}
              >
                {this.toggleCompletedIcon(item.completed)}
              </button>}
          </Mutation>
        </li>
      </ul>
    );
  }

  render() {
    const { item } = this.props;

    return (
      <li
        className={styles.item}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {this.itemName(item)}
        {this.state.isHovering && this.actions(item)}
      </li>
    );
  }
}
