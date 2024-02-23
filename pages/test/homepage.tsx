import React from 'react'
import dynamic from "next/dynamic"

// mui
import { CssBaseline } from "@mui/material"
import Skeleton from "@mui/material/Skeleton"

// project components
// import { Header } from "@/components/Header"
import { SearchTickets } from "./searchticketsfull"
// import { WhyAreWe } from "@/components/HomePage/WhyAreWe"
// import { AboutDrivers } from "@/components/HomePage/AboutDrivers"
// import { Footer } from "@/components/Footer"

// dynamic imports
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <Skeleton animation="wave" height={80} />
})

const WhyAreWe = dynamic(() => import("@/components/HomePage/WhyAreWe"), {
  loading: () => <Skeleton animation="wave" height={350} />
})

const AboutDrivers = dynamic(() => import("@/components/HomePage/AboutDrivers"), {
  loading: () => <Skeleton animation="wave" height={350} />
})

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <Skeleton animation="wave" height={350} />
})

export const HomePage = () => {
  return (
    <>
      <CssBaseline />
      <Header />

      <main>
        <SearchTickets isHeadingVisible={true} />
        <WhyAreWe />
        {/*<PopularTrips />*/}
        <AboutDrivers />
      </main>

      <Footer />
    </>
  )
}

export default HomePage
