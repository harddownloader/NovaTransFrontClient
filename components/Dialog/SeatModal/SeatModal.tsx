import React, {
  useState,
  Fragment,
  useEffect,
} from 'react'

// mui
import IconButton from '@mui/material/IconButton'
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// project components
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'
import DialogHOC from '@/components/Dialog/Modal/DialogHOC'
import {
  getBusElementDriver,
  getBusElementWC,
  getBusElementDoor,
  getBusElementBar,
  getEmptyBlock,
} from './busBlockElements'
import { getBusSeats } from '@/actions/busesSeats'
import { Preloader } from "@/components/Preloader"

// types
import { IBusSeats } from './types'

// assets
import classes from './SeatModal.module.scss'

const gridStyle = (countBlocksInRow) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${countBlocksInRow}, 1fr)`,
  gridColumnGap: '0rem',
  gridRowGap: '0rem',
})

export function SeatModal(props) {
  const { isMobileVersion } = props

  const { sold = [] , booked = [] } = props

  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false)
  const [currentSeats, setCurrentSeats] = useState([])
  const [busSeats, setBusSeats] = useState<IBusSeats | null>(null)
  useEffect(() => {
    fetchAndSveBusSeatsOfTrip()
  }, [])

  const fetchAndSveBusSeatsOfTrip = async () => {
    const busSeats = await getBusSeatsOfTrip()
    await setBusSeats(busSeats)
  }

  const getBusSeatsOfTrip = async () => {
    const busSeatID = '63d5c06ce8c94256fc1a79c9'
    const busSeats = await getBusSeats(busSeatID)

    return busSeats
  }

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

  const getContentForModal = (busSeats) => {
    const {
      countBlocksInRow,
      busElements,
      seatsCount,
      allBlocksCount,
    } = busSeats

    return (
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
    )
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
          <div className={classes.footer_wrapper}>
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

            <div className={`${classes.seat_modal_footer} ${classes.seats_first_wrap} ${isMobileVersion ? '' : classes.seat_modal_footer__desktop}`}>
              <div className={`${classes.seat_modal_footer} ${classes.seats_second_wrap}`}>
                <div className={`${classes.seat_modal_footer} ${classes.seats_list_wrap}`}>
                  <Typography variant="body2" gutterBottom>
                    Выбранные места:
                  </Typography>
                  <div className={`${classes.seat_modal_footer} ${classes.seats_list__list_wrap}`}>
                    {currentSeats.map(seat => (
                      <div className={classes.selectedSeatNumber} key={seat}>{seat}</div>
                    ))}
                  </div>
                </div>

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
            </div>
          </div>
        </>
      }
    >
      {
        busSeats
          ? getContentForModal(busSeats)
          : <Preloader />
      }

    </DialogHOC>
  )
}

export default SeatModal
