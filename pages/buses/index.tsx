import React, {
  useState,
  useEffect,
  ReactElement
} from "react"

// mui
import Grid from '@mui/material/Grid'

// project components
import Cards from "./cards"
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
  selectLocations,
} from '@/store/locations/locationsSlice'

// types
import { TicketsList } from '@/interfaces/tickets'
import { ISearchForm } from "@/interfaces/searchform"

const Buses = ({ resp, searchQuery }) => {
  const [buses, setBuses] = useState<TicketsList>({ oneWayTickets: [] })
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const {
    data,
    pending, 
    error,
  } = useAppSelector(selectLocations)

  useEffect(() => {
    fetchBuses()
    if (!data?.length && !pending) dispatch(getLocations())
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

Buses.getInitialProps = async ({
  query,
  res
}) => {
  if (Object.keys(query).length <= 0) {
    res.writeHead(301, {
      Location: '/'
    })
    res.end()
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
  return { resp, searchQuery }
}

Buses.getLayout = function getLayout(page: ReactElement) {
  return <SearchTicketsLayout
    searchQuery={page.props.searchQuery}
    contentMaxWidth={"md"}
  >{page}</SearchTicketsLayout>
}

export default Buses
