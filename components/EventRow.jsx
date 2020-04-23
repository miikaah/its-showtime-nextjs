import { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import { getFormattedDateString } from "./util";
import { removeEvent } from "../reducers/events.reducer";

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
`;

const RemoveButton = styled.button`
  flex: 1 0 8%;
  background-color: var(--color-highlight);
`;

export default function EventRow({ event }) {
  if (!event) return null;

  const [, dispatch] = useStateValue();
  const [name, setName] = useState(event.name);
  const [startDate, setStartDate] = useState(
    getFormattedDateString(event.startDate)
  );
  const [endDate, setEndDate] = useState(getFormattedDateString(event.endDate));

  const deleteEvent = () => dispatch(removeEvent(event.id));

  return (
    <Container>
      <Input type="text" value={name} onChange={(e) => setName(e.value)} />
      <Input type="text" value={startDate} onChange={setStartDate} />
      <Input type="text" value={endDate} onChange={setEndDate} />
      <RemoveButton onClick={deleteEvent}>X</RemoveButton>
    </Container>
  );
}
