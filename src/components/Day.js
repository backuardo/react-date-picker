import React, { Component } from "react";
import { DayTile } from "../styles/dayStyles";

class Day extends Component {
  render() {
    return (
      <DayTile
        className={this.props.status}
        onClick={e => this.props.selectDate(this.props.day)}
        onMouseOver={e => this.props.hovering(this.props.day)}
      >
        <span>{this.props.day}</span>
      </DayTile>
    );
  }
}

export default Day;
