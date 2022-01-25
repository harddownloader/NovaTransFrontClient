import "date-fns";
import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ruLocale from "date-fns/locale/ru";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// styles
import styles from "@/styles/DataPicker.module.scss";
// import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';


export default function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = useState(props.value);
  const [isOpen, setIsOpen] = useState(false);

  const refDatePicker = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.onChangeDate(date);
  };

  const { isLastElementInRow } = props;

  useEffect(() => {
    /**
     * из-за того что у datepicker-a не работает вставка прописного класса в className
     * (по непонятным мне причинам)
     * пришлось прокидывать border-radius через ref 
     */
    if (
      refDatePicker &&
      refDatePicker.hasOwnProperty('current') &&
      refDatePicker.current &&
      refDatePicker.current.hasOwnProperty('lastChild') &&
      refDatePicker.current.lastChild &&
      refDatePicker.current.lastChild.hasOwnProperty('style')
    ) refDatePicker.current.lastChild.style='border-radius: 0 4px 4px 0'
  })

  return (
    <Grid container justifyContent="space-around">
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker
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
          className={
            `${styles.date_picker__container} ${props.classes}`
          }
          ref={refDatePicker}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
            renderInput={(props) => {
              return <TextField
                {...props}
                className={`${styles.date_picker__container} ${styles.date_picker__input} ${isLastElementInRow ? styles.last_el : ''}`}
                onClick={(e) => setIsOpen(true)}
              />
            }
            }
        />
      </LocalizationProvider>
    </Grid>
  );
}
