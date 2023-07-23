import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add your custom fonts here */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=YourCustomFont1&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=YourCustomFont2&display=swap"
          />
          {/* Add other global stylesheets, meta tags, or scripts here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
