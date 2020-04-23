export const ADD_EVENT = "showtime/add_event";
export const addEvent = (event) => ({ type: ADD_EVENT, event });

export const REMOVE_EVENT = "showtime/remove_event";
export const removeEvent = (id) => ({ type: REMOVE_EVENT, id });

export const eventsReducer = (events = [], action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [...events, action.event];
    case REMOVE_EVENT:
      return events.filter((event) => event.id !== action.id);
    default:
      return events;
  }
};
