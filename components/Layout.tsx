import React from 'react'
import Header from '@/components/HeaderMaterial/Header'


const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
