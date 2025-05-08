import "@/styles/globals.css";
import { Onest } from 'next/font/google';

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you need
});


export default function App({ Component, pageProps }) {
  return (
    <main className={`${onest.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
