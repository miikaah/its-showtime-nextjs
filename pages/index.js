import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-white: #fbfbfb;
    --color-black: #000;
    --color-base: #002525;
    --color-base-light: #093a3a;
    --color-base-dark: #001414;
    --color-highlight: #ff0303;
    --color-highlight2: #ffab03;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  html {
    background-image: linear-gradient(#093a3a, #001414);
    height: 100vh;
  }
`;

const Text = styled.div`
  background-color: ${({ hasBg }) =>
    hasBg ? "var(--color-highlight2)" : "transparent"};
  color: var(--color-white);
`;

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>It&apos;s Showtime!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text hasBg>Hello</Text>
      <Text>World</Text>
    </>
  );
}
