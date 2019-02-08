import styled from "styled-components";

export const DayTile = styled.td`
  border: solid 1px #eff0fc;
  border-radius: 3px;

  :hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.past {
    color: #e9e9e9;
    border: solid 1px #eff0fc;
  }

  &.range {
    color: #383e40;
    background-color: #cfd3f6;
    border: solid 1px #cfd3f6;
    font-weight: bold;
  }

  &.selected {
    color: #383e40;
    background-color: #9fa8ed;
    font-weight: bold;
    border: solid 1px #9fa8ed;
  }

  &.none {
    border: none;
    color: #383e40;
  }

  &.none:hover {
    cursor: default;
  }
`;
