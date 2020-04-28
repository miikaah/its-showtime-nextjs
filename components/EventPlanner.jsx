import { useState, useRef } from "react";
import styled from "styled-components";
import EventList from "./EventList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? 0 : 94)}vh;
  background: ${({ hasBgImage }) =>
    hasBgImage && "linear-gradient(#093a3a, #001414)"};
  transition: top 0.5s;
`;

const ToggleArrow = styled.span`
  border: solid var(--color-highlight2);
  border-width: 0 3px 3px 0;
  padding: 3px;
  transform: rotate(${({ isOpen }) => (isOpen ? 45 : -135)}deg);
  display: inline-block;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  padding-bottom: 60px;
`;

const ToggleButton = styled.button`
  align-self: center;
  color: var(--color-highlight2);
  padding: 12px 16px;
  font-weight: bold;
  cursor: pointer;

  span:first-child {
    margin-right: 12px;
  }
`;

export default function EventPlanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBgImage, setHasBgImage] = useState(false);
  const toggleRef = useRef();

  const toggle = () => {
    setTimeout(() => toggleRef.current.blur(), 500);
    setIsOpen(!isOpen);

    if (hasBgImage) {
      setTimeout(() => setHasBgImage(false), 500);
    } else {
      setHasBgImage(true);
    }
  };

  return (
    <Container isOpen={isOpen} hasBgImage={hasBgImage}>
      <Wrapper>
        <ToggleButton ref={toggleRef} onClick={toggle}>
          <span>Event Planner</span>
          <ToggleArrow isOpen={isOpen} />
        </ToggleButton>
        {isOpen && <EventList />}
      </Wrapper>
    </Container>
  );
}
