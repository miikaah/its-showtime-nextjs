import { useState, useEffect } from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { useAppContext } from "./StateProvider";
import { getCurrentEvent, getNextEvent } from "../reducers/events.reducer";
import { ShowtimeEvent } from "../types/Event";

const Container = styled.div<{ hasCurrentEvent: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    text-align: center;
    font-size: 95px;
    color: ${({ hasCurrentEvent }) => hasCurrentEvent && "var(--color-highlight)"};

    ${up("xl")} {
        align-items: initial;
        padding-top: 66px;
        height: 52vh;
        font-size: 200px;
    }
`;

const getSecondsLeft = (currentEvent: ShowtimeEvent, nextEvent: ShowtimeEvent) => {
    const time = currentEvent ? currentEvent.startDate.getTime() : nextEvent.startDate.getTime();
    const now = new Date().getTime();
    return (currentEvent ? currentEvent.endDate.getTime() - now : time - now) / 1000;
};

const formatTime = (totalMinutes: number, secondsLeft: number) => {
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

const getTimeLeft = (currentEvent: ShowtimeEvent, nextEvent: ShowtimeEvent) => {
    if (!currentEvent && !nextEvent) return "";
    const seconds = getSecondsLeft(currentEvent, nextEvent);
    // Start countdown by seconds at 60 sec
    const minutes =
        seconds > 60 && seconds < 90 ? Math.ceil(seconds / 60) : Math.round(seconds / 60);
    return formatTime(minutes, seconds);
};

const ShowtimeCounterClock: React.FunctionComponent = () => {
    const [{ events }] = useAppContext();
    const currentEvent = getCurrentEvent(events);
    const nextEvent = getNextEvent(events);
    const hasCurrentEvent = !!currentEvent;
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(currentEvent, nextEvent));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(currentEvent, nextEvent));
        }, 1000);

        return () => clearInterval(interval);
    }, [currentEvent, nextEvent]);

    return (
        <Container hasCurrentEvent={hasCurrentEvent}>
            {(currentEvent || nextEvent) && timeLeft}
        </Container>
    );
};

export default ShowtimeCounterClock;
