import { useState, useEffect } from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { useStateValue } from "./StateProvider";
import { getCurrentEvent, getNextEvent } from "../reducers/events.reducer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55vh;
  text-align: center;
  font-size: 100px;
  color: ${({ hasCurrentEvent }) =>
    hasCurrentEvent && "var(--color-highlight)"};

  ${up("xl")} {
    align-items: initial;
    padding-top: 66px;
    height: 52vh;
    font-size: 200px;
  }
`;

const getSecondsLeft = (currentEvent, nextEvent) => {
  const time = currentEvent
    ? currentEvent.startDate.getTime()
    : nextEvent.startDate.getTime();
  const now = new Date().getTime();
  return (
    (currentEvent ? currentEvent.endDate.getTime() - now : time - now) / 1000
  );
};

const formatTime = (totalMinutes, secondsLeft) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = minutes < 2 ? Math.ceil(secondsLeft) : NaN;
  if (seconds <= 60) return `${seconds} s`;
  if (hours < 1) return `${minutes} min`;
  if (hours === 1 && hours < 2 && minutes === 0) return `${hours} h`;
  if (hours === 1 && hours < 2) return `${hours} h ${minutes} min`;
  if (hours >= 24 && hours < 48) return "1 day";
  if (hours >= 48) return "Many days";
  return `${hours} h ${minutes} min`;
};

const getTimeLeft = (currentEvent, nextEvent) => {
  if (!currentEvent && !nextEvent) return "";
  const seconds = getSecondsLeft(currentEvent, nextEvent);
  // Start countdown by seconds at 60 sec
  const minutes =
    seconds > 60 && seconds < 90
      ? Math.ceil(seconds / 60)
      : Math.round(seconds / 60);
  return formatTime(minutes, seconds);
};

export default function ShowtimeCounterClock() {
  const [{ events }] = useStateValue();
  const currentEvent = getCurrentEvent(events);
  const nextEvent = getNextEvent(events);
  const hasCurrentEvent = !!currentEvent;
  const [timeLeft, setTimeLeft] = useState(
    getTimeLeft(currentEvent, nextEvent)
  );

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setTimeLeft(getTimeLeft(currentEvent, nextEvent));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentEvent, nextEvent]);

  return (
    <Container hasCurrentEvent={hasCurrentEvent}>
      {(currentEvent || nextEvent) && timeLeft}
    </Container>
  );
}
