import '../styles/globals.css'
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function MyApp({Component, pageProps}) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
