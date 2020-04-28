import { useState } from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { useStateValue } from "./StateProvider";
import { formatDateString, parseDate } from "./util";
import { removeEvent, updateEvent } from "../reducers/events.reducer";

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

const Input = styled.input`
  background-color: white;
  color: black;
  margin-bottom: 8px;
  text-align: center;
  text-overflow: ellipsis;
  ${({ hasStartDateErr, hasEndDateErr }) =>
    (hasStartDateErr || hasEndDateErr) &&
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
