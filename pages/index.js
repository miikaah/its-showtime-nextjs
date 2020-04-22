import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import CurrentTimeClock from "../components/CurrentTimeClock";
import EventPlanner from "../components/EventPlanner";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-white: #fbfbfb;
    --color-black: #000;
    --color-base: #002525;
    --color-base-light: #093a3a;
    --color-base-dark: #001414;
    --color-highlight: #ff0303;
    --color-highlight2: #ffab03;

    --font-family-primary: Arial Black;
    --font-family-secondary: Verdana;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  html {
    background-image: linear-gradient(#002020, #093a3a);
    color: var(--color-white);
    height: 100vh;
    font-family: var(--font-family-primary);
  }

  * {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--color-white);
    font-family: var(--font-family-secondary);
    font-size: 16px;
  }
`;

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>It&apos;s Showtime!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CurrentTimeClock />
      <EventPlanner />
    </>
  );
}
