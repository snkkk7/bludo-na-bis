import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { store } from '@/store'

import Layout from '../components/UI/Layout'

import TheHeader from '@/components/UI/TheHeader'

const App = ({ Component, pageProps }: AppProps) => {
  return (   
            <Provider store={store}>
              <Layout>  
                 <Component {...pageProps} />
              </Layout>
            </Provider>
              
         )
}

export default App