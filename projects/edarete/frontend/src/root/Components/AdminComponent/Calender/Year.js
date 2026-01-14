import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
const localizer = BigCalendar.momentLocalizer(moment);

function createCalendar(currentDate) {
  if (!currentDate) {
    currentDate = moment();
  } else {
    currentDate = moment(currentDate);
  }

  const first = currentDate.clone().startOf('month');
  const last = currentDate.clone().endOf('month');
  const weeksCount = Math.ceil((first.day() + last.date()) / 7);
  const calendar = Object.assign([], { currentDate, first, last });

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
    const week = [];
    calendar.push(week);
    calendar.year = currentDate.year();
    calendar.month = currentDate.month();

    for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
      const date = currentDate.clone().set('date', day + 1 - first.day());
      date.calendar = calendar;
      week.push(date);
    }
  }

  return calendar;
}

function CalendarDate(props) {
  const { dateToRender, dateOfMonth } = props;
  const today =
    dateToRender.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'today'
      : '';

  if (dateToRender.month() < dateOfMonth.month()) {
    return (
      <button disabled={true} className="date prev-month">
        {dateToRender.date()}
      </button>
    );
  }

  if (dateToRender.month() > dateOfMonth.month()) {
    return (
      <button disabled={true} className="date next-month">
        {dateToRender.date()}
      </button>
    );
  }

  return (
    <button
      className={`date in-month ${today}`}
      onClick={() => props.onClick(dateToRender)}
    >
      {dateToRender.date()}
    </button>
  );
}

class CalendarComponent extends React.Component {
  state = {
    calendar: undefined,
  };

  componentDidMount() {
    this.setState({ calendar: createCalendar(this.props.date) });
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ calendar: createCalendar(this.props.date) });
    }
  }

  render() {
    if (!this.state.calendar) {
      return null;
    }

    return (
      <div className="month">
        <div className="month-name">
          {this.state.calendar.currentDate.format('MMMM').toUpperCase()}
        </div>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span key={index} className="day">
            {day}
          </span>
        ))}
        {this.state.calendar.map((week, index) => (
          <div key={index}>
            {week.map((date) => (
              <CalendarDate
                key={date.date()}
                dateToRender={date}
                dateOfMonth={this.state.calendar.currentDate}
                onClick={this.props.onDateClick}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

class Year extends React.Component {
  render() {
    let { date, ...props } = this.props;
    let range = Year.range(date);
    const months = [];
    const firstMonth = BigCalendar.startOf(date, 'year'); 

    for (let i = 0; i < 12; i++) {
      months.push(
        <CalendarComponent
          key={i + 1}
          date={BigCalendar.add(firstMonth, i, 'month')} 
          onDateClick={(date) =>
            alert(`Will go to daily-view of ${date.format('YYYY-MM-DD')}`)
          }
        />
      );
    }

    return <div className="year">{months.map((month) => month)}</div>;
  }
}

Year.range = (date) => {
  return [BigCalendar.startOf(date, 'year')];
};

Year.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.navigate.PREVIOUS:
      return BigCalendar.add(date, -1, 'year');

    case BigCalendar.navigate.NEXT:
      return BigCalendar.add(date, 1, 'year');

    default:
      return date;
  }
};

Year.title = (date) => moment(date).format('YYYY');

export default Year;
