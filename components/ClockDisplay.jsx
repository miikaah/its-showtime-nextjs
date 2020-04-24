import { useState, useEffect } from "react";
import styled from "styled-components";
import ShowtimeCounterClock from "./ShowtimeCounterClock";
import StaticTimeClock from "./StaticTimeClock";
import { useStateValue } from "./StateProvider";
import { getCurrentEvent, getNextEvent } from "../reducers/events.reducer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const ShowtimeClockContainer = styled.div``;

const StaticClockContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10%;
`;

const CurrentEventName = styled.div`
  padding: 32px;
`;

export default function ClockDisplay() {
  const [{ events }] = useStateValue();
  const currentEvent = getCurrentEvent(events);
  const nextEvent = getNextEvent(events);
  const [event, setEvent] = useState(currentEvent || nextEvent);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setEvent(getCurrentEvent(events) || getNextEvent(events));
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <Container>
      <CurrentEventName>{event && event.name}</CurrentEventName>
      <ShowtimeClockContainer>
        <ShowtimeCounterClock />
      </ShowtimeClockContainer>
      <StaticClockContainer>
        <StaticTimeClock event={event} type="startDate" />
        <StaticTimeClock event={event} type="endDate" />
      </StaticClockContainer>
    </Container>
  );
}
