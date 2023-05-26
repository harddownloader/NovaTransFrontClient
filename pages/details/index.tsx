import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  ReactElement,
} from "react"
import Router from "next/router"
import { GetServerSideProps } from 'next'
import { useIMask } from 'react-imask'

// mui
import {
  TextField,
  Paper,
  Typography,
  Button,
  IconButton,
  Grid,
} from '@mui/material'

// project components
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
import { PaperCard } from '@/components/Card/PaperCard'
import { BaseSeo } from "@/components/seo/BaseSeo"
import { CommonLayout } from "@/components/Layouts"
import LiqPay from "./liqpay"
import { Heading } from "./Heading"

// utils
import { dec } from "@/utils/encdec"
import { validateEmail } from '@/utils/validation/email'
import { postBookSeat, postMultiBookSeat } from "@/actions/booking"
import {
  PAYMENT_GATEWAY_PRIVATE_KEY,
  PAYMENT_GATEWAY_PUBLIC_KEY,
  WEBSITE_DOMAIN
} from "@/utils/const"

// assets
import classes from './Details.module.scss'

// types
import { NextPageWithLayout } from "../_app"

type TPaymentForm = { paymentForm: string }

interface DetailsProps {
  fare: number | null
  seats: Array<string> | null
  journeyDate: string | null
  start: string | null
  end: string | null
  slug: string | null
  iat: number | null
  referer: string | null
  totalCost: number
  naming: string
}

export const Details: NextPageWithLayout<OrderProps & TPaymentForm> = ({
  oneWayTicketsOrder,
  returnTicketsOrder,
  referer,
  paymentForm,
}): JSX.Element => {
  const [name, setName] = useState<string>('')
  const [isNameValid, setIsNameValid] = useState<boolean>(null)

  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(null)

  const [isPhoneFieldWasFocused, setIsPhoneFieldWasFocused] = useState<boolean>(false)
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(null)

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

  const checkoutFormBtnRef = useRef(null)

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
    if (isPhoneValid !== isValid) setIsPhoneValid(isValid)
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
        email,
        seatNumber: JSON.stringify(seatNumbers)
      }
      
      resp = await postBookSeat(slug, body)
    } else if(oneWayTicketsOrder && returnTicketsOrder) {
      const body = {
        name,
        phone: unmaskedValue.replace(/[^0-9 ]/g, "").trim(),
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
      // sweetAlert("success")
      if (checkoutFormBtnRef?.current?.children?.[0]?.childNodes?.[2]) {
        checkoutFormBtnRef.current.children[0].childNodes[2].click()
      }
    } else {
      sweetAlert("error", resp.error)
    }
  }

  const sweetAlert = (status: string, errorText?: string) => {
    if(status !== "error") {
      // setTimeout(() => {
      //   Router.push({
      //     pathname: '/',
      //     query: {
      //       alert: JSON.stringify({
      //         alertTitle: 'Заказ принят',
      //         alertText: 'Ожидайте билет на свою почту',
      //       })
      //     }
      //   })
      // }, 1000)
    } else {
      if (errorText === "Not available") setErrorText('Выбранные места уже успели занять')
      else setErrorText('Вы ввели не корректные данные')
      return setIsErrorVisible(true)
    }
  }

  const getPaymentContent = () => {
    const costOfOneWayTickets = oneWayTicketsOrder.totalCost
    const paymentContent = []

    if (returnTicketsOrder) {
      const costOfRoundTripTicket = returnTicketsOrder.totalCost
      paymentContent.push({
        title: "Стоимость билетов основного рейса",
        text: `${costOfOneWayTickets}грн.`
      }, {
        title: "Стоимость обратного билета",
        text: `${costOfRoundTripTicket}грн.`
      }, {
        title: "Итого",
        text: `${(costOfOneWayTickets) + (costOfRoundTripTicket)}грн.`
      })
    } else {
      paymentContent.push({
        title: "Стоимость билета",
        text: `${costOfOneWayTickets}грн.`
      }, {
        title: "Итого",
        text: `${(costOfOneWayTickets)}грн.`
      })
    }

    return paymentContent
  }

  return (
    <>
      <BaseSeo
        title={`Оформление заказа`}
        description={`Оформление заказа`}
      />
      <Grid
        container
        direction="row"
        className={`${classes.heading_main_container}`}
      >
        <Heading referer={referer} />

        <Grid item xs={12}>
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
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  className={classes.sub_heading_wrap}
                >
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
                      label="Ваш Телефон"
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
                      label="Ваш Email"
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
              {oneWayTicketsOrder && <PaperCard
                heading={"Информация о рейсе"}
                content={[
                  {
                    title: "Рейс",
                    text: `${oneWayTicketsOrder.naming}`
                  },
                  {
                    title: "Дата",
                    text: `${oneWayTicketsOrder.journeyDate}`
                  },
                  {
                    title: "Места",
                    text: oneWayTicketsOrder.seats.map(seat => `${seat} `)
                  },
                  {
                    title: "Цена за билет(место)",
                    text: `${oneWayTicketsOrder.fare}грн.`
                  }
                ]}
              />}
              {returnTicketsOrder && <PaperCard
                heading={"Информация об обратном рейсе"}
                content={[
                  {
                    title: "Рейс",
                    text: `${returnTicketsOrder.naming}`
                  },
                  {
                    title: "Дата",
                    text: `${returnTicketsOrder.journeyDate}`
                  },
                  {
                    title: "Места",
                    text: returnTicketsOrder.seats.map(seat => `${seat} `)
                  },
                  {
                    title: "Цена за билет(место)",
                    text: `${returnTicketsOrder.fare}грн.`
                  }
                ]}
              />}

              <PaperCard
                heading={"Платежная информация"}
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
        </Grid>
      </Grid>
      <div
        ref={checkoutFormBtnRef}
        className="checkout_form_btn"
        style={{overflow: 'hidden', height: 0}}
        dangerouslySetInnerHTML={{ __html: paymentForm }}
      ></div>

      {isErrorVisible && <ConfirmModal
        isVisible={isErrorVisible}
        changeVisibility={() => setIsErrorVisible(false)}
        titleText={'Ошибка'}
        contentText={errorText}
        cancelButtonText={'ОК'}
      />}
    </>
  )
}

