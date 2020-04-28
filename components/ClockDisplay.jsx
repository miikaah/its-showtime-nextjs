import { useState, useEffect } from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import ShowtimeCounterClock from "./ShowtimeCounterClock";
import StaticTimeClock from "./StaticTimeClock";
import { useStateValue } from "./StateProvider";
import {
  getCurrentEvent,
  getNextEvent,
  getHasEvents,
} from "../reducers/events.reducer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  padding-top: 50px;

  ${up("xl")} {
    padding-top: 0;
    justify-content: center;
  }
`;

const StaticClockContainer = styled.div`
  display: flex;
  padding: 12px;
  align-items: center;
  font-size: 14px;
`;

const StaticClockDivider = styled.span`
  margin: 0 8px;
`;

const CurrentEventName = styled.div`
  font-size: 30px;
`;

const NoEventsNote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 14px;
  font-weight: normal;
  font-family: var(--font-family-secondary);
`;

export default function ClockDisplay() {
  const [{ events }] = useStateValue();
  const currentEvent = getCurrentEvent(events);
  const nextEvent = getNextEvent(events);
  const hasEvents = getHasEvents(events);
  const [event, setEvent] = useState(currentEvent || nextEvent);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setEvent(getCurrentEvent(events) || getNextEvent(events));
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <>
      {hasEvents && (
        <Container>
          <CurrentEventName>{event && event.name}</CurrentEventName>
          <StaticClockContainer>
            <StaticTimeClock event={event} type="startDate" />
            <StaticClockDivider>{"\u2013"}</StaticClockDivider>
            <StaticTimeClock event={event} type="endDate" />
          </StaticClockContainer>
          <ShowtimeCounterClock />
        </Container>
      )}
      {!hasEvents && <NoEventsNote>No upcoming events</NoEventsNote>}
    </>
  );
}
