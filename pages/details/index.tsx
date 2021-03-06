import React, { useState, useEffect, useMemo } from "react"
import Router from "next/router"
import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps
} from 'next'
import { dec } from "../../utils/encdec"
import { postBookSeat, postMultiBookSeat } from "../../actions/book"
import Header from '../../components/HeaderMaterial/Header'
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
import PoperCard from '@/components/Card/PoperCard'
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
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { validateEmail } from '@/utils/validation/email'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import classes from './Details.module.scss'
import { useIMask } from 'react-imask'
import Footer from "@/components/Footer/Footer"

interface DetailsProps {
  fare: number | null,
  seats: Array<string> | null,
  journeyDate: string | null,
  start: string | null,
  end: string | null,
  slug: string | null,
  iat: number | null,
  referer: string | null,
}

const Details: NextPage<OrderProps> = ({
  oneWayTicketsOrder,
  returnTicketsOrder,
  referer,
}): JSX.Element => {
  // const [dataSource, setDataSource] = useState([])

  const [name, setName] = useState<string>('')
  const [isNameValid, setIsNameValid] = useState<boolean>(null)

  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(null)

  const [isPhoneFieldWasFocused, setIsPhoneFieldWasFocused] = useState<boolean>(false)
  const [isPhoneValid, setIsPhoneValuid] = useState<boolean>(null)

  const [address, setAdress] = useState<string>('lipoviy_adress')
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const [opts, setOpts] = useState({ mask: '+{380}(00)000-00-00' })
  const {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue,
  } = useIMask(opts)

  useEffect(() => {
    if (
      !oneWayTicketsOrder.fare ||
      !oneWayTicketsOrder.seats ||
      !oneWayTicketsOrder.journeyDate ||
      !oneWayTicketsOrder.start ||
      !oneWayTicketsOrder.end ||
      !oneWayTicketsOrder.slug
    ) Router.push({ pathname: '/' })
  }, [])

  // const handleAutoComplete = value => {
  //   setDataSource(
  //     !value || value.indexOf("@") >= 0
  //       ? []
  //       : [
  //           `${value}@gmail.com`,
  //           `${value}@outlook.com`,
  //           `${value}@yahoo.com`
  //         ]
  //   )
  //   setEmail(value)
  // }

  const handleName = (value: string) => {
    nameErrorHandler(value)
    setName(value)
  }

  const nameErrorHandler = (value: string) => {
    const isValid = Boolean(value?.length >= 4)
    if (isNameValid !== isValid) setIsNameValid(isValid)
    return isValid
  }

  const phoneNumberErrorHandler = (value: string): boolean => {
    const isValid = Boolean(value?.length >= 12)
    if (isPhoneValid !== isValid) setIsPhoneValuid(isValid)
    return isValid
  }

  useMemo(() => {
    phoneNumberErrorHandler(unmaskedValue)
  }, [unmaskedValue])

  const handlerEmail = (email: string) => {
    emailErrorHandler(email)
    setEmail(email)
  }

  const emailErrorHandler = (value: string): boolean => {
    const isValid = Boolean(value?.length >= 4 && validateEmail(value))
    if (isEmailValid !== isValid) setIsEmailValid(isValid)
    return isValid
  }

  const getAllValidateStatus = (): boolean => {
    return isNameValid && isEmailValid && isPhoneValid
  }

  const handleSubmit = async () => {
    let resp
    if (oneWayTicketsOrder && !returnTicketsOrder) {
      const seatNumbers = oneWayTicketsOrder.seats
      const slug = oneWayTicketsOrder.slug

      const body = {
        name,
        phone: unmaskedValue.replace(/[^0-9 ]/g, "").trim(),
        address,
        email,
        seatNumber: JSON.stringify(seatNumbers)
      }
      
      resp = await postBookSeat(slug, body)
    } else if(oneWayTicketsOrder && returnTicketsOrder) {
      const body = {
        name,
        phone: unmaskedValue.replace(/[^0-9 ]/g, "").trim(),
        address,
        email,
        tickets: [
          {
            seatNumber: JSON.stringify(oneWayTicketsOrder.seats),
            slug: oneWayTicketsOrder.slug
          },
          {
            seatNumber: JSON.stringify(returnTicketsOrder.seats),
            slug: returnTicketsOrder.slug
          },
        ]
      }

      resp = await postMultiBookSeat(body)
    } else console.error(`You haven't orders info for saving`)

    if (!resp.error) {
      sweetAlert("success")
    } else {
      sweetAlert("error", resp.error)
    }
  }

  const sweetAlert = (status: string, errorText?: string) => {
    if(status !== "error") {
      setTimeout(() => {
        Router.push({
          pathname: '/',
          query: {
            alert: JSON.stringify({
              alertTitle: '?????????? ????????????',
              alertText: '???????????????? ?????????? ???? ???????? ??????????',
            })
          }
        })
      }, 1000)
    } else {
      if (errorText === "Not available") setErrorText('?????????????????? ?????????? ?????? ???????????? ????????????')
      else setErrorText('???? ?????????? ???? ???????????????????? ????????????')
      return setIsErrorVisible(true)
    }
  }

  const getPaymentContent = () => {
    const paymentContent = []
    if (returnTicketsOrder) {
      paymentContent.push({
        title: "?????????????????? ?????????????? ?????????????????? ??????????",
        text: `${oneWayTicketsOrder.fare * oneWayTicketsOrder.seats.length}??????.`
      }, {
        title: "?????????????????? ?????????????????? ????????????",
        text: `${returnTicketsOrder.fare * returnTicketsOrder.seats.length}??????.`
      }, {
        title: "??????????",
        text: `${(oneWayTicketsOrder.fare * oneWayTicketsOrder.seats.length) + (returnTicketsOrder.fare * returnTicketsOrder.seats.length)}??????.`
      })
    } else {
      paymentContent.push({
        title: "?????????????????? ????????????",
        text: `${oneWayTicketsOrder.fare * oneWayTicketsOrder.seats.length}??????.`
      }, {
        title: "??????????",
        text: `${(oneWayTicketsOrder.fare * oneWayTicketsOrder.seats.length)}??????.`
      })
    }

    return paymentContent
  }

  return (
    <>
    <Header isDarkStyle containerWidth={"lg"} />
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        className="mb-2"
      >
        <IconButton
          aria-label="back"
          size="large"
          onClick={() => {
            if (referer !== null && referer.includes('/buses')) {
              Router.back()
            } else {
              Router.push('/')
            }
          }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="h4" component="div">
          ???????????????????? ????????????
        </Typography>
      </Grid>
      
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
              ???????? ????????????
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
                  label="???????? ??????"
                  variant="outlined"
                  fullWidth
                  onChange={e => handleName(e.target.value)}
                  inputProps={{ maxLength: 60 }}
                  value={name}
                  error={isNameValid !== null && !isNameValid}
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
                  label="?????? ??????????????"
                  variant="outlined"
                  fullWidth
                  onFocus={() => {
                    if(!isPhoneFieldWasFocused) setIsPhoneFieldWasFocused(true)
                  }}
                  inputRef={ref}
                  error={isPhoneFieldWasFocused && !isPhoneValid}
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
                  label="?????? Email"
                  type="email"
                  fullWidth
                  onChange={e => handlerEmail(e.target.value)}
                  value={email}
                  error={isEmailValid !== null && !isEmailValid}
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
                  disabled={!getAllValidateStatus()}
                  onClick={handleSubmit}
                >
                  ?????????????????????? ??????????????
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
          {oneWayTicketsOrder && <PoperCard
            heading={"???????????????????? ?? ??????????"}
            content={[
              {
                title: "????????",
                text: `${oneWayTicketsOrder.start} - ${oneWayTicketsOrder.end}`
              },
              {
                title: "????????",
                text: `${oneWayTicketsOrder.journeyDate}`
              },
              {
                title: "??????????",
                text: oneWayTicketsOrder.seats.map(seat => `${seat} `)
              },
              {
                title: "???????? ???? ??????????",
                text: `${oneWayTicketsOrder.fare}??????.`
              }
            ]}
          />}
          {returnTicketsOrder && <PoperCard
            heading={"???????????????????? ???? ???????????????? ??????????"}
            content={[
              {
                title: "????????",
                text: `${returnTicketsOrder.start} - ${returnTicketsOrder.end}`
              },
              {
                title: "????????",
                text: `${returnTicketsOrder.journeyDate}`
              },
              {
                title: "??????????",
                text: returnTicketsOrder.seats.map(seat => `${seat} `)
              },
              {
                title: "???????? ???? ??????????",
                text: `${returnTicketsOrder.fare}??????.`
              }
            ]}
          />}

          <PoperCard
            heading={"?????????????????? ????????????????????"}
            content={getPaymentContent()}
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
    <Footer />
    {isErrorVisible && <ConfirmModal
      isVisible={isErrorVisible}
      changeVisibility={() => setIsErrorVisible(false)}
      titleText={'????????????'}
      contentText={errorText}
      cancelButtonText={'????'}
    />}
    </>
  )
}

type OrderProps = {
  oneWayTicketsOrder: DetailsProps
  returnTicketsOrder?: DetailsProps
  referer: string | null
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const orderString: any = context?.query?.order
  const order: OrderProps = dec(orderString)

  if (order && order?.oneWayTicketsOrder) {
    const orderProps: OrderProps = {
      oneWayTicketsOrder: order?.oneWayTicketsOrder ? order.oneWayTicketsOrder : null,
      referer: context?.req?.headers?.referer || null
    }

    if (order?.returnTicketsOrder) {
      orderProps.returnTicketsOrder = order.returnTicketsOrder
    }

    return {
      props: {
        ...orderProps
      }
    }
  }

  return {
    props: {
      oneWayTicketsOrder: null,
      returnTicketsOrder: null,
      referer: context?.req?.headers?.referer || null
    }
  }
}

export default Details
