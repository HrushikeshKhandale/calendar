import PropTypes from 'prop-types';
import './styles/dateCell.css';

const DateCell = ({ date, events, onSelectDate, onSelectEvent, empty }) => {
  const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());

  return (
    <div className={`date-cell ${empty ? 'empty' : ''}`} onClick={() => !empty && onSelectDate(date)}>
      {!empty && <div className="date">{date.getDate()}</div>}
      {!empty && dayEvents.map(event => (
        <div
          key={event.id}
          className="event"
          style={{ backgroundColor: event.color }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectEvent(event);
          }}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
};

DateCell.propTypes = {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.arrayOf(PropTypes.object),
  onSelectDate: PropTypes.func.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  empty: PropTypes.bool,
};

DateCell.defaultProps = {
  date: new Date(),
  events: [],
  empty: false,
};

export default DateCell;
