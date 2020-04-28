import { useState, useRef } from "react";
import styled from "styled-components";
import EventList from "./EventList";
import { theme } from "../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${({ isOpen }) => (isOpen ? 0 : 78)}vh;
  background: ${({ hasBgImage }) =>
    hasBgImage &&
    `linear-gradient(${theme.colors.baseLight}, ${theme.colors.baseDark})`};
  transition: top 0.5s;
`;

const ToggleArrow = styled.span`
  border: solid var(--color-primary);
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
  color: var(--color-primary);
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
        {hasBgImage && <EventList />}
      </Wrapper>
    </Container>
  );
}
