import React, { Component } from "react";
import DatePicker from "./DatePicker";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>DATE-PICKER</h1>
        <DatePicker />
      </div>
    );
  }
}

export default App;
