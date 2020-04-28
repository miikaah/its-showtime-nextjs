import dynamic from "next/dynamic";
import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import CurrentTimeClock from "../components/CurrentTimeClock";
import EventPlanner from "../components/EventPlanner";
import StateProvider, {
  LocalStoragePersistor,
} from "../components/StateProvider";

const ClockDisplay = dynamic(() => import("../components/ClockDisplay"), {
  ssr: false,
});

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
    background: transparent;
    color: var(--color-white);
  }

  input, button {
    font-family: var(--font-family-secondary);
    font-size: 16px;
    padding: 12px;
    border-radius: 3px;
  }
`;

const theme = {
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1300px",
  },
};

export default function App() {
  return (
    <StateProvider>
      <LocalStoragePersistor />
      <GlobalStyle />
      <Head>
        <title>It&apos;s Showtime!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CurrentTimeClock />
        <ClockDisplay />
        <EventPlanner />
      </ThemeProvider>
    </StateProvider>
  );
}
