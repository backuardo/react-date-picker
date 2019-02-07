import React, { Component } from "react";
import styled from "styled-components";
import DatePicker from "./DatePicker";

const AppContainer = styled.div`
  text-align: center;
`;

class App extends Component {
  state = {
    start: "Start date",
    end: "End date"
  };

  updateTimes = (start, end) => {
    this.setState({ start, end });
  };

  render() {
    return (
      <AppContainer>
        <h1>DATE-PICKER</h1>
        <DatePicker update={this.updateTimes} />
      </AppContainer>
    );
  }
}

export default App;
