import React from 'react'
import dynamic from 'next/dynamic';


// mui
import CssBaseline from "@mui/material/CssBaseline"

// project components
import Header from "@/components/HeaderMaterial/Header"
// import SearchTickets from "@/components/HomePage/SearchTickets/SearchTickets"
import WhyAreWe from "@/components/HomePage/WhyAreWe"
import AboutDrivers from "@/components/HomePage/AboutDrivers"
import Footer from "@/components/Footer/Footer"

const SearchTickets = dynamic(() => import("@/components/HomePage/SearchTickets/SearchTickets"), {
  loading: () => <p>Loading...</p>,
});

export const HomePage = () => {
  return (
    <>
      <CssBaseline />
      <Header />

      <main>
        <h2>HomePage component</h2>
        <SearchTickets />
        <WhyAreWe />
        {/*<PopularTrips />*/}
        <AboutDrivers />
      </main>

      <Footer />
    </>
  )
}

