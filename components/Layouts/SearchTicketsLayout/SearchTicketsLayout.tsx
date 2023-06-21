import React, { ReactNode } from 'react'
import dynamic from "next/dynamic"

// mui
import { Container } from "@mui/material"
import Skeleton from "@mui/material/Skeleton"
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints" // this was exported from mui breakpoint type for Container maxWidth, that path may change in the future

// project components
// import { Header } from "@/components/Header"
// import { Footer } from "@/components/Footer"
import { SearchTickets } from "@/components/HomePage/SearchTickets"

// types
import { ISearchForm } from '@/interfaces/searchform'

// dynamic imports
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <Skeleton animation="wave" height={80} />
})
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <Skeleton animation="wave" height={350} />
})

export interface SearchTicketsLayoutProps {
  children: ReactNode
  isDarkStyle?: boolean
  containerWidth?: Breakpoint
  searchQuery: ISearchForm
  contentMaxWidth?: Breakpoint
}

export function SearchTicketsLayout({
                               children,
                               isDarkStyle=false,
                               containerWidth="md",
                               contentMaxWidth="lg",
                               searchQuery
                             }: SearchTicketsLayoutProps) {
  return (
    <>
      <Header isDarkStyle={isDarkStyle} containerWidth={containerWidth} />
      <SearchTickets isHeadingVisible={false} info={searchQuery} />
      <Container maxWidth={contentMaxWidth}>
        { children }
      </Container>
      <Footer />
    </>
  )
}
