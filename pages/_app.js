import "../styles/globals.css";
import "../styles/bootstrap.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps}>
      <Head>
        <title>MinUtleier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Component>
  );
}

export default MyApp;
