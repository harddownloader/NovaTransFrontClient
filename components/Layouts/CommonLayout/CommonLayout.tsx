import React from 'react'
import Header from "@/components/HeaderMaterial/Header"
import { Container } from "@mui/material"
import Footer from "@/components/Footer/Footer"

export function CommonLayout({ children }) {
  return (
    <>
      <Header isDarkStyle={false} containerWidth="md" />
      <Container maxWidth="lg">
        { children }
      </Container>
      <Footer />
    </>
  )
}

export default CommonLayout
