import React, { useState, Fragment } from 'react'
import IconButton from '@mui/material/IconButton'
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined'
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
import classes from './SeatModal.module.scss'
import DialogHOC from '@/components/Dialog/Modal/DialogHOC'
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import {
  getBusElementDriver,
  getBusElementWC,
  getBusElementDoor,
  getBusElementBar,
  getEmptyBlock,
} from './busBlockElements'


const gridStyle = (countBlocksInRow) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${countBlocksInRow}, 1fr)`,
  gridColumnGap: '0rem',
  gridRowGap: '0rem',
})


export function SeatModal(props) {
  const {
    isMobileVersion,
    busSeats: {
      countBlocksInRow,
      busElements,
      seatsCount,
      allBlocksCount,
    }
  } = props

  const { sold = [] , booked = [] } = props

  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [currentSeats, setCurrentSeats] = useState([])

  const handleClose = (e) => {
    if(e) e.stopPropagation()
    setCurrentSeats([])
    props.handleCancel(e)
  }

  const handleClick = (e, seat) => {
    e.stopPropagation()
    const currentSeatTmp = currentSeats
    const isSeatInListIndex = currentSeatTmp.findIndex(currentSeat => currentSeat === seat)
    if (isSeatInListIndex !== -1) currentSeatTmp.splice(isSeatInListIndex, 1)
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

  const getSeatsForSide = (seatNumber) => {
    return (
      <div className={classes.seatBtnWrap}>
        <IconButton
          size="large"
          color="primary"
          aria-label="seat"
          component="span"
          disabled={getSeatBtnStatus(seatNumber)}
          className={getSeatClass(seatNumber)}
          onClick={(e) => handleClick(e, seatNumber)}
        >
          <WeekendOutlinedIcon />
        </IconButton>
      </div>
    )
  }

  const getCurrentBusElBlock = ({
                                  driverCoordinates,
                                  firstDoorCoordinates,
                                  secondDoorCoordinates,
                                  wcCoordinates,
                                  barCoordinates,
                                }, currentIndex) => {
    let currentBusEl = null

    switch (currentIndex) {
      case driverCoordinates:
        currentBusEl = getBusElementDriver(currentIndex)
        break
      case wcCoordinates:
        currentBusEl = getBusElementWC(currentIndex)
        break
      case firstDoorCoordinates:
        currentBusEl = getBusElementDoor(currentIndex)
        break
      case secondDoorCoordinates:
        currentBusEl = getBusElementDoor(currentIndex)
        break;
      case barCoordinates:
        currentBusEl = getBusElementBar(currentIndex)
        break
    }

    return currentBusEl
  }

  const checkIsCurrentBlockEmpty = (currentIndex, countBlocksInRow) => {
    const currentBlockNumber = currentIndex + 1
    const remainderOfTheDivision = currentBlockNumber % countBlocksInRow

    // if this is a corridor, them we put an empty block
    const isCurrentBlockEmpty = (
      remainderOfTheDivision === 3 ||
      remainderOfTheDivision === 4
    );

    return isCurrentBlockEmpty
  }

  let seatsCounter = 0

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
      <div className={classes.wrapper}>
        <div className={classes.busWrap}>
          <div className={classes.busContent} style={gridStyle(countBlocksInRow)}>
            {Array(allBlocksCount).fill(0).map((seat, i) => {
              const currentBusEl = getCurrentBusElBlock({...busElements}, i)

              // we need to skip block insertion because the bus elements are 2 blocks wide
              let content = null
              if (
                i === busElements.driverCoordinates + 1 ||
                i === busElements.firstDoorCoordinates + 1 ||
                i === busElements.secondDoorCoordinates + 1 ||
                i === busElements.wcCoordinates + 1 ||
                i === busElements.barCoordinates + 1
              ) {
                return content
              }

              const isCurrentBlockEmpty = checkIsCurrentBlockEmpty(i, countBlocksInRow)

              if (currentBusEl) content = currentBusEl
              else if (isCurrentBlockEmpty) content = getEmptyBlock()
              else if (
                !isCurrentBlockEmpty &&
                !currentBusEl &&
                seatsCounter + 1 <= seatsCount
              ) {
                seatsCounter += 1
                content = getSeatsForSide(seatsCounter)
              }

              return (
                <Fragment key={i}>
                  {content}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

    </DialogHOC>
  )
}

export default SeatModal;