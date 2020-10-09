import styled from "styled-components";
import { prefixNumber } from "./util";
import { ShowtimeEvent } from "../types/Event";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const formatTime = (date: Date) => {
    return `${prefixNumber(date.getHours())}:${prefixNumber(date.getMinutes())}`;
};

const StaticTimeClock: React.FunctionComponent<{
    event: ShowtimeEvent;
    type: "startDate" | "endDate";
}> = ({ event, type }) => {
    return <Container>{event && formatTime(event[type])}</Container>;
};

export default StaticTimeClock;
