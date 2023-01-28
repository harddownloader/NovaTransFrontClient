import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined'
import Grid from '@mui/material/Grid'
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
import classes from './SeatModal.module.scss'
import DialogHOC from '@/components/Dialog/Modal/DialogHOC'
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"


const rowsCount = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25]
const oddA = ["A1", "A3", "A5", "A7", "A9", "A11", "A13"]
const evenA = ["A2", "A4", "A6", "A8", "A10", "A12", "A14"]
const oddB = ["B1", "B3", "B5", "B7", "B9", "B11", "B13"]
const evenB = ["B2", "B4", "B6", "B8", "B10", "B12", "B14"]


export function SeatModal(props) {
  const { isMobileVersion } = props

  const { sold = [] , booked = [] } = props

  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [currentSeats, setCurrentSeats] = useState([])

  // useEffect(() => {
  //   if (currentSeat) {
  //     setIsConfirmVisible(true)
  //   }
  // }, [currentSeat])

  const handleClose = (e) => {
    if(e) e.stopPropagation()
    setCurrentSeats([])
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
      sold.map(seat => seat.name).includes(position)
        ? `${classes.soldButton}`
        : booked.map(seat => seat.name).includes(position)
          ? `${classes.bookedButton}`
          : currentSeats.includes(position)
            ? `${classes.selectedButton}`
            : ''
    } ${classes.button} ${classes.seatBtn} ${isMobileVersion ? classes.mobileButton : '' }`
  }

  const getSeatBtnStatus = (position) => {
    return Boolean(
      sold.map(seat => seat.name).includes(position) ||
      booked.map(seat => seat.name).includes(position)
    )
  }

  const confirmButtonHandler = () => {
    handleClose(null)
    props.handleUserBooked(currentSeats)
  }

  const getSeatsForSide = (col, row) => {
    return (
      <IconButton
        size="large"
        color="primary"
        aria-label="seat"
        component="span"
        disabled={getSeatBtnStatus(row[col])}
        className={getSeatClass(row[col])}
        onClick={(e) => handleClick(e, row[col])}
      >
        <WeekendOutlinedIcon />
      </IconButton>
    )
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
          <div className={`${classes.seat_modal_footer} ${isMobileVersion ? '' : classes.seat_modal_footer__desktop}`}>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              className={`${classes.button} ${isMobileVersion ? classes.mobileButton : '' }`}
            >
              <WeekendOutlinedIcon />&nbsp;Доступно
            </IconButton>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              className={`${classes.button} ${classes.bookedButton} ${isMobileVersion ? classes.mobileButton : '' }`}
            >
              <WeekendOutlinedIcon />&nbsp;Забронировано
            </IconButton>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              className={`${classes.button} ${classes.soldButton} ${isMobileVersion ? classes.mobileButton : '' }`}
            >
              <WeekendOutlinedIcon />&nbsp;Продано
            </IconButton>
          </div>

          <div className={`${classes.seat_modal_footer} ${isMobileVersion ? '' : classes.seat_modal_footer__desktop}`}>
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
          {rowsCount.map((le, i) => {
            return (
              <div
                className={classes.seat_side_row}
                key={i}
              >
                {oddA[i] && getSeatsForSide(i, oddA)}
                {/*<IconButton*/}
                {/*  size="large"*/}
                {/*  color="primary"*/}
                {/*  aria-label="seat"*/}
                {/*  component="span"*/}
                {/*  disabled={getSeatBtnStatus(oddA[i])}*/}
                {/*  className={getSeatClass(oddA[i])}*/}
                {/*  onClick={(e) => handleClick(e, oddA[i])}*/}
                {/*>*/}
                {/*  <WeekendOutlinedIcon />*/}
                {/*</IconButton>*/}

                {evenA[i] && getSeatsForSide(i, evenA)}
                {/*<IconButton*/}
                {/*  color="primary"*/}
                {/*  aria-label="seat"*/}
                {/*  component="span"*/}
                {/*  disabled={getSeatBtnStatus(evenA[i])}*/}
                {/*  className={getSeatClass(evenA[i])}*/}
                {/*  onClick={(e) => handleClick(e, evenA[i])}*/}
                {/*>*/}
                {/*  <WeekendOutlinedIcon />*/}
                {/*</IconButton>*/}
              </div>
            )
          })}
        </Grid>
        <Grid
          item
          xs={3}
        ></Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
        >
          {rowsCount.map((le, i) => {
            return (
              <div
                className={classes.seat_side_row}
                key={i}
              >
                {oddB[i] && getSeatsForSide(i, oddB)}
                {/*<IconButton*/}
                {/*  color="primary"*/}
                {/*  aria-label="seat"*/}
                {/*  component="span"*/}
                {/*  disabled={getSeatBtnStatus(oddB[i])}*/}
                {/*  className={getSeatClass(oddB[i])}*/}
                {/*  onClick={(e) => handleClick(e, oddB[i])}*/}
                {/*>*/}
                {/*  <WeekendOutlinedIcon />*/}
                {/*</IconButton>*/}

                {evenB[i] && getSeatsForSide(i, evenB)}
                {/*<IconButton*/}
                {/*  color="primary"*/}
                {/*  aria-label="seat"*/}
                {/*  component="span"*/}
                {/*  disabled={getSeatBtnStatus(evenB[i])}*/}
                {/*  className={getSeatClass(evenB[i])}*/}
                {/*  onClick={(e) => handleClick(e, evenB[i])}*/}
                {/*>*/}
                {/*  <WeekendOutlinedIcon />*/}
                {/*</IconButton>*/}
              </div>
            )
          })}
        </Grid>
      </Grid>
    </DialogHOC>
  )
}

export default SeatModal;
