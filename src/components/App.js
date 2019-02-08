import React, { Component } from "react";
import styled from "styled-components";
import DatePicker from "./DatePicker";

const AppContainer = styled.div`
  text-align: center;
`;

class App extends Component {
  state = {
    start: null,
    end: null
  };

  updateTimes = (start, end) => {
    this.setState({ start, end });
  };

  render() {
    return (
      <AppContainer>
        <h1>date-picker</h1>
        <DatePicker handleUpdate={this.updateTimes} />
      </AppContainer>
    );
  }
}

export default App;
