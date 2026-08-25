import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return <Html lang="en">
        <Head>
            <meta name="theme-color" content="#002366" />
            <link rel="apple-touch-icon" href={`/icons/icon-192x192.png`}></link>
            <link rel="manifest" href={`/manifest.webmanifest`} />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
}
