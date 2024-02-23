import React, {
  useState,
  useEffect,
  ReactElement
} from "react"

// mui
import Grid from '@mui/material/Grid'

// project components
import { Cards } from "@/components/SearchTripsPage"
import Loading from "@/components/Loading"
import { BaseSeo } from "@/components/seo/BaseSeo"
import { SearchTicketsLayout } from "@/components/Layouts/SearchTicketsLayout"

// utils
import { searchBus } from "@/actions/bus"

// store
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import {
  getLocations,
  selectLocations, setLocations,
} from '@/store/locations/locationsSlice'

// types
import { TicketsList } from '@/interfaces/tickets'
import { ISearchForm } from "@/interfaces/searchform"
import { getAllLocations } from "@/actions/location"

const Buses = ({ resp, searchQuery, locations }) => {
  const [buses, setBuses] = useState<TicketsList>({ oneWayTickets: [] })
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    fetchBuses()
  }, [resp])

  const fetchBuses = () => {
    setBuses(resp)
  }

  return (
    <>
      <BaseSeo
        title={`Поиск билетов`}
        description={`Поиск билетов`}
      />
      <Grid
        container
        className="tickets_wrapp"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
        >
          {loading ? <Loading /> : <Cards buses={buses} />}
        </Grid>
      </Grid>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { query, res } = context
  let props = {}

  if (Object.keys(query).length <= 0) {
    res.writeHead(301, {
      Location: '/'
    })
    res.end()
  }

  const locations = await getAllLocations({})
  if (locations) props = {
    ...props,
    locations
  }

  const searchQuery: ISearchForm = {
    startLocation: query.startLocation,
    endLocation: query.endLocation,
    journeyDate: query.journeyDate,
    returnStartLocation: query.returnStartLocation,
    returnEndLocation: query.returnEndLocation,
    returnJourneyDate: query.returnJourneyDate,
  }

  const resp = await searchBus(searchQuery)

  props = {
    ...props,
    resp, searchQuery
  }

  return {
    props: props
  }
}

Buses.getLayout = function getLayout(page: ReactElement) {
  return <SearchTicketsLayout
    searchQuery={page.props.searchQuery}
    contentMaxWidth={"md"}
  >{page}</SearchTicketsLayout>
}

export default Buses
