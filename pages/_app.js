import dynamic from "next/dynamic";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import CurrentTimeClock from "../components/CurrentTimeClock";
import EventPlanner from "../components/EventPlanner";
import StateProvider, { LocalStoragePersistor } from "../components/StateProvider";
import { theme, GlobalStyle } from "../styles/theme";

const ClockDisplay = dynamic(() => import("../components/ClockDisplay"), {
    ssr: false,
});

export default function App() {
    return (
        <StateProvider>
            <LocalStoragePersistor />
            <GlobalStyle />
            <Head>
                <title>It&apos;s Showtime!</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#ffab03" />
                <meta name="description" content="It's Showtime is an Event planner" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="PWA App" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <ThemeProvider theme={theme}>
                <CurrentTimeClock />
                <ClockDisplay />
                <EventPlanner />
            </ThemeProvider>
        </StateProvider>
    );
}
