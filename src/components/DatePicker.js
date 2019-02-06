import React, { Component } from "react";
import styled from "styled-components";
import Day from "./Day";
import getWeeklyData from "../lib/getWeeklyData";
import { MONTHS, DAYS } from "../constants";
import "./DatePicker.css";

const Calendar = styled.table`
  margin: 0 auto;
`;

class DatePicker extends Component {
  state = {
    start: null, // selected start date
    end: null, // selected end date
    now: new Date(), // current date
    sel: new Date(), // user's selected timeframe, offset from `now`
    hov: null // hovering date
  };

  // diff is the change in month -- should either be 1 or -1 ¯\_(ツ)_/¯
  updateSel = diff => {
    const newSel = this.state.sel;
    const currSelMonth = this.state.sel.getMonth();
    newSel.setMonth(currSelMonth + diff);
    this.setState({ sel: newSel });
  };

  // set start and end time
  updateStartOrEnd = day => {
    const month = this.state.sel.getMonth();
    const year = this.state.sel.getFullYear();
    const date = new Date(year, month, day);

    // check if date is in the past
    if (date < this.state.now) {
      return;
    }

    // check if we should set start or end date
    if (!this.state.start || (this.state.start && this.state.end)) {
      this.setState({ start: date, end: null });
    } else if (this.state.start && date < this.state.start) {
      this.setState({ start: date });
    } else {
      this.setState({ end: date });
    }
  };

  // update hovering date
  updateHov = day => {
    const month = this.state.sel.getMonth();
    const year = this.state.sel.getFullYear();
    const date = new Date(year, month, day);

    // check if date is in the past
    if (date < this.state.now) {
      return;
    }

    // check if start & end already selected
    if (this.state.start && this.state.end) {
      return;
    }

    this.setState({ hov: date });
  };

  // get className for given day
  getDateStyle = day => {
    if (!day) return "";

    const date = new Date(
      this.state.sel.getFullYear(),
      this.state.sel.getMonth(),
      day
    );
    const dateTime = date.getTime();
    const hovTime = this.state.hov && this.state.hov.getTime();
    const startTime = this.state.start && this.state.start.getTime();
    const endTime = this.state.end && this.state.end.getTime();

    if (date < this.state.now) {
      return "past"; // invalid selection
    } else if (dateTime === startTime || dateTime === endTime) {
      return "selected"; // selected start or end dates
    } else if (startTime < dateTime && dateTime < endTime) {
      return "range"; // between start and end dates
    } else if (startTime && startTime < dateTime && dateTime < hovTime) {
      return "range"; // between start and hover dates
    } else {
      return "";
    }
  };

  render() {
    return (
      <div className="container">
        <button onClick={e => this.updateSel(-1)}>-</button>
        <button onClick={e => this.updateSel(1)}>+</button>
        <Calendar>
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
                    hovering={this.updateHov}
                    status={this.getDateStyle(day[1])}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </Calendar>
      </div>
    );
  }
}

export default DatePicker;
