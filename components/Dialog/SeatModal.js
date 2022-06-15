import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import Swal from "sweetalert2";
import ConfirmModal from './ConfirmModal'
import classes from './SeatModal.module.scss'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

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
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function SeatModal(props) {
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
    // setOpen(false);
    setCurrentSeat({})
    props.handleCancel()
  };

  const handleClick = async seat => {
    // confirm modal
    // Swal.fire({
    //   title: "Вы уверены?",
    //   text: "Подтвердите пожалуйста свою бронь!",
    //   type: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3f51b5",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Забронировать"
    // }).then(result => {
    //   // if user confirm his choise
    //   if (result.value) {
    //     props.handleUserBooked(seat)
    //   }
    // });
    setCurrentSeat(seat)
  };




  return (
    <div>
      <BootstrapDialog
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
              // columns={{ xs: 4, sm: 8, md: 8 }}
              className={classes.seat_dialog_row_wrapp}
            >
              <Grid
                item
                // xs="auto"
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
                      disabled={
                        sold.includes(oddA[i])
                          ? true
                          : booked.includes(oddA[i])
                          ? true
                          : false
                      }
                      style={
                        sold.includes(oddA[i])
                          ? styles.soldButton
                          : booked.includes(oddA[i])
                          ? styles.bookedButton
                          : styles.button
                      }
                      onClick={() => handleClick(oddA[i])}
                    >
                      <WeekendOutlinedIcon />
                    </IconButton>

                    <IconButton
                      
                      color="primary"
                      aria-label="seat"
                      component="span"
                      disabled={
                        sold.includes(evenA[i])
                          ? true
                          : booked.includes(evenA[i])
                          ? true
                          : false
                      }
                      style={
                        sold.includes(evenA[i])
                          ? styles.soldButton
                          : booked.includes(evenA[i])
                          ? styles.bookedButton
                          : styles.button
                      }
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
                // xs
                // xs="auto"
                // xs={8}
                xs={4}
                // sm={8}
                // md={8}
              ></Grid>
              <Grid
                item
                // xs="auto"
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
                      disabled={
                        sold.includes(oddB[i])
                          ? true
                          : booked.includes(oddB[i])
                          ? true
                          : false
                      }
                      style={
                        sold.includes(oddB[i])
                          ? styles.soldButton
                          : booked.includes(oddB[i])
                          ? styles.bookedButton
                          : styles.button
                      }
                      onClick={() => handleClick(oddB[i])}
                    >
                      <WeekendOutlinedIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      aria-label="seat"
                      component="span"
                      disabled={
                        sold.includes(evenB[i])
                          ? true
                          : booked.includes(evenB[i])
                          ? true
                          : false
                      }
                      style={
                        sold.includes(evenB[i])
                          ? styles.soldButton
                          : booked.includes(evenB[i])
                          ? styles.bookedButton
                          : styles.button
                      }
                      onClick={() => handleClick(evenB[i])}
                    >
                      <WeekendOutlinedIcon />
                    </IconButton>
                  </div>
                )
              })}
              </Grid>
            </Grid>


          {/* <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <div className={classes.seat_modal_footer}>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              style={
                styles.button
                // sold.includes(evenB[i])
                //   ? styles.soldButton
                //   : booked.includes(evenB[i])
                //   ? styles.bookedButton
                //   : styles.button
              }
            >
              <WeekendOutlinedIcon />&nbsp;Доступно
            </IconButton>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              style={styles.bookedButton}
            >
              <WeekendOutlinedIcon />&nbsp;Забронировано
            </IconButton>
            <IconButton
              color="primary"
              aria-label="seat"
              component="span"
              style={styles.soldButton}
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
  );
}

const styles = {
  wrapper: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center"
  },
  steer: {
    margin: ".5rem",
    position: "relative",
    top: 0,
    // left: "12rem"
  },
  img: {
    height: "3rem",
    // transform: "rotate(90deg)"
  },
  busDiv: {
    background: "#434343",
    height: "18rem",
    position: "relative",
    width: "17rem",
    color: "#ffff"
  },
  secondCol: {
    position: "absolute",
    top: 0,
    right: 0
  },
  soldButton: {
    color: "#ff4d4f",
    margin: ".5rem"
  },
  bookedButton: {
    color: "#434343",
    margin: ".5rem"
  },
  button: {
    margin: ".5rem"
  }
};
