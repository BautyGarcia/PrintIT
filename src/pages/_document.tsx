import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
    <Html lang="en">
        <Head>
            <link rel="icon" href="/Logo.ico" />
            <meta name="description" content="PrintIT" />
            <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;