import React from 'react'

// mui
import { CssBaseline } from "@mui/material"

// project components
import { Header } from "@/components/Header"
import { SearchTickets } from "@/components/HomePage/SearchTickets"
import { WhyAreWe } from "@/components/HomePage/WhyAreWe"
import { AboutDrivers } from "@/components/HomePage/AboutDrivers"
import { Footer } from "@/components/Footer"

export const HomePage = () => {
  return (
    <>
      <CssBaseline />
      <Header />

      <main>
        {/*<SearchTickets isHeadingVisible={true} />*/}
        <WhyAreWe />
        {/*<PopularTrips />*/}
        <AboutDrivers />
      </main>

      <Footer />
    </>
  )
}

