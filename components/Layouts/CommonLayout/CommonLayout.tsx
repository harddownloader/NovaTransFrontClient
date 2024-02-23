import React, { ReactNode } from 'react'
import dynamic from "next/dynamic"

// mui
import Skeleton from '@mui/material/Skeleton'
import Container from '@mui/material/Container'

import { Breakpoint } from "@mui/system/createTheme/createBreakpoints" // this was exported from mui breakpoint type for Container maxWidth, that path may change in the future

// dynamic imports
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <Skeleton animation="wave" height={80} />
})
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <Skeleton animation="wave" height={350} />
})

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
