import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import classes from './TripDetails.module.scss'
import DialogHOC from './Modal/DialogHOC'
import CardInfo from '@/components/Card/CardInfo'


export default function TripDetails(props) {
  const { tripDetails, isMobileVersion } = props

  const handleClose = (e) => {
    props.handleCancel(e)
  }

  const isTimeInTripVisible = true

  return (
    <DialogHOC
      {...props}
      title={'Подробности рейса'}
      handleClose={handleClose}
      confirm={null}
      childrenFooter={
        <div className={`${classes.footer}`}>
          <div className={classes.price_wrapper}>
            <div className={classes.price_container}>
            <div className={classes.passengers}>1&nbsp;пасажир</div>
              <span>
                <span className={`${classes.price} ${classes.text_nowrap}`}>
                  {props?.fare}
                </span>
                <span className={classes.currency}>грн</span>
              </span>
            </div>
            <div className={classes.button_wrapp}>
              <button
                className={classes.button}
                role="button"
                onClick={props.showSeatModal}
              >
                <span className="">Выбрать</span>
              </button>
            </div>
          </div>
        </div>
      }
    >
      <Grid
        container
        className={classes.seat_dialog_row_wrapp}
      >
        <Grid
          item
          xs={12}
        >
          <CardInfo
            heading={'Маршрут'}
            elevation={1}
          >
            {tripDetails(classes, isTimeInTripVisible)}
          </CardInfo>

        </Grid>
        <Grid
          item
          xs={4}
        ></Grid>
      </Grid>
    </DialogHOC>
  )
}
