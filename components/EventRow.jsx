import { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import { formatDateString, parseDate } from "./util";
import { removeEvent, updateEvent } from "../reducers/events.reducer";

const Container = styled.div`
  display: flex;
  margin-bottom 16px;
`;

const Input = styled.input`
  background-color: white;
  color: black;
  margin-right: 8px;
  text-align: center;
  max-width: 14vw;
  ${({ hasStartDateErr, hasEndDateErr }) =>
    (hasStartDateErr || hasEndDateErr) &&
    `
    outline-color: var(--color-highlight);
  `}
`;

const RemoveButton = styled.button`
  flex: 1 0 8%;
  background-color: var(--color-highlight);
`;

export default function EventRow({ event }) {
  if (!event) return null;

  const [, dispatch] = useStateValue();
  const [name, setName] = useState(event.name || "");
  const [startDate, setStartDate] = useState(
    formatDateString(event.startDate) || ""
  );
  const [endDate, setEndDate] = useState(formatDateString(event.endDate) || "");
  const [hasStartDateErr, setHasStartDateErr] = useState(false);
  const [hasEndDateErr, setHasEndDateErr] = useState(false);

  const updateName = (e) => {
    const newName = e.target.value;
    setName(newName);
    dispatch(updateEvent({ ...event, name: newName }));
  };

  const updateStartDate = (e) => {
    setHasStartDateErr(false);
    const dateString = e.target.value;
    setStartDate(dateString);
    const date = parseDate(dateString, "start");
    if (date.toString() === "Invalid Date") {
      setHasStartDateErr(true);
      return;
    }
    dispatch(updateEvent({ ...event, startDate: date }));
  };

  const updateEndDate = (e) => {
    setHasEndDateErr(false);
    const dateString = e.target.value;
    setEndDate(dateString);
    const date = parseDate(dateString, "end");
    if (date.toString() === "Invalid Date") {
      setHasEndDateErr(true);
      return;
    }
    dispatch(updateEvent({ ...event, endDate: date }));
  };

  const deleteEvent = () => dispatch(removeEvent(event.id));

  return (
    <Container>
      <Input type="text" value={name} onChange={updateName} />
      <Input
        type="text"
        value={startDate}
        onChange={updateStartDate}
        hasStartDateErr={hasStartDateErr}
      />
      <Input
        type="text"
        value={endDate}
        onChange={updateEndDate}
        hasEndDateErr={hasEndDateErr}
      />
      <RemoveButton onClick={deleteEvent}>X</RemoveButton>
    </Container>
  );
}
