import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styles from "./item.module.scss";
import { currentDate } from "../../utils/currentDate";

const UPDATE_ITEM_COMPLETED = gql`
  mutation UpdateItemCompleted($id: Int!, $completed: Boolean!) {
    updateItemCompleted(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);

    const { item } = this.props;

    this.state = {
      isHovering: false,
      isEditing: false,
      item: item
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
      return <strike>{item.name}</strike>;
    } else {
      return item.name;
    }
  }

  toggleCompletedIcon(status) {
    if (status) {
      return (
        <span role="img" aria-label="Undone">
          ❌
        </span>
      );
    } else {
      return (
        <span role="img" aria-label="Done">
          ✅
        </span>
      );
    }
  }

  actions(item) {
    return (
      <ul className="actions">
        <li>
          <Mutation mutation={UPDATE_ITEM_COMPLETED}>
            {(updateCompleted, { data }) => (
              <button
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    item: {
                      ...this.state.item,
                      completed: !this.state.item.completed
                    }
                  });
                  updateCompleted({
                    variables: {
                      completed: !item.completed,
                      id: item.id
                    }
                  });
                }}
              >
                {this.toggleCompletedIcon(item.completed)}
              </button>
            )}
          </Mutation>
        </li>
        <li>
          <button
            onClick={e => {
              e.preventDefault();
              this.setState({ isEditing: true });
            }}
          >
            <span role="img" aria-label="Edit">
              ✏️
            </span>
          </button>
        </li>
        <li>
          <Mutation
            mutation={DELETE_ITEM}
            update={(cache, { data: deleteItem }) => {
              const date = currentDate();
              const { items } = cache.readQuery({
                query: this.props.cacheQuery,
                variables: { date: date }
              });

              const idx = items.indexOf(deleteItem);

              cache.writeQuery({
                query: this.props.cacheQuery,
                data: { items: items.splice(idx, 1) },
                variables: { date: date }
              });
            }}
          >
            {(deleteItem, { data }) => (
              <button
                onClick={e => {
                  e.preventDefault();
                  deleteItem({
                    variables: {
                      id: item.id
                    }
                  });
                }}
              >
                <span role="img" aria-label="Delete">
                  🗑
                </span>
              </button>
            )}
          </Mutation>
        </li>
      </ul>
    );
  }

  changeItem(e) {
    this.setState({ itemName: e.target.value });
  }

  editItem(item) {
    return (
      <input
        className="editItem"
        type="text"
        value={item.name}
        onChange={this.changeItem}
      />
    );
  }

  render() {
    const item = this.state.item;

    return (
      <li
        className={styles.item}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {!this.state.isEditing && this.itemName(item)}
        {this.state.isEditing && this.editItem(item)}
        {this.state.isHovering && this.actions(item)}
      </li>
    );
  }
}
