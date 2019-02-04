import React, { Component } from "react";
import getWeeklyData from "../lib/getWeeklyData";
import { MONTHS, DAYS } from "../constants";
import "./DatePicker.css";

class DatePicker extends Component {
  state = {
    start: null, // selected start date
    end: null, // selected end date
    now: new Date(), // current date
    sel: new Date() // user's selected timeframe
  };

  // diff is the change in month -- should either be 1 or -1 ¯\_(ツ)_/¯
  updateMonth = diff => {
    const newSel = this.state.sel;
    const currSelMonth = this.state.sel.getMonth();
    newSel.setMonth(currSelMonth + diff);
    this.setState({ sel: newSel });

    console.log(getWeeklyData(this.state.sel));
  };

  render() {
    return (
      <div className="container">
        <button onClick={e => this.updateMonth(-1)}>-</button>
        <button onClick={e => this.updateMonth(1)}>+</button>
        <table className="calendar">
          <caption>
            {MONTHS[this.state.sel.getMonth()]}, {this.state.sel.getFullYear()}
          </caption>
          <tbody>
            {/* days of the week - column names */}
            <tr>
              {DAYS.map(day => {
                return <td key={day}>{day}</td>;
              })}
            </tr>
            {/* dates in the month - rows */}
            {getWeeklyData(this.state.sel).map(week => (
              <tr key={week[0][1]}>
                {week.map((day, i) => {
                  // TODO: make this td its own component!
                  return (
                    <td key={i}>
                      <span>{day[1]}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DatePicker;
