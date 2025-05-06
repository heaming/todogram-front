import Document, { Html, Head, Main, NextScript } from 'next/document';

class TodogramDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/todogram.ico" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default TodogramDocument;