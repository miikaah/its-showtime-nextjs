import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import { addEvent } from "../reducers/events.reducer";

const Button = styled.button`
  background-color: var(--color-highlight2);
  color: var(--color-black);
`;

export default function EventAddButton() {
  const [{ events }, dispatch] = useStateValue();

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
}