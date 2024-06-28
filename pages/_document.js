import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.webmanifest" />
                <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>
                <link rel="apple-touch-icon" href="/icons/icon.png"></link>
                <meta name="theme-color" content="#1C6758" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
