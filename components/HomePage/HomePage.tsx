import React from 'react'

// mui
import CssBaseline from "@mui/material/CssBaseline"

// project components
import Header from "@/components/HeaderMaterial/Header"
import SearchTickets from "@/components/HomePage/SearchTickets/SearchTickets"
import WhyAreWe from "@/components/HomePage/WhyAreWe"
import AboutDrivers from "@/components/HomePage/AboutDrivers"
import ConfirmModal from "@/components/Dialog/Confirm/ConfirmModal"
import Footer from "@/components/Footer/Footer"

export const HomePage = () => {
  return (
    <>
      <CssBaseline />
      <Header />

      <main>
        <SearchTickets />
        <WhyAreWe />
        {/*<PopularTrips />*/}
        <AboutDrivers />
      </main>

      <Footer />
    </>
  )
}

