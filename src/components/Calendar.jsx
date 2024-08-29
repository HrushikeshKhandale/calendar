

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Toolbar from "./Toolbar";
import "./styles/calendar.css";
import EventForm from "./EventForm";

const getMonthViewDates = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const startDate = new Date(year, month, 1);
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  const endDate = new Date(year, month + 1, 0);
  const endDay = endDate.getDay();
  endDate.setDate(endDate.getDate() + (6 - endDay));

  const dates = [];
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  return dates;
};

const generateResources = () => {
  const resources = [];
  for (let i = 0; i < 26; i++) {
    resources.push(`Resource ${String.fromCharCode(65 + i)}`);
  }
  return resources;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const monthViewDates = getMonthViewDates(currentDate);
  const resources = generateResources();

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setShowEventForm(true);
  };

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
    setShowEventForm(false);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    setShowEventForm(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setShowEventForm(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedEvents = Array.from(events);
    const [movedEvent] = updatedEvents.splice(result.source.index, 1);
    updatedEvents.splice(result.destination.index, 0, movedEvent);

    setEvents(updatedEvents);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="calendar" style={{position:'relative',top:'0'}}>
        <Toolbar currentDate={currentDate} onDateChange={handleDateChange} style={{position:'fixed'}} />

        <div className="calendar-body">
          <div className="date-row">
            <div className="empty-cell"></div>
            {monthViewDates.map((date, index) => (
              <div key={index} className="date-column">
                <div className="date-info">
                  <div className="date-combined">
                    <span className="date-date">{date.getDate()}</span>
                    <span className="date-day">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Droppable droppableId="calendar-body" direction="horizontal">
            {(provided) => (
              <div
                className="resource-row"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="resource-column">
                    <div className="resource-name">{resource}</div>
                    {monthViewDates.map((date, dayIndex) => (
                      <Droppable key={dayIndex} droppableId={`droppable-${dayIndex}`} direction="vertical">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="resource-cell"
                            onClick={() => {
                              setSelectedDate(date);
                              setShowEventForm(true);
                            }}
                          >
                            {events
                              .filter(event => event.date.getTime() === date.getTime())
                              .map((event, eventIndex) => (
                                <Draggable
                                  key={event.id}
                                  draggableId={`draggable-${event.id}`}
                                  index={eventIndex}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="event"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEventClick(event);
                                      }}
                                    >
                                      {event.title}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {showEventForm && (
          <EventForm
            event={currentEvent}
            date={selectedDate}
            onAdd={handleAddEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            onClose={() => setShowEventForm(false)}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default Calendar;


// import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Toolbar from "./Toolbar";
// import "./styles/calendar.css";
// import EventForm from "./EventForm";

// const getMonthViewDates = (date) => {
//   const year = date.getFullYear();
//   const month = date.getMonth();

//   const startDate = new Date(year, month, 1);
//   const startDay = startDate.getDay();
//   startDate.setDate(startDate.getDate() - startDay);

//   const endDate = new Date(year, month + 1, 0);
//   const endDay = endDate.getDay();
//   endDate.setDate(endDate.getDate() + (6 - endDay));

//   const dates = [];
//   for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
//     dates.push(new Date(d));
//   }

//   return dates;
// };

// const generateResources = () => {
//   const resources = [];
//   for (let i = 0; i < 26; i++) {
//     resources.push(`Resource ${String.fromCharCode(65 + i)}`);
//   }
//   return resources;
// };

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showEventForm, setShowEventForm] = useState(false);
//   const [currentEvent, setCurrentEvent] = useState(null);

//   const handleDateChange = (date) => {
//     setCurrentDate(date);
//   };

//   const monthViewDates = getMonthViewDates(currentDate);
//   const resources = generateResources();

//   const handleEventClick = (event) => {
//     setCurrentEvent(event);
//     setShowEventForm(true);
//   };

//   const handleAddEvent = (event) => {
//     setEvents([...events, event]);
//     setShowEventForm(false);
//   };

//   const handleEditEvent = (updatedEvent) => {
//     setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
//     setShowEventForm(false);
//   };

//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(event => event.id !== id));
//     setShowEventForm(false);
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const updatedEvents = Array.from(events);
//     const [movedEvent] = updatedEvents.splice(result.source.index, 1);
//     updatedEvents.splice(result.destination.index, 0, movedEvent);

//     setEvents(updatedEvents);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="calendar">
//         <Toolbar currentDate={currentDate} onDateChange={handleDateChange} />

//         <div className="calendar-body">
//           <div className="date-row">
//             <div className="empty-cell"></div>
//             {monthViewDates.map((date, index) => (
//               <div key={index} className="date-column">
//                 <div className="date-info">
//                   <div className="date-combined">
//                     <span className="date-date">{date.getDate()}</span>
//                     <span className="date-day">
//                       {date.toLocaleDateString("en-US", { weekday: "short" })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <Droppable droppableId="calendar-body" direction="horizontal">
//             {(provided) => (
//               <div
//                 className="resource-row"
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//               >
//                 {resources.map((resource, resourceIndex) => (
//                   <div key={resourceIndex} className="resource-column">
//                     <div className="resource-name">{resource}</div>
//                     {monthViewDates.map((date, dayIndex) => (
//                       <Droppable key={dayIndex} droppableId={`droppable-${dayIndex}`} direction="vertical">
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                             className="resource-cell"
//                             onClick={() => {
//                               setSelectedDate(date);
//                               setShowEventForm(true);
//                             }}
//                           >
//                             {events
//                               .filter(event => event.date.getTime() === date.getTime())
//                               .map((event, eventIndex) => (
//                                 <Draggable
//                                   key={event.id}
//                                   draggableId={`draggable-${event.id}`}
//                                   index={eventIndex}
//                                 >
//                                   {(provided) => (
//                                     <div
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}
//                                       className="event"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleEventClick(event);
//                                       }}
//                                     >
//                                       {event.title}
//                                     </div>
//                                   )}
//                                 </Draggable>
//                               ))}
//                             {provided.placeholder}
//                           </div>
//                         )}
//                       </Droppable>
//                     ))}
//                   </div>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>

//         {showEventForm && (
//           <EventForm
//             event={currentEvent}
//             date={selectedDate}
//             onAdd={handleAddEvent}
//             onEdit={handleEditEvent}
//             onDelete={handleDeleteEvent}
//             onClose={() => setShowEventForm(false)}
//           />
//         )}
//       </div>
//     </DragDropContext>
//   );
// };

// export default Calendar;
