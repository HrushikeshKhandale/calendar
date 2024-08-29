import PropTypes from 'prop-types';
import './styles/alertPopup.css';

const AlertPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="alert-popup">
      <div className="alert-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this event?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

AlertPopup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AlertPopup;
