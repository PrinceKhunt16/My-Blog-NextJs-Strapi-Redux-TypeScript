import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, wrapper } from '../redux/store'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NextNProgress from "nextjs-progressbar"
import ToastContainer from '../components/ToastContainer'
import { useEffect } from 'react'
import { fetchUser } from '../redux/slices/user'

function App({ Component, pageProps }: AppProps) {
  const { isUser } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isUser) {
      dispatch(fetchUser())
    }
  }, [])

  return (
    <>
      <div className='flex flex-col min-h-screen container px-[18px] mx-auto font-sans'>
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
      <ToastContainer />
    </>
  )
}

export default wrapper.withRedux(App);