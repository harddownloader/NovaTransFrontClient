import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Router from "next/router";
import { dec } from "../../utils/encdec";
import { postBookSeat } from "../../actions/book";
import Header from '../../components/HeaderMaterial/Header';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import ConfirmModal from '@/components/Dialog/ConfirmModal'
import PoperCard from '@/components/Card/PoperCard'
// import Select from "@mui/material/Select";
// import Autocomplete from "@mui/material/Autocomplete";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import {
  // Input,
  TextField,
  Paper,
  Typography,
  Box,
  Autocomplete,
  // Select,
  Button,
  IconButton,
  Grid,
  Container,
  MenuItem,
  InputLabel,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import classes from './Details.module.scss'

// class Details extends React.Component {
function Details(props) {
  const [dataSource, setDataSource] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAdress] = useState('lipoviy_adress')
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleAutoComplete = value => {
    setDataSource(
      !value || value.indexOf("@") >= 0
        ? []
        : [
            `${value}@gmail.com`,
            `${value}@outlook.com`,
            `${value}@yahoo.com`
          ]
    )
    setEmail(value)
  };

  // const handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  const handleNumber = value => {
    setPhone(value)
  };

  const handleSubmit = async () => {
    const seatNumber = props.seat;
    const info = {
      name,
      phone,
      address,
      email,
      seatNumber
    };
    const resp = await postBookSeat(props.slug, info);
    if (!resp.error) {
      sweetAlert("success")
    } else {
      sweetAlert("error", resp.error)
    }
  };

  const sweetAlert = (status, errorText) => {
    if(status !== "error") {
      setTimeout(() => {
        Router.push({
          pathname: '/',
          query: {
            alert: JSON.stringify({
              alertTitle: 'Заказ принят',
              alertText: 'Ожидайте билет на свою почту',
            })
          }
        })
      }, 1000)
    } else {
      if (errorText === "Not available") setErrorText('Выбранные места уже успели занять')
      else setErrorText('Вы ввели не корректные данные')
      return setIsErrorVisible(true)
    }
  };

  return (
    <>
    <Header isDarkStyle containerWidth={"lg"} />
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          <Paper
            elevation={1}
            className={classes.card}
          >
            <Typography variant="h5" gutterBottom component="div">
              Ваши данные
            </Typography>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
              >
                <TextField
                  id="name"
                  className={`${classes.name_field} ${classes.order_field}`}
                  label="Ваше Имя"
                  variant="outlined"
                  fullWidth
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
              >
                <TextField
                  id="phone"
                  className={`${classes.phone_field} ${classes.order_field}`}
                  label="Ваш Телефон"
                  variant="outlined"
                  fullWidth
                  onChange={e => handleNumber(e.target.value)}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <TextField
                  name="email"
                  id="email"
                  className={`${classes.email_field} ${classes.order_field}`}
                  label="Ваш Email"
                  type="email"
                  fullWidth
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Подтвердить покупку
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          <PoperCard
            heading={"Информация о рейсе"}
            content={[
              {
                title: "Рейс",
                text: `${props.start} - ${props.end}`
              },
              {
                title: "Дата",
                text: `${props.journeyDate}`
              },
              {
                title: "Места",
                text: `${props.seat}`
              },
            ]}
          />

          <PoperCard
            heading={"Платежная информация"}
            content={[
              {
                title: "Стоимость билета",
                text: `${props.fare}`
              },
              {
                title: "Итого",
                text: `${props.fare}`
              }
            ]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
        ></Grid>
      </Grid>
    </Container>
    {isErrorVisible && <ConfirmModal
      isVisible={isErrorVisible}
      changeVisibility={() => setIsErrorVisible(false)}
      titleText={'Ошибка'}
      contentText={errorText}
      cancelButtonText={'ОК'}
    />}
    </>
  );
}

Details.getInitialProps = ({ query }) => {
  const info = dec(query.info);
  if (info) {
    return info;
  }
  return {};
};

export default Details;
