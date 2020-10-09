import { ShowtimeEvent, Action } from "../types/Event";

export const ADD_EVENT = "showtime/add_event";
export const addEvent = (event: ShowtimeEvent): Action => ({
    type: ADD_EVENT,
    event,
});

export const REMOVE_EVENT = "showtime/remove_event";
export const removeEvent = (event: ShowtimeEvent): Action => ({
    type: REMOVE_EVENT,
    event,
});

export const UPDATE_EVENT = "showtime/update_event";
export const updateEvent = (event: ShowtimeEvent): Action => ({
    type: UPDATE_EVENT,
    event,
});

export const eventsReducer = (events: ShowtimeEvent[] = [], action: Action): ShowtimeEvent[] => {
    switch (action.type) {
        case ADD_EVENT:
            return [...events, action.event];
        case REMOVE_EVENT:
            return events.filter((event) => event.id !== action.event.id);
        case UPDATE_EVENT: {
            const newEvents = [
                ...events.filter((event) => event.id !== action.event.id),
                action.event,
            ];
            return newEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        }
        default:
            return events;
    }
};

const isCurrentEvent = (event: ShowtimeEvent) => {
    const now = new Date().getTime();
    return event.startDate.getTime() <= now && event.endDate.getTime() >= now;
};

export const getCurrentEvent = (events: ShowtimeEvent[]): ShowtimeEvent | undefined => {
    if (!Array.isArray(events)) return;
    return events.find(isCurrentEvent);
};

const isUpcomingEvent = (event: ShowtimeEvent) => {
    const now = new Date().getTime();
    return event.startDate.getTime() > now;
};

export const getNextEvent = (events: ShowtimeEvent[]): ShowtimeEvent | undefined => {
    if (!Array.isArray(events)) return;
    return events.find(isUpcomingEvent);
};

export const getHasEvents = (events: ShowtimeEvent[]): boolean => {
    return Array.isArray(events) && events.length > 0;
};
