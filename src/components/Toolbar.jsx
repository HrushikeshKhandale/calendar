import PropTypes from 'prop-types';
import './styles/toolbar.css';
import { useState } from 'react';

const Toolbar = ({ currentDate, onDateChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of the day
    onDateChange(today);
  };

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split('-').map(Number);
    const newDate = new Date(year, month - 1, 1);
    onDateChange(newDate);
  };

  return (
    <div className="toolbar">
      <div className="left">
        <p onClick={() => setShowDatePicker(!showDatePicker)}>
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        {showDatePicker && (
          <input
            type="month"
            value={currentDate.toISOString().substr(0, 7)}
            onChange={handleDateChange}
            style={{ position: 'absolute', top: '40px', left: '0' }}
          />
        )}
      </div>
      <div className="right">
        <button onClick={handlePrevMonth}>&lt;</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default Toolbar;
