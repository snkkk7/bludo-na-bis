
'use client'

import TheHeader from './TheHeader'

import Container from './Container'

const Layout = ({children}: {children : React.ReactNode} ) => {

    return (
        <>
            <TheHeader/>
            <Container>
               {
                children
               }
            </Container>
        </>
    )
}

export default Layout