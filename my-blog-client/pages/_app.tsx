import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NextNProgress from "nextjs-progressbar"
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext(null)

export default function App({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useState({})
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('me')){
      setIsUser(true)
      const data = localStorage.getItem('me')
      const parsedData = JSON.parse(data)
      setUserData(parsedData)
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={{userData, isUser, setUserData, setIsUser}}>
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
      </UserContext.Provider>
    </>
  )
}
