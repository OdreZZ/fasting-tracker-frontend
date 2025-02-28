import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="theme-color" content="#0F52BA" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
                <link rel="manifest" href="/manifest.webmanifest" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.pwacompat = {
                                manifest: '/manifest.webmanifest',
                                background_color: '#0F52BA'
                            };
                            if (('standalone' in navigator) && (!navigator.standalone)) {
                                import('https://unpkg.com/pwacompat');
                            }
                        `,
                    }}
                />
                <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
