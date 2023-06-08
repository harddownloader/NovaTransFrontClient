import React, { useState, useRef, useEffect } from "react"
import { isValid } from "date-fns"
import ruLocale from "date-fns/locale/ru"

// mui
import { Grid, InputAdornment } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { CalendarToday } from '@mui/icons-material'

// assets
import styles from "./DataPicker.module.scss"
import searchTicketsStyles from '@/components/HomePage/SearchTickets/SearchTickets.module.scss'

export interface IMaterialUIPickersProps {
  isLastElementInRow: boolean
  minDate: Date
  value: Date
  onChangeDate: Function
  classNames: string
  InputProps?: any
}

/*
* last mui data pickers migration:
* https://next.mui.com/x/migration/migration-pickers-v5/#input-renderer-required-in-v5
* */
export const MaterialUIPickers = ({
                                    isLastElementInRow,
                                    minDate,
                                    value,
                                    onChangeDate,
                                    classNames,
                                    InputProps={}
                                  }: IMaterialUIPickersProps) => {
  const [selectedDate, setSelectedDate] = useState(value)
  const [isOpen, setIsOpen] = useState(false)

  const refDatePicker = useRef(null)

  const handleDateChange = (date) => {
    const isValidDate = isValid(date)
    if (isValidDate) setSelectedDate(date)
    if (isValidDate) onChangeDate(date)
  }

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
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ruLocale}
      >
        <DatePicker
          label="Дата поездки"
          value={selectedDate}
          onChange={handleDateChange}
          minDate={minDate}
          className={
            `${styles.date_picker__container} ${classNames}`
          }
          ref={refDatePicker}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          slotProps={{
            textField: {
              // InputProps: {
              //     ...InputProps,
              //     startAdornment: (
              //       <InputAdornment position="start">
              //         <CalendarToday />
              //       </InputAdornment>
              //     ),
              //     endAdornment: null
              //   },
              endAdornment: null,
              className: `${styles.date_picker__container} ${styles.date_picker__input} ${searchTicketsStyles.searchField} ${isLastElementInRow ? styles.last_el : ''}`,
              onClick: (e) => setIsOpen(true),
            }
          }}
          // componentsProps={{
          //   textField: {
          //     // WHY it isn't works?
          //     InputProps: {
          //         ...InputProps,
          //         startAdornment: (
          //           <InputAdornment position="start">
          //             <CalendarToday />
          //           </InputAdornment>
          //         ),
          //         endAdornment: null
          //       },
          //     className: `${styles.date_picker__container} ${styles.date_picker__input} ${searchTicketsStyles.searchField} ${isLastElementInRow ? styles.last_el : ''}`,
          //     onClick: (e) => setIsOpen(true),
          //   }
          // }}
        />
      </LocalizationProvider>
    </Grid>
  )
}
