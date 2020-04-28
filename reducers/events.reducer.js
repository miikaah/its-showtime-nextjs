export const ADD_EVENT = "showtime/add_event";
export const addEvent = (event) => ({ type: ADD_EVENT, event });

export const REMOVE_EVENT = "showtime/remove_event";
export const removeEvent = (id) => ({ type: REMOVE_EVENT, id });

export const UPDATE_EVENT = "showtime/update_event";
export const updateEvent = (event) => ({ type: UPDATE_EVENT, event });

export const eventsReducer = (events = [], action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [...events, action.event];
    case REMOVE_EVENT:
      return events.filter((event) => event.id !== action.id);
    case UPDATE_EVENT: {
      return [
        ...events.filter((event) => event.id !== action.event.id),
        action.event,
      ].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }
    default:
      return events;
  }
};

const isCurrentEvent = (event) => {
  const now = new Date().getTime();
  return event.startDate.getTime() <= now && event.endDate.getTime() >= now;
};

export const getCurrentEvent = (events) => {
  if (!Array.isArray(events)) return;
  return events.find(isCurrentEvent);
};

const isUpcomingEvent = (event) => {
  const now = new Date().getTime();
  return event.startDate.getTime() > now;
};

export const getNextEvent = (events) => {
  if (!Array.isArray(events)) return;
  return events.find(isUpcomingEvent);
};

export const getHasEvents = (events) =>
  Array.isArray(events) && events.length > 0;