type OrderProps = {
  oneWayTicketsOrder: DetailsProps
  returnTicketsOrder?: DetailsProps
  referer: string | null
} & TPaymentForm

export const getServerSideProps: GetServerSideProps = async(context) => {
  const orderString: any = context?.query?.order
  const order: OrderProps = dec(orderString)

  if (order && order?.oneWayTicketsOrder) {
    const costOfOneWayTickets: number = Number(order.oneWayTicketsOrder.fare) * Number(order.oneWayTicketsOrder.seats.length)

    const orderProps: OrderProps = {
      oneWayTicketsOrder: {
        ...order.oneWayTicketsOrder,
        totalCost: costOfOneWayTickets,
        naming: `${order.oneWayTicketsOrder.start} - ${order.oneWayTicketsOrder.end}`
      },
      referer: context?.req?.headers?.referer || null,
      paymentForm: '',
    }

    let costOfRoundTripTicket = 0
    if (order?.returnTicketsOrder) {
      costOfRoundTripTicket = Number(order.returnTicketsOrder.fare) * Number(order.returnTicketsOrder.seats.length)
      orderProps.returnTicketsOrder = {
        ...order.returnTicketsOrder,
        totalCost: costOfRoundTripTicket,
        naming: `${order.returnTicketsOrder.start} - ${order.returnTicketsOrder.end}`
      }
    }

    const amount = Number(costOfOneWayTickets + costOfRoundTripTicket)

    if (Number.isNaN(amount)) return {
      props: {
        oneWayTicketsOrder: null,
        returnTicketsOrder: null,
        referer: context?.req?.headers?.referer || null
      }
    }

    const liqpay = new LiqPay(PAYMENT_GATEWAY_PUBLIC_KEY, PAYMENT_GATEWAY_PRIVATE_KEY)
    const paymentFormHtml = liqpay.cnb_form({
      'action'         : 'pay',
      'amount'         : String(amount), // '1'
      'currency'       : 'UAH',
      'description'    : 'description text',
      'order_id'       : 'order_id_1',
      'version'        : '3',
      'result_url'     : `https://www.${WEBSITE_DOMAIN}/?alert={"alertTitle":"Заказ%20принят","alertText":"Ожидайте%20билет%20на%20свою%20почту"}`
    })

    return {
      props: {
        ...orderProps,
        paymentForm: paymentFormHtml
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

Details.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout isDarkStyle containerWidth={"lg"}>{page}</CommonLayout>
}

export default Details
