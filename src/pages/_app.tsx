import type { AppProps } from "next/app";

import "../style.css";
import "../App.css";
import "../scriptable.css"
import "../enum.css"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
