import { isValid } from "date-fns"
import React, { useState, useRef, useEffect } from "react"
import Grid from "@mui/material/Grid"
import ruLocale from "date-fns/locale/ru"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// styles
import styles from "./DataPicker.module.scss"
import searchTicketsStyles from '@/components/Home/SearchTickets/SearchTickets.module.scss'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'


export default function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = useState(props.value)
  const [isOpen, setIsOpen] = useState(false)

  const refDatePicker = useRef(null)

  const handleDateChange = (date) => {
    const isValidDate = isValid(date)
    if (isValidDate) setSelectedDate(date)
    if (isValidDate) props.onChangeDate(date)
  }

  const { isLastElementInRow, minDate } = props

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
    ) {
      
      refDatePicker.current.lastChild.style='borderRadius: 0 4px 4px 0'
    }
  })

  return (
    <Grid container justifyContent="space-around">
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker

          // --- OLD PROPERTIES ---
          // disableToolbar={true}
          // variant="inline"
          // format="MM/dd/yyyy"
          // margin="normal"
          // id="date-picker-inline"
          // KeyboardButtonProps={{
          //   "aria-label": "change date",
          // }}

          label="Дата поездки"
          value={selectedDate}
          onChange={handleDateChange}
          minDate={minDate}
          className={
            `${styles.date_picker__container} ${props.classes}` // props.classes - I don't know why, but that's doesn't work
          }
          ref={refDatePicker}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          renderInput={(props) => {
            return <TextField
                {...props}
                InputProps={{
                  ...props?.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                  endAdornment: null
                }}
                className={`${styles.date_picker__container} ${styles.date_picker__input} ${searchTicketsStyles.searchField} ${isLastElementInRow ? styles.last_el : ''}`}
                onClick={(e) => setIsOpen(true)}
              />
            }
          }
        />
      </LocalizationProvider>
    </Grid>
  )
}
