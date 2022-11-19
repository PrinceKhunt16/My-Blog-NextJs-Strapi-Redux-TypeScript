import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NextNProgress from "nextjs-progressbar"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='flex flex-col min-h-screen container mx-auto font-sans'>
        <NextNProgress 
          color='#53bd95'
          height={1}
          options={{
            showSpinner: false
          }}
        />
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
