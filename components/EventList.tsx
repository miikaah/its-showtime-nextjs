import dynamic from "next/dynamic";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { useAppContext } from "./StateProvider";
import EventAddButton from "./EventAddButton";

const EventRow = dynamic(() => import("./EventRow"));

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto;
    min-width: 300px;
    max-width: 750px;

    ${up("md")} {
        margin: 40px auto;
        max-width: none;
    }
`;

const EventList: React.FunctionComponent = () => {
    const [{ events }] = useAppContext();

    return (
        <Container>
            {Array.isArray(events) &&
                events.map((event) => <EventRow key={event.id} event={event} />)}
            <EventAddButton />
        </Container>
    );
};

export default EventList;
