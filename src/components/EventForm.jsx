import   { useState } from "react";
import PropTypes from "prop-types";

const EventForm = ({ event, date, onAdd, onEdit, onDelete, onClose, style }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(event ? event.description : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: event ? event.id : Date.now(),
      title,
      description,
      date
    };
    if (event) {
      onEdit(newEvent);
    } else {
      onAdd(newEvent);
    }
  };

  const handleDelete = () => {
    if (event) {
      onDelete(event.id);
    }
  };

  return (
    <div className="event-form" style={style}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{event ? "Edit Event" : "Add Event"}</button>
        {event && <button type="button" onClick={handleDelete}>Delete Event</button>}
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

EventForm.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  date: PropTypes.instanceOf(Date),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  style: PropTypes.object,
};

EventForm.defaultProps = {
  event: null,
  date: new Date(),
  style: {},
};

export default EventForm;


// import { useState } from "react";
// import PropTypes from "prop-types";

// const EventForm = ({ event, date, onAdd, onEdit, onDelete, onClose }) => {
//   const [title, setTitle] = useState(event ? event.title : "");
//   const [color, setColor] = useState(event ? event.color : "");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (event) {
//       onEdit({ ...event, title, color });
//     } else {
//       onAdd({ id: Date.now().toString(), title, color, date });
//     }
//   };

//   return (
//     <div className="event-form">
//       <h2>{event ? "Edit Event" : "Add Event"}</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="color">Color:</label>
//           <input
//             type="color"
//             id="color"
//             value={color}
//             onChange={(e) => setColor(e.target.value)}
//           />
//         </div>
//         <button type="submit">{event ? "Update Event" : "Add Event"}</button>
//         <button type="button" onClick={onClose}>
//           Close
//         </button>
//         {event && (
//           <button type="button" onClick={() => onDelete(event.id)}>
//             Delete
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// // Define PropTypes
// EventForm.propTypes = {
//   event: PropTypes.shape({
//     id: PropTypes.string,
//     title: PropTypes.string,
//     color: PropTypes.string,
//   }),
//   date: PropTypes.instanceOf(Date),
//   onAdd: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default EventForm;
