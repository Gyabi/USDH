import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css"
import "../ports.css"
import "../dock.css"
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
