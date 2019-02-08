import React, { Component } from "react";
import Day from "./Day";
import {
  Picker,
  DateRange,
  Calendar,
  DaysOfWeek,
  ArrowButton
} from "../styles/datePickerStyles";
import getWeeklyData from "../lib/getWeeklyData";
import { MONTHS, DAYS } from "../constants";

class DatePicker extends Component {
  state = {
    start: null, // selected start date
    end: null, // selected end date
    now: new Date(), // current date
    sel: new Date(), // user's selected timeframe, offset from `now`
    hov: null, // hovering date
    picking: false // for opening calendar view
  };

  // diff is the change in month -- should either be 1 or -1 ¯\_(ツ)_/¯
  updateSel = diff => {
    const newSel = this.state.sel;
    const currSelMonth = this.state.sel.getMonth();
    newSel.setMonth(currSelMonth + diff);
    this.setState({ sel: newSel });
  };

  // set start and end time in state, then lift up to parent
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
      this.props.handleUpdate(date, null);
    } else if (this.state.start && date < this.state.start) {
      this.setState({ start: date });
      this.props.handleUpdate(date, null);
    } else {
      this.setState({ end: date });
      this.props.handleUpdate(this.state.start, date);
      this.updatePicking(); // user is done picking
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

  // update picking - whether the user is viewing calendar
  updatePicking = () => {
    this.setState({ picking: !this.state.picking });
  };

  // get className for given day
  getDateStyle = day => {
    if (!day) return "none";

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
    } else if (startTime && startTime < dateTime && dateTime <= hovTime) {
      return "range"; // between start and hover dates
    } else {
      return "";
    }
  };

  render() {
    const dateFormatOptions = { month: "short", day: "numeric" };
    return (
      <Picker>
        {/* start → end */}
        <DateRange
          onClick={this.updatePicking}
          className={this.state.picking && "picking"}
        >
          {this.state.start
            ? this.state.start.toLocaleDateString("en-US", dateFormatOptions)
            : "Start"}
          {"  →  "}
          {this.state.end
            ? this.state.end.toLocaleDateString("en-US", dateFormatOptions)
            : "End"}
        </DateRange>

        {this.state.picking && (
          <Calendar>
            {/*MO, YR*/}
            <caption>
              <ArrowButton onClick={e => this.updateSel(-1)}>‹</ArrowButton>
              {MONTHS[this.state.sel.getMonth()]},{" "}
              {this.state.sel.getFullYear()}
              <ArrowButton onClick={e => this.updateSel(1)}>›</ArrowButton>
            </caption>
            <tbody>
              {/* Su Mo Tu We Th Fr Sa */}
              <DaysOfWeek>
                {DAYS.map(day => (
                  <td key={day}>{day}</td>
                ))}
              </DaysOfWeek>
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
        )}
      </Picker>
    );
  }
}

export default DatePicker;
