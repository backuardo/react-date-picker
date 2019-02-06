import React, { Component } from "react";
import styled from "styled-components";

const DayTile = styled.td`
  font-weight: bold;

  :hover {
    cursor: pointer;
  }

  &.past {
    color: lightgrey;
  }

  &.range {
    color: blue;
    background-color: lightblue;
  }

  &.selected {
    color: blue;
    background-color: lightblue;
  }
`;

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
