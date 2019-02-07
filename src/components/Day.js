import React, { Component } from "react";
import styled from "styled-components";

const DayTile = styled.td`
  border: solid 1px #eff0fc;
  border-radius: 3px;

  :hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.past {
    color: lightgrey;
  }

  &.range {
    color: #111111;
    background-color: #cfd3f6;
  }

  &.selected {
    color: #111111;
    background-color: #9fa8ed;
  }

  &.none {
    border: none;
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
