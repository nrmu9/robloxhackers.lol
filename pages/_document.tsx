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
          <link rel="shortcut icon" href="/globe.ico" />
          <meta name="title" content="voxlis.NET | Ready to Win?" />
          <meta name="description" content="voxlis.NET - Your go-to source for game cheats! Roblox, Counter-Strike 2, Minecraft, and more! Known people manage the original links to them!" />
          <meta property="og:title" content="voxlis.NET | Ready to Win?" />
          <meta property="og:description" content="voxlis.NET - Your go-to source for game cheats! Roblox, Counter-Strike 2, Minecraft, and more! Known people manage the original links to them!" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https:/voxlis.NET" />
          <meta property="og:image" content="/voxlis.NET.png" />
          <meta name="theme-color" content="#EF4444" />
          <meta name="google-adsense-account" content="ca-pub-2235454136284515" />
          <meta name='dmca-site-verification' content='NUNQM05qaVozd0JUbkpQN09DT2NQKzdGbGpmZ2lnNk56NXJGbld1Uko0VT01' />
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
