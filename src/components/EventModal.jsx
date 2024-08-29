import  { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/eventModal.css';

const EventModal = ({ onClose, onSave, selectedDate, selectedEvent, onDelete }) => {
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [resource, setResource] = useState(selectedEvent ? selectedEvent.resource : '');

  const handleSave = () => {
    onSave(selectedDate, resource, title);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Resource"
          value={resource}
          onChange={(e) => setResource(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>{selectedEvent ? 'Update' : 'Save'}</button>
          {selectedEvent && <button onClick={() => { onDelete(selectedEvent.id); onClose(); }}>Delete</button>}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  selectedEvent: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
};

EventModal.defaultProps = {
  selectedEvent: null,
};

export default EventModal;
