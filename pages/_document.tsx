import Document, { Html, Head, Main, NextScript } from 'next/document';

class DocumentPage extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="title" content="robloxhackers.lol: Your trusted source for exploits" />
          <meta name="description" content="Looking for an exploit on all platforms? - we've got it!" />
          <meta property="og:title" content="robloxhackers.lol: Your trusted source for exploits" />
          <meta property="og:description" content="Looking for an exploit on all platforms? - we've got it!" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://robloxhackers.lol" />
          <meta property="og:image" content="https://robloxhackers.lol/CE64px.png" />
          <meta name="theme-color" content="#2d2de0" />
          <meta name="google-adsense-account" content="ca-pub-2235454136284515" />
          <meta name='dmca-site-verification' content='NUNQM05qaVozd0JUbkpQN09DT2NQKzdGbGpmZ2lnNk56NXJGbld1Uko0VT01' />
          <meta name="monetag" content="db3c03d9043d018dd05f31bc9bf74d79"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentPage;
