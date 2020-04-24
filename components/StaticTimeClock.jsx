import styled from "styled-components";
import { prefixNumber } from "./util";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 48px;
`;

const formatTime = (date) => {
  if (!(date instanceof Date)) return "";
  return `${prefixNumber(date.getHours())}:${prefixNumber(date.getMinutes())}`;
};

export default function StaticTimeClock({ event, type }) {
  return <Container>{event && formatTime(event[type])}</Container>;
}
