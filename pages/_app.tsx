import "../styles/globals.css";
import MainContainer from "../components/Container/MainContainer";
import Head from "next/head";
import { AppProps } from "next/app";

function FastingTrackerApp({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>Fasting Tracker</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href={`/favicon.ico`} />
        </Head>

        <MainContainer title={pageProps.pageTitle}>
            <Component {...pageProps} />
        </MainContainer>
    </>
}

export default FastingTrackerApp;