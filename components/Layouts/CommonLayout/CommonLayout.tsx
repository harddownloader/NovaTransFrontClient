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
  contentMaxWidth?: Breakpoint | false
  contentDisableGutters?: boolean
}

export function CommonLayout({
                               children,
                               isDarkStyle=false,
                               containerWidth="md",
                               contentMaxWidth="lg",
                               contentDisableGutters=false
}: CommonLayoutProps) {
  console.log('CommonLayout props', {
    contentMaxWidth,
    contentDisableGutters
  })
  return (
    <>
      <Header
        isDarkStyle={isDarkStyle}
        containerWidth={containerWidth}
      />
      <Container
        maxWidth={contentMaxWidth}
        disableGutters={contentDisableGutters}
      >
        { children }
      </Container>
      <Footer />
    </>
  )
}
