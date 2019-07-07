import React from "react";
import { listItems } from "../../actions";
import { connect } from "net";

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    // dispatchEvent(listItems);

    // connect(mapStateToProps, mapDispatchToProps)()
  }

  // mapDispatchToProps{ listItems }

  render() {
    return (
      <ul>
        {this.state.items.map(item => (
          <li>{item.name}</li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.data.items
  }
}

export default connect(mapStateToProps)(List)
