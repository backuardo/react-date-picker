import React, { Component } from "react";
import Day from "./Day";
import getWeeklyData from "../lib/getWeeklyData";
import { MONTHS, DAYS } from "../constants";
import "./DatePicker.css";

// TODO: track which <td> the mouse is on to style the range

class DatePicker extends Component {
  state = {
    start: null, // selected start date
    end: null, // selected end date
    now: new Date(), // current date
    sel: new Date() // user's selected timeframe, offset from `now`
  };

  // diff is the change in month -- should either be 1 or -1 ¯\_(ツ)_/¯
  updateSel = diff => {
    const newSel = this.state.sel;
    const currSelMonth = this.state.sel.getMonth();
    newSel.setMonth(currSelMonth + diff);
    this.setState({ sel: newSel });

    console.log(getWeeklyData(this.state.sel));
  };

  // set start and end time
  // TODO: make sure start < end
  updateStartOrEnd = day => {
    const month = this.state.sel.getMonth();
    const year = this.state.sel.getFullYear();
    const date = new Date(year, month, day);

    // check if we should set start or end date
    if (!this.state.start || (this.state.start && this.state.end)) {
      this.setState({ start: date, end: null });
    } else {
      this.setState({ end: date });
    }
  };

  // get style for date
  // TODO: handle "in range"
  getDateStyle = day => {
    const date = new Date(
      this.state.sel.getFullYear(),
      this.state.sel.getMonth(),
      day
    );

    if (this.state.start && date.getTime() === this.state.start.getTime()) {
      return "selected";
    }
    if (this.state.end && date.getTime() === this.state.end.getTime()) {
      return "selected";
    }
    if (date < this.state.now) {
      return "past";
    }

    return "";
  };

  render() {
    return (
      <div className="container">
        <button onClick={e => this.updateSel(-1)}>-</button>
        <button onClick={e => this.updateSel(1)}>+</button>
        <table className="calendar">
          {/*MO, YR*/}
          <caption>
            {MONTHS[this.state.sel.getMonth()]}, {this.state.sel.getFullYear()}
          </caption>
          <tbody>
            {/* Su Mo Tu We Th Fr Sa */}
            <tr>
              {DAYS.map(day => (
                <td key={day}>{day}</td>
              ))}
            </tr>
            {/* days in the month */}
            {getWeeklyData(this.state.sel).map(week => (
              <tr key={week[0][1]}>
                {week.map((day, i) => (
                  <Day
                    key={i}
                    day={day[1]}
                    selectDate={this.updateStartOrEnd}
                    status={this.getDateStyle(day[1])}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DatePicker;
