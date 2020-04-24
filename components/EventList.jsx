import dynamic from "next/dynamic";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import EventAddButton from "./EventAddButton";

const EventRow = dynamic(() => import("./EventRow"));

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

  return (
    <Container>
      {Array.isArray(events) &&
        events.map((event) => <EventRow key={event.id} event={event} />)}
      <EventAddButton />
    </Container>
  );
}
