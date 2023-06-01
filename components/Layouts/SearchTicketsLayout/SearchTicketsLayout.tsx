import React, { ReactNode } from 'react'

// mui
import { Container } from "@mui/material"
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints" // this was exported from mui breakpoint type for Container maxWidth, that path may change in the future

// project components
import Header from "@/components/HeaderMaterial/Header"
import Footer from "@/components/Footer/Footer"
import SearchTickets from "@/components/HomePage/SearchTickets/SearchTickets"

// types
import { ISearchForm } from '@/interfaces/searchform'

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
      <SearchTickets type="searchPage" info={searchQuery} />
      <Container maxWidth={contentMaxWidth}>
        { children }
      </Container>
      <Footer />
    </>
  )
}
