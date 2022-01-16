import "date-fns";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// styles
import styles from "@/styles/DataPicker.module.scss";
// makestales
import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
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
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
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
    </MuiPickersUtilsProvider>
  );
}
