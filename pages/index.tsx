import React, {useState, useEffect, ReactElement} from "react"

// mui
import CssBaseline from "@mui/material/CssBaseline"

// project components
import Header from "@/components/HeaderMaterial/Header"
import SearchTickets from "@/components/Home/SearchTickets/SearchTickets"
import WhyAreWe from "@/components/Home/WhyAreWe"
import PopularTrips from "@/components/PopularTrips"
import AboutDrivers from "@/components/Home/AboutDrivers"
import Footer from "@/components/Footer/Footer"
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
import { BaseSeo } from "@/components/seo/BaseSeo"

// utils
import { WEBSITE_NAME } from "@/utils/const"

// store
import {
  useAppDispatch,
  useAppSelector,
} from '@/app/hooks'
import {
  getLocations,
  selectLocations,
} from '@/features/locations/locationsSlice'
import {CommonLayout} from "@/components/Layouts";
import Details from "./details";

function App(props) {
  const alert = props?.alert
  const [isAlertVisible, setIsAlertVisible] = useState(Boolean(alert))
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
      <BaseSeo
        title={`Купить билеты на автобус, заказать автобусные билеты онлайн`}
        description={`Заказать или купить билет на автобус онлайн на сайте ${WEBSITE_NAME}. Онлайн бронирование билетов на автобусы . Забронировать автобусный билет на сайте ${WEBSITE_NAME}`}
      />
      <CssBaseline />
      <Header />

      <main>
        <SearchTickets />
        <WhyAreWe />
        {/*<PopularTrips />*/}
        <AboutDrivers />
      </main>

      {isAlertVisible && <ConfirmModal
        isVisible={isAlertVisible}
        changeVisibility={() => setIsAlertVisible(!isAlertVisible)}
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
