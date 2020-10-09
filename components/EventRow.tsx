import { useState } from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { useAppContext } from "./StateProvider";
import { formatDateString, parseDate } from "./util";
import { removeEvent, updateEvent } from "../reducers/events.reducer";
import { ShowtimeEvent } from "../types/Event";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom 30px;
    width: 100%;

    ${up("md")} {
        flex-direction: row;
        margin-bottom 16px;
    }
`;

const Input = styled.input<{ hasDateErr?: boolean }>`
    background-color: white;
    color: black;
    margin-bottom: 8px;
    text-align: center;
    text-overflow: ellipsis;
    ${({ hasDateErr }) =>
        hasDateErr &&
        `
    outline-color: var(--color-highlight);
  `}

    ${up("md")} {
        margin-right: 8px;
        margin-bottom: 0;
    }
`;

const RemoveButton = styled.button`
    background-color: var(--color-highlight);
    min-width: 80px;
`;

const EventRow: React.FunctionComponent<{ event: ShowtimeEvent }> = ({ event }) => {
    if (!event) return null;

    const [, dispatch] = useAppContext();
    const [name, setName] = useState(event.name || "");
    const [startDate, setStartDate] = useState(formatDateString(event.startDate) || "");
    const [endDate, setEndDate] = useState(formatDateString(event.endDate) || "");
    const [hasStartDateErr, setHasStartDateErr] = useState(false);
    const [hasEndDateErr, setHasEndDateErr] = useState(false);

    const updateName = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const newName = e.currentTarget.value;
        setName(newName);
        dispatch(updateEvent({ ...event, name: newName }));
    };

    const updateStartDate = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setHasStartDateErr(false);
        const dateString = e.currentTarget.value;
        setStartDate(dateString);
        const date = parseDate(dateString, "start");
        if (date.toString() === "Invalid Date") {
            setHasStartDateErr(true);
            return;
        }
        dispatch(updateEvent({ ...event, startDate: date }));
    };

    const updateEndDate = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setHasEndDateErr(false);
        const dateString = e.currentTarget.value;
        setEndDate(dateString);
        const date = parseDate(dateString, "end");
        if (date.toString() === "Invalid Date") {
            setHasEndDateErr(true);
            return;
        }
        dispatch(updateEvent({ ...event, endDate: date }));
    };

    const deleteEvent = () => dispatch(removeEvent(event));

    return (
        <Container>
            <Input type="text" value={name} onChange={updateName} />
            <Input
                type="text"
                value={startDate}
                onChange={updateStartDate}
                hasDateErr={hasStartDateErr}
            />
            <Input
                type="text"
                value={endDate}
                onChange={updateEndDate}
                hasDateErr={hasEndDateErr}
            />
            <RemoveButton onClick={deleteEvent}>X</RemoveButton>
        </Container>
    );
};

export default EventRow;
