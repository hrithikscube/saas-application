import "@/styles/globals.css";
import { Onest } from 'next/font/google';
import { ToastContainer } from "react-toastify";

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you need
});


export default function App({ Component, pageProps }) {
  return (
    <main className={`${onest.className}`}>
      <ToastContainer/>
      <Component {...pageProps} />
    </main>
  );
}
