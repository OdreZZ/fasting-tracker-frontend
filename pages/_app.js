import MainContainer from "../components/Container/MainContainer";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
                <title>Fasting-Tracker v0.1</title>
            </Head>

            <MainContainer title={pageProps.pageTitle}>
                <Component {...pageProps} />
            </MainContainer>
        </>
    );
}

export default MyApp;