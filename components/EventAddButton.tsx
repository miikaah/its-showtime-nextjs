import styled from "styled-components";
import { useAppContext } from "./StateProvider";
import { addEvent } from "../reducers/events.reducer";

const Button = styled.button`
    background-color: var(--color-primary);
    color: var(--color-black);
`;

const EventAddButton: React.FunctionComponent = () => {
    const [{ events }, dispatch] = useAppContext();

    const getNextStartDate = () => {
        const length = events.length;
        const event = length ? events[length - 1] : undefined;
        const date = event ? new Date(event.endDate.getTime()) : new Date();
        if (event) date.setMinutes(date.getMinutes() + 1);
        return date;
    };

    const createEvent = () => {
        const id = new Date().getTime();
        const nextId = `event-${id}`;
        const startDate = getNextStartDate();
        const endDate = new Date(
            new Date(startDate).setMinutes(startDate.getMinutes() + 59, 59, 999)
        );
        dispatch(addEvent({ id: nextId, startDate, endDate }));
    };

    return <Button onClick={createEvent}>Add Event</Button>;
};

export default EventAddButton;
