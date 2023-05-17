import React, {
  useState,
  useEffect,
  ReactElement
} from "react"

// mui
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import CssBaseline from "@mui/material/CssBaseline"

// project components
import Cards from "./cards"
import Loading from "@/components/Loading"
import Header from "@/components/HeaderMaterial/Header"
import SearchTickets from "@/components/Home/SearchTickets/SearchTickets"
import Footer from "@/components/Footer/Footer"
import { BaseSeo } from "@/components/seo/BaseSeo"
import { SearchTicketsLayout } from "@/components/Layouts/SearchTicketsLayout"

// utils
import { searchBus } from "@/actions/location"

// store
import {
  useAppDispatch,
  useAppSelector,
} from '@/app/hooks'
import {
  getLocations,
  selectLocations,
} from '@/features/locations/locationsSlice'

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

  return (
    <>
      <BaseSeo
        title={`Поиск билетов`}
        description={`Поиск билетов`}
      />
      <CssBaseline />
      <Header isDarkStyle={false} containerWidth="md" />
      <SearchTickets type="searchPage" info={searchQuery} />
      <Container maxWidth="md">
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
      </Container>
      <Footer />
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
