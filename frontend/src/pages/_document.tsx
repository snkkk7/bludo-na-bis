import { Html, Head, Main, NextScript } from 'next/document'

import TheHeader from '../components/TheHeader'

import Layout from '../components/Layout'

import Container from '@/components/Container'


const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>          
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}


export default Document