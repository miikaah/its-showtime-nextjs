import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import EventRow from "./EventRow";
import EventAddButton from "./EventAddButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 50vw;
  margin: 40px auto;
`;

export default function EventList() {
  const [{ events }] = useStateValue();

  if (!events) return null;

  return (
    <Container>
      {events.map((event) => (
        <EventRow key={event.id} event={event} />
      ))}
      <EventAddButton />
    </Container>
  );
}
