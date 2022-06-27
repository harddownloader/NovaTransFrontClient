import React, { useState, useEffect } from "react"
import Router from "next/router"
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { dec } from "../../utils/encdec"
import { postBookSeat } from "../../actions/book"
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

interface DetailsProps {
  fare: number | null,
  seat: string | null,
  journeyDate: string | null,
  start: string | null,
  end: string | null,
  slug: string | null,
  iat: number | null,
  referer: string | null,
}

const Details: NextPage<DetailsProps> = ({
  fare,
  seat,
  journeyDate,
  start,
  end,
  slug,
  referer,
}): JSX.Element => {
  // const [dataSource, setDataSource] = useState([])

  const [name, setName] = useState<string>('')
  const [isNameValid, setIsNameValid] = useState<boolean>(null)

  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(null)

  const [phone, setPhone] = useState<string>('')
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
      !fare ||
      !seat ||
      !journeyDate ||
      !start ||
      !end ||
      !slug
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

  const handleNumber = (number: string) => {
    setPhone(number)
  }

  const phoneNumberErrorHandler = (value: string): boolean => {
    const isValid = Boolean(value?.length >= 17)
    if (isPhoneValid !== isValid) setIsPhoneValuid(isValid)
    return isValid
  }

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
    const seatNumber = seat
    const info = {
      name,
      phone,
      address,
      email,
      seatNumber
    }
    const resp = await postBookSeat(slug, info)
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
          Оформление заказа
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
                  onChange={e => handleNumber(e.target.value)}
                  inputRef={(() => {
                    if (ref?.current?.value) phoneNumberErrorHandler(ref.current.value)
                    return ref
                  })()}
                  error={isPhoneValid !== null && !isPhoneValid}
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
          <PoperCard
            heading={"Информация о рейсе"}
            content={[
              {
                title: "Рейс",
                text: `${start} - ${end}`
              },
              {
                title: "Дата",
                text: `${journeyDate}`
              },
              {
                title: "Места",
                text: `${seat}`
              },
            ]}
          />

          <PoperCard
            heading={"Платежная информация"}
            content={[
              {
                title: "Стоимость билета",
                text: `${fare}`
              },
              {
                title: "Итого",
                text: `${fare}`
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
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const infoString: any = context?.query?.info
  const info: DetailsProps = dec(infoString)
  if (info) {
    return {
      props: {
        // ...info,
        fare: info.fare,
        seat: info.seat,
        journeyDate: info.journeyDate,
        start: info.start,
        end: info.end,
        slug: info.slug,
        referer: context?.req?.headers?.referer || null
      }
    }
  }

  return {
    props: {
      fare: null,
      seat: null,
      journeyDate: null,
      start: null,
      end: null,
      slug: null,
      referer: context?.req?.headers?.referer || null
    }
  }
}

// Details.getInitialProps = ({ query }): any => {
//   const info = dec(query.info)
//   if (info) {
//     return info
//   }

//   return {
//     fare: null,
//     seat: null,
//     journeyDate: null,
//     start: null,
//     end: null,
//     slug: null,
//   }
// }

export default Details
