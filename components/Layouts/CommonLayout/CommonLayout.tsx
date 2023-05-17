import React, { ReactNode } from 'react'

// mui
import { Container } from "@mui/material"
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints" // this was exported from mui breakpoint type for Container maxWidth, that path may change in the future

// project components
import Header from "@/components/HeaderMaterial/Header"
import Footer from "@/components/Footer/Footer"

export interface CommonLayoutProps {
  children: ReactNode
  isDarkStyle?: boolean
  containerWidth?: Breakpoint
  contentMaxWidth?: Breakpoint
}

export function CommonLayout({
                               children,
                               isDarkStyle=false,
                               containerWidth="md",
                               contentMaxWidth="lg",
}: CommonLayoutProps) {
  return (
    <>
      <Header
        isDarkStyle={isDarkStyle}
        containerWidth={containerWidth}
      />
      <Container maxWidth={contentMaxWidth}>
        { children }
      </Container>
      <Footer />
    </>
  )
}
