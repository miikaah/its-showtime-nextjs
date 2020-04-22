import { useState, useEffect } from "react";
import styled from "styled-components";
import { prefixNumber } from "./util";

const Clock = styled.div`
  width: 100%;
  text-align: center;
  padding: 12px;
`;

const formatTime = () => {
  const now = new Date();
  return `${prefixNumber(now.getHours())}:${prefixNumber(now.getMinutes())}`;
};

export default function CurrentTimeClock() {
  const [time, setTime] = useState(formatTime());

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Clock>{time}</Clock>;
}
