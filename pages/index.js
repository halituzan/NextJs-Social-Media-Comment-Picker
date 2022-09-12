import Head from "next/head";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
export default function Home() {
  return (
    <div>
      <Head>
        <title>All Social Media Free Comment Picker</title>
      </Head>
      <HomePage />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
