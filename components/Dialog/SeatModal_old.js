import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined'
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import ConfirmModal from './ConfirmModal'
import classes from './SeatModal.module.scss'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function SeatModal(props) {
  const theme = useTheme();
  const isMobileVesion = useMediaQuery(theme.breakpoints.down('md'));

  const { sold = [] , booked = [] } = props
  const [arr, setArr] = useState([0, 2.5, 5, 7.5, 10, 12.5, 15])
  const [oddA, setOddA] = useState(["A1", "A3", "A5", "A7", "A9", "A11", "A13", "A15"])
  const [evenA, setEvenA] = useState(["A2", "A4", "A6", "A8", "A10", "A12", "A14"])
  const [oddB, setOddB] = useState(["B1", "B3", "B5", "B7", "B9", "B11", "B13", "B15"])
  const [evenB, setEvenB] = useState(["B2", "B4", "B6", "B8", "B10", "B12", "B14"])
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [currentSeat, setCurrentSeat] = useState(null)

  useEffect(() => {
    if (currentSeat) {
      setIsConfirmVisible(true)
    }
  }, [currentSeat])

  const handleClose = () => {
    setCurrentSeat({})
    props.handleCancel()
  }

  const handleClick = async seat => {
    setCurrentSeat(seat)
  }

  const getSeatClass = (position) => {
    return `${
      sold.includes(position)
        ? `${classes.soldButton}`
        : booked.includes(position)
        ? `${classes.bookedButton}`
        : ''
    } ${classes.button} ${isMobileVesion ? classes.mobileButton : '' }`
  }

  const getSeatBtnStatus = (position) => {
    return Boolean(
      sold.includes(position) ||
      booked.includes(position)
    )
  }

  return (
    <div>
      <BootstrapDialog
        fullScreen={isMobileVesion}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.visible}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Выберите места
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid
            container
            className={classes.seat_dialog_row_wrapp}
          >
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
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
                      onClick={() => handleClick(oddA[i])}
                    >
                      <WeekendOutlinedIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      aria-label="seat"
                      component="span"
                      disabled={getSeatBtnStatus(evenA[i])}
                      className={getSeatClass(evenA[i])}
                      onClick={() => handleClick(evenA[i])}
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
              xs={2}
              sm={2}
              md={2}
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
                      onClick={() => handleClick(oddB[i])}
                    >
                      <WeekendOutlinedIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      aria-label="seat"
                      component="span"
                      disabled={getSeatBtnStatus(evenB[i])}
                      className={getSeatClass(evenB[i])}
                      onClick={() => handleClick(evenB[i])}
                    >
                      <WeekendOutlinedIcon />
                    </IconButton>
                  </div>
                )
              })}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </BootstrapDialog>

      {isConfirmVisible &&
        <ConfirmModal
          isVisible={isConfirmVisible}
          changeVisibility={setIsConfirmVisible}
          titleText={'Вы уверены?'}
          contentText={'Подтвердите пожалуйста свою бронь'}
          confirmButtonText={'Забронировать'}
          cancelButtonText={'Отмена'}
          confirmButtonHandler={() => props.handleUserBooked(currentSeat)}
        />
      }
    </div>
  )
}
