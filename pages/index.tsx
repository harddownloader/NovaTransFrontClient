import React, {
  useState,
  useEffect,
} from "react"

// project components
// import { HomePage } from "@/components/HomePage"
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
// import { getAllLocations } from "@/actions/location"

function App({ locations }) {
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
      <h1>HOME PAGE</h1>
      {/*<HomePage />*/}
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
