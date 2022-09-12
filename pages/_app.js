// pages/_app.js
import "../public/styles/globals.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
