import { Html, Head, Main, NextScript } from 'next/document'

import TheHeader from '../components/UI/TheHeader'

import Layout from '../components/UI/Layout'

import Container from '@/components/UI/Container'


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