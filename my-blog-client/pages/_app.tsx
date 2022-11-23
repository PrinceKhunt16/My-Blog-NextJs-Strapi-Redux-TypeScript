import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NextNProgress from "nextjs-progressbar"
import { createContext, useEffect, useState } from 'react'
import { fetchUserFromJWTToken } from '../utils'

export const AppContext = createContext(null)

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    avatarurl: '',
    email: '',
    username: '',
    id: '',
    about: ''
  })

  const fetchInitialUser = async () => {
    try {
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
        const obj = await fetchUserFromJWTToken(jwt)
        setUser({ ...obj })
        setIsLoggedIn(true)
      } else {
        console.log('popup for login')
      }
    } catch (e) {
      localStorage.removeItem('jwt')
      console.log(e)
    }
  }

  useEffect(() => {
    fetchInitialUser()
  }, [])

  return (
    <>
      <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
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
      </AppContext.Provider>
    </>
  )
}
