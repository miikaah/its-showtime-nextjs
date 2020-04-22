import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import CurrentTimeClock from "../components/CurrentTimeClock";

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
    --font-family-secondary: Garamond;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  html {
    background-image: linear-gradient(#093a3a, #001414);
    color: var(--color-white);
    height: 100vh;
    font-family: var(--font-family-primary);
  }

  * {
    box-sizing: border-box;
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
    </>
  );
}
