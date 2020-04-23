export default class EventRepository {
  constructor() {
    if (EventRepository.instance) {
      return EventRepository.instance;
    }
    this.resources = JSON.parse(localStorage.getItem("showtimeEvents")) || {
      events: [],
    };
    this.convertEventStringsToDates();
  }

  get startTime() {
    return this.eventsSize === 0
      ? new Date()
      : (this.getNextOrCurrentEvent() || {}).startDate;
  }

  get endTime() {
    return this.eventsSize === 0
      ? new Date()
      : (this.getNextOrCurrentEvent() || {}).endDate;
  }

  get eventsSize() {
    return this.resources.events.length;
  }

  get events() {
    return this.resources.events;
  }

  set events(events) {
    this.modifyResources({ events });
  }

  get hasActualEvents() {
    return !!(this.getCurrentEvent() || this.getNextEvent());
  }

  get currentEvent() {
    return this.getCurrentEvent();
  }

  get nextEvent() {
    return this.getNextEvent();
  }

  set addEvent(event) {
    this.modifyResources({ events: [...this.resources.events, event] });
  }

  set removeEvent(id) {
    this.modifyResources({
      events: this.resources.events.filter((e) => e.id !== id),
    });
  }

  get getLastEvent() {
    const length = this.resources.events.length;
    return length ? this.resources.events[length - 1] : undefined;
  }

  static getInstance() {
    if (!EventRepository.instance)
      EventRepository.instance = new EventRepository();
    return EventRepository.instance;
  }

  convertEventStringsToDates() {
    for (const event of this.resources.events) {
      event.startDate = new Date(event.startDate);
      event.endDate = new Date(event.endDate);
    }
  }

  getNextOrCurrentEvent() {
    const now = new Date().getTime();
    for (const event of this.resources.events) {
      if (this.hasCurrentEvent(event, now)) return event;
      if (this.hasUpcomingEvent(event, now)) return event;
    }
  }

  getCurrentEvent() {
    const now = new Date().getTime();
    for (const event of this.resources.events) {
      if (this.hasCurrentEvent(event, now)) return event;
    }
  }

  getNextEvent() {
    const now = new Date().getTime();
    for (const event of this.resources.events) {
      if (this.hasUpcomingEvent(event, now)) return event;
    }
  }

  hasCurrentEvent(event, now) {
    return event.startDate.getTime() <= now && event.endDate.getTime() >= now;
  }

  hasUpcomingEvent(event, now) {
    return event.startDate.getTime() > now;
  }

  modifyResources(resources) {
    this.resources = Object.freeze({ ...this.resources, ...resources });
    this.sortEventsByStartDate();
    localStorage.setItem("showtimeEvents", JSON.stringify(this.resources));
  }

  sortEventsByStartDate() {
    this.resources.events.sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );
  }
}
