import PropTypes from 'prop-types';
import './styles/event.css';

const Event = ({ event }) => {
  return (
    <div className="event" style={{ backgroundColor: event.color }}>
      <div className="event-title">{event.title}</div>
      <div className="event-time">{event.time}</div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    time: PropTypes.string,
  }).isRequired,
};

export default Event;
