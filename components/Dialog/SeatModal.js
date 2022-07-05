import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined'
import Grid from '@mui/material/Grid'
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
import classes from './SeatModal.module.scss'
import DialogHOC from './Modal/DialogHOC'
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"


export default function SeatModal(props) {
  const { isMobileVesion } = props

  const { sold = [] , booked = [] } = props
  const [arr, setArr] = useState([0, 2.5, 5, 7.5, 10, 12.5, 15])
  // const [oddA, setOddA] = useState(["A1", "A3", "A5", "A7", "A9", "A11", "A13", "A15"])
  const [oddA, setOddA] = useState(["A1", "A3", "A5", "A7", "A9", "A11", "A13"])
  const [evenA, setEvenA] = useState(["A2", "A4", "A6", "A8", "A10", "A12", "A14"])
  // const [oddB, setOddB] = useState(["B1", "B3", "B5", "B7", "B9", "B11", "B13", "B15"])
  const [oddB, setOddB] = useState(["B1", "B3", "B5", "B7", "B9", "B11", "B13"])
  const [evenB, setEvenB] = useState(["B2", "B4", "B6", "B8", "B10", "B12", "B14"])
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [currentSeats, setCurrentSeats] = useState([])

  // useEffect(() => {
  //   if (currentSeat) {
  //     setIsConfirmVisible(true)
  //   }
  // }, [currentSeat])

  const handleClose = (e) => {
    if(e) e.stopPropagation()
    setCurrentSeats({})
    props.handleCancel(e)
  }

  const handleClick = (e, seat) => {
    e.stopPropagation()
    const currentSeatTmp = currentSeats
    const isSeatInListIndx = currentSeatTmp.findIndex(currentSeat => currentSeat === seat)
    if (isSeatInListIndx !== -1) currentSeatTmp.splice(isSeatInListIndx, 1)
    else currentSeatTmp.push(seat)

    setCurrentSeats([...currentSeatTmp])
  }

  const getSeatClass = (position) => {
    return `${
      sold.includes(position)
        ? `${classes.soldButton}`
        : booked.includes(position)
          ? `${classes.bookedButton}`
          : currentSeats.includes(position)
            ? `${classes.selectedButton}`
            : ''
    } ${classes.button} ${classes.seatBtn} ${isMobileVesion ? classes.mobileButton : '' }`
  }

  const getSeatBtnStatus = (position) => {
    return Boolean(
      sold.includes(position) ||
      booked.includes(position)
    )
  }

  const confirmButtonHandler = () => {
    handleClose()
    props.handleUserBooked(currentSeats)
  }

  return (
    <DialogHOC
      {...props}
      title={'Выберите места'}
      handleClose={handleClose}
      confirm={isConfirmVisible &&
        <ConfirmModal
          isVisible={isConfirmVisible}
          changeVisibility={setIsConfirmVisible}
          titleText={'Вы уверены?'}
          contentText={'Подтвердите пожалуйста свою бронь'}
          confirmButtonText={'Забронировать'}
          cancelButtonText={'Отмена'}
          confirmButtonHandler={confirmButtonHandler}
        />
      }
      childrenFooter={
        <>
          <div className={`${classes.seat_modal_footer} ${isMobileVesion ? '' : classes.seat_modal_footer__desktop}`}>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              className={`${classes.button} ${isMobileVesion ? classes.mobileButton : '' }`}
            >
              <WeekendOutlinedIcon />&nbsp;Доступно
            </IconButton>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              className={`${classes.button} ${classes.bookedButton} ${isMobileVesion ? classes.mobileButton : '' }`}
            >
              <WeekendOutlinedIcon />&nbsp;Забронировано
            </IconButton>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              className={`${classes.button} ${classes.soldButton} ${isMobileVesion ? classes.mobileButton : '' }`}
            >
              <WeekendOutlinedIcon />&nbsp;Продано
            </IconButton>
          </div>

          <div className={`${classes.seat_modal_footer} ${isMobileVesion ? '' : classes.seat_modal_footer__desktop}`}>
            <Typography variant="body2" gutterBottom>
              Выбранные места:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {currentSeats.map(seat => `${seat} `)}
            </Typography>

            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => setIsConfirmVisible(true)}
              disabled={!Boolean(
                Array.isArray(currentSeats) &&
                currentSeats.length
              )}
              fullWidth
            >
              Заказать
            </Button>
          </div>
        </>
      }
    >
      <Grid
        container
        className={classes.seat_dialog_row_wrapp}
      >
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
        >
          {arr.map((le, i) => {
            return (
              <div
                className={classes.seat_side_row}
                key={i}
              >
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="seat"
                  component="span"
                  disabled={getSeatBtnStatus(oddA[i])}
                  className={getSeatClass(oddA[i])}
                  onClick={(e) => handleClick(e, oddA[i])}
                >
                  <WeekendOutlinedIcon />
                </IconButton>

                <IconButton
                  color="primary"
                  aria-label="seat"
                  component="span"
                  disabled={getSeatBtnStatus(evenA[i])}
                  className={getSeatClass(evenA[i])}
                  onClick={(e) => handleClick(e, evenA[i])}
                >
                  <WeekendOutlinedIcon />
                </IconButton>
              </div>
            )
          })}
        </Grid>
        <Grid
          item
          xs={4}
        ></Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
        >
          {arr.map((le, i) => {
            return (
              <div
                className={classes.seat_side_row}
                key={i}
              >
                <IconButton
                  color="primary"
                  aria-label="seat"
                  component="span"
                  disabled={getSeatBtnStatus(oddB[i])}
                  className={getSeatClass(oddB[i])}
                  onClick={(e) => handleClick(e, oddB[i])}
                >
                  <WeekendOutlinedIcon />
                </IconButton>

                <IconButton
                  color="primary"
                  aria-label="seat"
                  component="span"
                  disabled={getSeatBtnStatus(evenB[i])}
                  className={getSeatClass(evenB[i])}
                  onClick={(e) => handleClick(e, evenB[i])}
                >
                  <WeekendOutlinedIcon />
                </IconButton>
              </div>
            )
          })}
        </Grid>
      </Grid>
    </DialogHOC>
  )
}
