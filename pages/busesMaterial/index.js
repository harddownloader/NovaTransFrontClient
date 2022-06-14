import React, { useState, useEffect } from "react";
// import Layout from "../../components/Layout";
import SearchMenu from "./searchMenu";
// import Filters from "./filters";
import Cards from "./cards";
// import { Row, Col } from "antd";
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
      // <Layout>
        <Param info={info}>
          <CssBaseline />
          <Header />
          <SearchTickets type="searchPage" info={info} />
          {/* <SearchMenu buses={buses} info={info} /> */}
          <Container maxWidth="md">
            {/* <Row className="row-container"> */}
              {/* <Col span={6} className="main-filter">
                <Filters info={info} setBuses={setBuses} setLoading={setLoading} />
              </Col> */}
              {/* <Col span={18}> */}
              {/* <Col>{loading ? <Loading /> : <Cards buses={buses} />}</Col> */}
            {/* </Row> */}

            <Grid
              container
              className="row-container"
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
      // </Layout> 
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
