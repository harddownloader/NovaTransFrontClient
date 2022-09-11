import React, { useState, useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Header from "@/components/HeaderMaterial/Header"
import SearchTickets from "@/components/Home/SearchTickets/SearchTickets"
import WhyAreWe from "@/components/Home/WhyAreWe"
import PopularTrips from "@/components/PopularTrips"
import AboutDrivers from "@/components/Home/AboutDrivers"
import Footer from "@/components/Footer/Footer"
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
// store
import {
  useAppDispatch,
  useAppSelector,
} from '@/app/hooks'
import {
  getLocations,
  selectLocations,
} from '@/features/locations/locationsSlice'

function App(props) {
  const alert = props?.alert
  const [isAlertVibible, setIsAlertVibible] = useState(Boolean(alert))
  const dispatch = useAppDispatch()
  const {
    data,
    pending, 
    error,
  } = useAppSelector(selectLocations)

  useEffect(() => {
    if (!data?.length && !pending) dispatch(getLocations())
  }, [])

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

      {isAlertVibible && <ConfirmModal
        isVisible={isAlertVibible}
        changeVisibility={() => setIsAlertVibible(!isAlertVibible)}
        titleText={alert?.alertTitle}
        contentText={alert?.alertText}
        cancelButtonText={'ОК'}
      />}

      <Footer />
    </>
  )
}

App.getInitialProps = ({ query }) => {
  if (query?.alert) {
    const alert = JSON.parse(query.alert)
    return {alert}
  }
  return {}
}

export default App
