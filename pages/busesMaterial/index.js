import React, { useState, useEffect } from "react";
// import Filters from "./filters";
import Cards from "./cards";
import { searchBus } from "../../actions/location";
import Param from "../../utils/checkQueryParam";
import Loading from "../../components/Loading";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from "../../components/HeaderMaterial/Header";
import SearchTickets from "../../components/Home/SearchTickets/SearchTickets";
// material
import CssBaseline from "@mui/material/CssBaseline";

const Buses = ({ resp, info }) => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, [resp]);

  const fetchBuses = () => {
    setBuses(resp);
  };

  return (
    <Param info={info}>
      <CssBaseline />
      <Header />
      <SearchTickets type="searchPage" info={info} />
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
            // key={index}
          >
            {loading ? <Loading /> : <Cards buses={buses} />}
          </Grid>
        </Grid>
      </Container>
    </Param>
  );
};

Buses.getInitialProps = async ({
  query: { startLocation, endLocation, journeyDate },
}) => {
  const info = { startLocation, endLocation, journeyDate };
  const resp = await searchBus(info);
  return { resp, info };
};

export default Buses;
