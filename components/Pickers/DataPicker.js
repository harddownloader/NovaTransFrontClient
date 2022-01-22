import "date-fns";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// styles
import styles from "@/styles/DataPicker.module.scss";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  date_picker: {
    backgroundColor: '#fff',
  },
  "& .last_el": {
    borderRadius: "0 4px 4px 0",
  },
}));

export default function MaterialUIPickers(props) {
  const classes = useStyles();
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(props.value);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.onChangeDate(date);
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container justify="space-around">
          {/* <DatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            // margin="normal"
            id="date-picker-inline"
            label="Дата поездки"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            className={`${styles.data_picker__container} ${props.classes}`}
            onAccept={() => setIsOpen(false)}
            open={isOpen}
            onClick={() => setIsOpen(true)}
            renderInput={(props) => <TextField {...props} />}
          /> */}
          <MobileDatePicker
            label="Дата поездки"
            inputFormat="MM/dd/yyyy"
            // value={value}
            value={selectedDate}
            // onChange={handleChange}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onAccept={() => setIsOpen(false)}
            // className={`${styles.data_picker__container} ${props.classes}`}
            className={classes.date_picker}
            // id="date-picker-inline"
          />
          {/* <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          /> */}
        </Grid>
      </LocalizationProvider>
  );
}
