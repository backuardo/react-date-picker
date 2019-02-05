import React, { Component } from "react";
import "./Day.css";

class Day extends Component {
  render() {
    return (
      <td
        onClick={e => this.props.selectDate(this.props.day)}
        onMouseOver={e => this.props.hovering(this.props.day)}
      >
        <span className={this.props.status}>{this.props.day}</span>
      </td>
    );
  }
}

export default Day;
