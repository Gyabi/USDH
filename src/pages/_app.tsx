import type { AppProps } from "next/app";

import "../style.css";
import "../App.css";
import "../node.css"
import "../parts.css"
import "../ports.css"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
