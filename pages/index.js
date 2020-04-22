import Head from "next/head";
import styled from "styled-components";

const Text = styled.div`
  background-color: red;
  color: white;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>It&apos;s Showtime!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text>Hello</Text>
    </>
  );
}
