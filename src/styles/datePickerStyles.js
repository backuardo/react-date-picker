import styled from "styled-components";

export const Picker = styled.div`
  border-radius: 3px;
  box-shadow: 0 2px 15px 0 rgba(210, 214, 220, 0.6);
  width: 200px;
  margin: 0 auto;
  padding-bottom: 8px;
  color: #383e40;
`;

export const DateRange = styled.div`
  border: none;
  outline: none;
  font-family: inherit;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 18px;
  padding-top: 8px;

  :hover {
    cursor: pointer;
  }

  &.picking {
    background-color: #eff0fc;
    padding-bottom: 8px;
  }
`;

export const Calendar = styled.table`
  margin: 0 auto;
`;

export const DaysOfWeek = styled.tr`
  font-size: 12px;
`;

export const ArrowButton = styled.button`
  border: none;
  outline: none;
  margin: 9px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 3px;
  color: #383e40;

  :hover {
    cursor: pointer;
    outline: none;
    background-color: #9fa8ed;
    color: #ffffff;
  }
`;
