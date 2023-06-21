import React, { useEffect } from "react"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

// project components
import { HomePage } from "@/components/HomePage"
import { BaseSeo } from "@/components/seo/BaseSeo"

// utils
import { WEBSITE_NAME } from "@/utils/const"

// types
import { TLocations } from '@/interfaces/locations'

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

function App({ locations=[] }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <HomePage />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  locations: TLocations
}> = async (context) => {
  const { query, res } = context
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const props: {
    locations: TLocations
  } = {
    locations: []
  }

  try {
    const locations = await getAllLocations()
    if (locations) props.locations = [...locations]
  } catch (error) {
    throw new Error('Home page ssr fetching error', error)
  }

  return {
    props: props
  }
}

export default App
