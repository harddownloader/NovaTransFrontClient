import React, {
  useState,
  useEffect,
} from "react"

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
} from '@/store/hooks'
import {
  getLocations,
  selectLocations,
  setLocations,
} from '@/store/locations/locationsSlice'
import { getAllLocations } from "@/actions/location"

function App({ alert=null, locations }) {
  const [isAlertVisible, setIsAlertVisible] = useState(Boolean(alert))
  const dispatch = useAppDispatch()
  const {
    data,
    pending, 
    error,
  } = useAppSelector(selectLocations)

  useEffect(() => {
    if (
      locations.length === 0 &&
      (!data?.length && !pending)
    ) dispatch(getLocations())
    else dispatch(setLocations(locations))
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

export const getServerSideProps = async (context) => {
  const { query } = context
  let props = {}

  // if (query?.alert) {
  //   const alert = JSON.parse(query.alert)
  //   props = {
  //     ...props,
  //     alert
  //   }
  // }
  //
  // const locations = await getAllLocations()
  // if (locations) props = {
  //   ...props,
  //   locations
  // }

  return {
    props: props
  }
}

export default App
