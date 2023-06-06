import React, { useState, useEffect } from "react"
import { format } from "date-fns" // time and data
import Router from "next/router"

// mui
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  useMediaQuery,
  Autocomplete
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined'
import SouthEastOutlinedIcon from '@mui/icons-material/SouthEastOutlined'

// project components
import { MaterialUIPickers } from "@/components/Pickers/DatePicker"

// store
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import { selectLocations } from '@/store/locations/locationsSlice'

// types
import { ISearchForm } from "@/interfaces/searchform"
import { futureAnyFix } from "@/interfaces/futureAnyFix"

// helpers
import { convertDateObjToString } from "@/components/HomePage/SearchTickets/helpers"

// assets
const BgImage = "/static/img/backgrounds/bg-winter.jpg"
import styles from './SearchTickets.module.scss'

const useStyles = makeStyles((theme) => {
  return {
  // container
  heroContent: (props: {
    isBackTicketFieldsShow: boolean
  }) => ({
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${BgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "cover",
    marginTop: "-85px",

    padding: props.isBackTicketFieldsShow ? theme.spacing(6, 0, 14) : theme.spacing(1, 0, 1),
  }),
  // grid select
  gridSelect: {
    padding: "0 !important",
    color: "#fff",
  },
  // form control for select
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    width: "100%",
    // нижние подчеркивание
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "&.center_el": {
      borderRight: "1px solid rgb(233, 233, 233)",
      borderLeft: "1px solid rgb(233, 233, 233)",
    },
  },
  // select
  select: {},
  // data picker
  dataPicker: {},
  // selects + data pickers
  searchField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    "&.first_el": {
      borderRadius: "4px 0 0 4px",
    },
    "&.first_el:hover": {
      borderRadius: "4px 0 0 4px",
    },
  },
  searchFieldRenderedInput: {
    "&.first_input_el .MuiInputBase-root": {
      borderRadius: "4px 0 0 4px",
    },
    "&.middle_input_el .MuiInputBase-root": {
      borderRadius: "0px",
    },
  }
}})
//
// const currentDateObj = new Date()

export interface TSearchTickets {
  type?: "searchPage"
  info?: ISearchForm
}

// function SearchTickets_old(props: TSearchTickets) {
//   const theme = useTheme()
//   const isNotMobile = useMediaQuery(theme.breakpoints.up('md'))
//
//   const dispatch = useAppDispatch()
//   const {
//     data,
//     pending,
//     error,
//   } = useAppSelector(selectLocations)
//
//   // checkbox------------------
//   const [isBackTicketFieldsShow, setIsBackTicketFieldsShow] = useState(Boolean(
//     !(!props?.info?.returnStartLocation && props?.info?.startLocation)
//   ))
//   const classes = useStyles({ isBackTicketFieldsShow: isBackTicketFieldsShow })
//
//   // a list of cities
//   const [locations, setLocations] = useState([])
//
//   // fields
//   const [formData, setFormData] = useState<ISearchForm | futureAnyFix>({
//     startLocation: props?.info?.startLocation ? props.info.startLocation : null,
//     endLocation: props?.info?.endLocation ? props.info.endLocation : null,
//     journeyDate: props?.info?.journeyDate ? new Date(props.info.journeyDate) : currentDateObj,
//
//     returnStartLocation: props?.info?.returnStartLocation ? props.info.returnStartLocation : null,
//     returnEndLocation: props?.info?.returnEndLocation ? props.info.returnEndLocation : null,
//     returnJourneyDate: props?.info?.returnJourneyDate ? new Date(props.info.returnJourneyDate) : currentDateObj,
//   })
//
//   const onChangeDirectionField = (newValue, nameOfObjectsKeyForChange) => {
//     const newValueObj = locations.find(location => location.name === newValue)
//     setFormData({ ...formData, ...{ [`${nameOfObjectsKeyForChange}`]: newValueObj ? newValueObj._id : null } })
//   }
//
//   const onChangeDate = (val, inputName) => {
//     const journeyDate = format(val, "yyyy-MM-dd")
//     setFormData({ ...formData, ...{ [`${inputName}`]: journeyDate } })
//   }
//
//   useEffect(() => {
//     if (data.length && !pending) setLocations(data)
//   }, [data])
//
//   useEffect(() => {
//     if (!isBackTicketFieldsShow) {
//       setFormData({
//         ...formData,
//         returnStartLocation: null,
//         returnEndLocation: null,
//         returnJourneyDate: null,
//       })
//     }
//   }, [isBackTicketFieldsShow])
//
//   const searchTicketsRequestHandler = () => {
//     const requestBody = {
//       ...formData
//     }
//     if (formData.journeyDate instanceof Date) requestBody.journeyDate = convertDateObjToString(requestBody.journeyDate)
//     if (formData.returnJourneyDate instanceof Date) requestBody.returnJourneyDate = convertDateObjToString(requestBody.returnJourneyDate)
//
//     Router.push({
//       pathname: "/buses",
//       query: requestBody,
//     })
//   }
//
//   /**
//    *
//    * @param {number} status
//    * @returns jsx component
//    *
//    * status = 1 - desktop
//    * status = 2 - mobile
//    */
//   const getSearchTicketsBtn = (status) => {
//     if (
//       (status === 1 && !isNotMobile) ||
//       (status === 2 && isNotMobile)
//     ) return <></>
//
//     return (
//       <Grid item xs={12} sm={12} md={3} className={classes.gridSelect}>
//         <Box
//           sx={{
//             ml: !isNotMobile ? 0 : 1,
//             mt: !isNotMobile ? 1 : 0
//           }}
//           className={styles.search_btn_container}
//         >
//           <Button
//             variant="contained"
//             size="large"
//             color="primary"
//             className={styles.search_btn}
//             onClick={searchTicketsRequestHandler}
//             disabled={!Boolean(
//               formData?.startLocation &&
//               formData?.endLocation &&
//               formData?.journeyDate
//             )}
//             startIcon={<SearchIcon/>}
//             fullWidth
//           >
//             Найти билет
//           </Button>
//         </Box>
//       </Grid>
//     )
//   }
//
//   const optionsLocations = locations.length ? locations.map(location => location.name) : []
//
//   const getAutoCompleteValue = (nameField) => {
//     return locations.find(location => location._id === formData[`${nameField}`])
//   }
//
//   const fromValue = getAutoCompleteValue("startLocation")
//   const toValue = getAutoCompleteValue("endLocation")
//   const returnFromValue = getAutoCompleteValue("returnStartLocation")
//   const returnToValue = getAutoCompleteValue("returnEndLocation")
//
//   return (
//       <div className={classes.heroContent}>
//         {props.type !== "searchPage" ? (
//           // welcome block
//           <Container maxWidth="md" className={styles.welcome_block}>
//             <Typography
//               component="h1"
//               variant={isNotMobile ? "h2" : "h4"}
//               align="center"
//               // color="textPrimary"
//               gutterBottom
//               className={styles.heading}
//             >
//               Билеты на автобус
//             </Typography>
//             <Typography
//               variant={isNotMobile ? "h5" : "h6"}
//               align="center"
//               // color="textSecondary"
//               paragraph
//               className={styles.heading}
//             >
//               по Украине, Молдавии, Румынии и Болгарии
//             </Typography>
//           </Container>
//         ) : <></>}
//
//         {/* thither */}
//         <Container maxWidth="md" className={`${styles.search_tickets} ${props.type === "searchPage" ? styles.search_tickets_on_search_page : ''}`}>
//           <Grid container gap={0}>
//             {/* откуда */}
//             <Grid item xs={12} sm={12} md={3} className={classes.gridSelect}>
//               <Autocomplete
//                   disablePortal
//                   id="toCity1"
//                   className={`${classes.select} ${classes.searchField} ${styles.searchField} first_el`}
//                   noOptionsText="Не найдено"
//                   loading={pending}
//                   loadingText="Загрузка..."
//                   value={fromValue?.name ? fromValue.name : null}
//                   options={optionsLocations}
//                   onChange={(event, newValue) => onChangeDirectionField(newValue, "startLocation")}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       InputProps={{
//                         ...params?.InputProps,
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <NorthEastOutlinedIcon />
//                           </InputAdornment>
//                         )
//                       }}
//                       label="Откуда"
//                       className={`${classes.searchFieldRenderedInput} first_input_el`}
//                     />
//                   )}
//                 />
//             </Grid>
//             {/* куда */}
//             <Grid item xs={12} sm={12} md={3} className={classes.gridSelect}>
//               <Autocomplete
//                   disablePortal
//                   id="toCity2"
//                   className={`${classes.select} ${classes.searchField} ${styles.searchField}`}
//                   noOptionsText="Не найдено"
//                   loading={pending}
//                   loadingText="Загрузка..."
//                   value={toValue?.name ? toValue.name : null}
//                   options={optionsLocations}
//                   onChange={(event, newValue) => onChangeDirectionField(newValue, "endLocation")}
//                   style={{borderRadius: '0px'}}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       InputProps={{
//                         ...params?.InputProps,
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <SouthEastOutlinedIcon />
//                           </InputAdornment>
//                         )
//                       }}
//                       label="Куда"
//                       className={`${classes.searchFieldRenderedInput} middle_input_el`}
//                     />
//                   )}
//                 />
//             </Grid>
//
//             <Grid item xs={12} sm={12} md={3}
//               className={`${classes.gridSelect}`}
//             >
//               <MaterialUIPickers
//                 value={formData.journeyDate}
//                 minDate={currentDateObj}
//                 onChangeDate={(val) => onChangeDate(val, 'journeyDate')}
//                 classNames={`${classes.dataPicker} ${classes.searchField}`}
//                 isLastElementInRow
//               />
//             </Grid>
//
//             {/* search btn */}
//             {getSearchTicketsBtn(1)}
//           </Grid>
//
//           {/* back tickets checkbox */}
//             <Grid container gap={3} justifyContent={isNotMobile ? "start" : "center"}>
//               <Grid item xs={10} sm={10} md={6} className={styles.returnBackCheckboxWrap}>
//                 <FormGroup row>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={isBackTicketFieldsShow}
//                         onChange={(e) => setIsBackTicketFieldsShow(!isBackTicketFieldsShow)}
//                         color="primary"
//                         className={styles.returnBackCheckbox}
//                         sx={{
//                           color: blue[700],
//                           '&.Mui-checked': {
//                             color: blue[700],
//                           },
//                         }}
//                       />
//                     }
//                     className={styles.customFormControlClass}
//                     label="Обратный билет"
//                     sx={{
//                       color: '#fff', fontSize: 34,
//                     }}
//                   />
//                 </FormGroup>
//               </Grid>
//             </Grid>
//           {/* checkbox end */}
//         </Container>
//
//         {/* back */}
//         <Collapse in={isBackTicketFieldsShow}>
//           <Container
//             maxWidth="md"
//             className={`search-tickets ${styles.return_trip} ${
//               isBackTicketFieldsShow ? "activate" : ""
//             }`}
//           >
//             <Grid container gap={0}>
//               {/* откуда */}
//               <Grid item xs={12} sm={12} md={3}>
//                 <Autocomplete
//                   disablePortal
//                   id="fromCity1"
//                   className={`${classes.select} ${classes.searchField}  ${styles.searchField} first_el`}
//                   noOptionsText="Не найдено"
//                   loadingText="Загрузка..."
//                   options={optionsLocations}
//                   value={returnFromValue?.name ? returnFromValue.name : null}
//                   onChange={(val, newValue) => onChangeDirectionField(newValue, "returnStartLocation")}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       InputProps={{
//                         ...params?.InputProps,
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <NorthEastOutlinedIcon />
//                           </InputAdornment>
//                         )
//                       }}
//                       label="Откуда"
//                       className={`${classes.searchFieldRenderedInput} first_input_el`}
//                     />
//                   )}
//                 />
//               </Grid>
//               {/* куда */}
//               <Grid item xs={12} sm={12} md={3}>
//                 <Autocomplete
//                   disablePortal
//                   id="fromCity2"
//                   className={`${classes.select} ${classes.searchField} ${styles.searchField}`}
//                   noOptionsText="Не найдено"
//                   loadingText="Загрузка..."
//                   options={optionsLocations}
//                   value={returnToValue?.name ? returnToValue.name : null}
//                   onChange={(val, newValue) => onChangeDirectionField(newValue, "returnEndLocation")}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       InputProps={{
//                         ...params?.InputProps,
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <SouthEastOutlinedIcon />
//                           </InputAdornment>
//                         )
//                       }}
//                       label="Куда"
//                       className={`${classes.searchFieldRenderedInput} middle_input_el`}
//                     />
//                   )}
//                 />
//               </Grid>
//
//               <Grid item xs={12} sm={12} md={3}>
//                 <MaterialUIPickers
//                   value={formData.returnJourneyDate}
//                   minDate={currentDateObj}
//                   onChangeDate={(val) => onChangeDate(val, 'returnJourneyDate')}
//                   classNames={`${classes.dataPicker} ${classes.searchField}`}
//                   isLastElementInRow
//                 />
//               </Grid>
//             </Grid>
//           </Container>
//           </Collapse>
//         {/* two part end*/}
//
//         {/* search btn */}
//         <Container>
//           {getSearchTicketsBtn(2)}
//         </Container>
//       </div>
//   )
// }


// export const SearchTickets = ({ type, info }: TSearchTickets) => {
//   console.log('SearchTickets props', {type, info})
//   const theme = useTheme()
//   const isNotMobile = useMediaQuery(theme.breakpoints.up('md'))
//
//   const dispatch = useAppDispatch()
//   const {
//     data,
//     pending,
//     error,
//   } = useAppSelector(selectLocations)
//
//   // checkbox------------------
//   const [isBackTicketFieldsShow, setIsBackTicketFieldsShow] = useState(Boolean(
//     !(!info?.returnStartLocation && info?.startLocation)
//   ))
//   const classes = useStyles({ isBackTicketFieldsShow: isBackTicketFieldsShow })
//
//   // a list of cities
//   const [locations, setLocations] = useState([])
//
//   // fields
//   const [formData, setFormData] = useState<ISearchForm | futureAnyFix>({
//     startLocation: info?.startLocation ? info.startLocation : null,
//     endLocation: info?.endLocation ? info.endLocation : null,
//     journeyDate: info?.journeyDate ? new Date(info.journeyDate) : currentDateObj,
//
//     returnStartLocation: info?.returnStartLocation ? info.returnStartLocation : null,
//     returnEndLocation: info?.returnEndLocation ? info.returnEndLocation : null,
//     returnJourneyDate: info?.returnJourneyDate ? new Date(info.returnJourneyDate) : currentDateObj,
//   })
//
//   const onChangeDirectionField = (newValue, nameOfObjectsKeyForChange) => {
//     const newValueObj = locations.find(location => location.name === newValue)
//     setFormData({ ...formData, ...{ [`${nameOfObjectsKeyForChange}`]: newValueObj ? newValueObj._id : null } })
//   }
//
//   const onChangeDate = (val, inputName) => {
//     const journeyDate = format(val, "yyyy-MM-dd")
//     setFormData({ ...formData, ...{ [`${inputName}`]: journeyDate } })
//   }
//
//   useEffect(() => {
//     if (data.length && !pending) setLocations(data)
//   }, [data])
//
//   useEffect(() => {
//     if (!isBackTicketFieldsShow) {
//       setFormData({
//         ...formData,
//         returnStartLocation: null,
//         returnEndLocation: null,
//         returnJourneyDate: null,
//       })
//     }
//   }, [isBackTicketFieldsShow])
//
//   const searchTicketsRequestHandler = () => {
//     const requestBody = {
//       ...formData
//     }
//     if (formData.journeyDate instanceof Date) requestBody.journeyDate = convertDateObjToString(requestBody.journeyDate)
//     if (formData.returnJourneyDate instanceof Date) requestBody.returnJourneyDate = convertDateObjToString(requestBody.returnJourneyDate)
//
//     Router.push({
//       pathname: "/buses",
//       query: requestBody,
//     })
//   }
//
//   /**
//    *
//    * @param {number} status
//    * @returns jsx component
//    *
//    * status = 1 - desktop
//    * status = 2 - mobile
//    */
//   const getSearchTicketsBtn = (status) => {
//     if (
//       (status === 1 && !isNotMobile) ||
//       (status === 2 && isNotMobile)
//     ) return <></>
//
//     return (
//       <Grid item xs={12} sm={12} md={3} className={classes.gridSelect}>
//         <Box
//           sx={{
//             ml: !isNotMobile ? 0 : 1,
//             mt: !isNotMobile ? 1 : 0
//           }}
//           className={styles.search_btn_container}
//         >
//           <Button
//             variant="contained"
//             size="large"
//             color="primary"
//             className={styles.search_btn}
//             onClick={searchTicketsRequestHandler}
//             disabled={!Boolean(
//               formData?.startLocation &&
//               formData?.endLocation &&
//               formData?.journeyDate
//             )}
//             startIcon={<SearchIcon/>}
//             fullWidth
//           >
//             Найти билет
//           </Button>
//         </Box>
//       </Grid>
//     )
//   }
//
//   const optionsLocations = locations.length ? locations.map(location => location.name) : []
//
//   const getAutoCompleteValue = (nameField) => {
//     return locations.find(location => location._id === formData[`${nameField}`])
//   }
//
//   const fromValue = getAutoCompleteValue("startLocation")
//   const toValue = getAutoCompleteValue("endLocation")
//   const returnFromValue = getAutoCompleteValue("returnStartLocation")
//   const returnToValue = getAutoCompleteValue("returnEndLocation")
//
//   return (
//     <>
//       <h1>SearchTickets</h1>
//     </>
//   )
// }


export const SearchTickets = ({ type='searchPage', info={} }) => {
  console.log('SearchTickets props', {type, info})
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('md'))

  const dispatch = useAppDispatch()
  const {
    data,
    pending,
    error,
  } = useAppSelector(selectLocations)


  // // checkbox------------------
  const [isBackTicketFieldsShow, setIsBackTicketFieldsShow] = useState(Boolean(
    !(!info?.returnStartLocation && info?.startLocation)
  ))
  // const classes = useStyles({ isBackTicketFieldsShow: isBackTicketFieldsShow })
  //
  // // a list of cities
  // const [locations, setLocations] = useState([])
  //
  // // fields
  // const [formData, setFormData] = useState<ISearchForm | futureAnyFix>({
  //   startLocation: info?.startLocation ? info.startLocation : null,
  //   endLocation: info?.endLocation ? info.endLocation : null,
  //   journeyDate: info?.journeyDate ? new Date(info.journeyDate) : currentDateObj,
  //
  //   returnStartLocation: info?.returnStartLocation ? info.returnStartLocation : null,
  //   returnEndLocation: info?.returnEndLocation ? info.returnEndLocation : null,
  //   returnJourneyDate: info?.returnJourneyDate ? new Date(info.returnJourneyDate) : currentDateObj,
  // })
  //
  // const onChangeDirectionField = (newValue, nameOfObjectsKeyForChange) => {
  //   const newValueObj = locations.find(location => location.name === newValue)
  //   setFormData({ ...formData, ...{ [`${nameOfObjectsKeyForChange}`]: newValueObj ? newValueObj._id : null } })
  // }
  //
  // const onChangeDate = (val, inputName) => {
  //   const journeyDate = format(val, "yyyy-MM-dd")
  //   setFormData({ ...formData, ...{ [`${inputName}`]: journeyDate } })
  // }
  //
  // useEffect(() => {
  //   if (data.length && !pending) setLocations(data)
  // }, [data])
  //
  // useEffect(() => {
  //   if (!isBackTicketFieldsShow) {
  //     setFormData({
  //       ...formData,
  //       returnStartLocation: null,
  //       returnEndLocation: null,
  //       returnJourneyDate: null,
  //     })
  //   }
  // }, [isBackTicketFieldsShow])
  //
  // const searchTicketsRequestHandler = () => {
  //   const requestBody = {
  //     ...formData
  //   }
  //   if (formData.journeyDate instanceof Date) requestBody.journeyDate = convertDateObjToString(requestBody.journeyDate)
  //   if (formData.returnJourneyDate instanceof Date) requestBody.returnJourneyDate = convertDateObjToString(requestBody.returnJourneyDate)
  //
  //   Router.push({
  //     pathname: "/buses",
  //     query: requestBody,
  //   })
  // }
  //
  // /**
  //  *
  //  * @param {number} status
  //  * @returns jsx component
  //  *
  //  * status = 1 - desktop
  //  * status = 2 - mobile
  //  */
  // const getSearchTicketsBtn = (status) => {
  //   if (
  //     (status === 1 && !isNotMobile) ||
  //     (status === 2 && isNotMobile)
  //   ) return <></>
  //
  //   return (
  //     <Grid item xs={12} sm={12} md={3} className={classes.gridSelect}>
  //       <Box
  //         sx={{
  //           ml: !isNotMobile ? 0 : 1,
  //           mt: !isNotMobile ? 1 : 0
  //         }}
  //         className={styles.search_btn_container}
  //       >
  //         <Button
  //           variant="contained"
  //           size="large"
  //           color="primary"
  //           className={styles.search_btn}
  //           onClick={searchTicketsRequestHandler}
  //           disabled={!Boolean(
  //             formData?.startLocation &&
  //             formData?.endLocation &&
  //             formData?.journeyDate
  //           )}
  //           startIcon={<SearchIcon/>}
  //           fullWidth
  //         >
  //           Найти билет
  //         </Button>
  //       </Box>
  //     </Grid>
  //   )
  // }
  //
  // const optionsLocations = locations.length ? locations.map(location => location.name) : []
  //
  // const getAutoCompleteValue = (nameField) => {
  //   return locations.find(location => location._id === formData[`${nameField}`])
  // }
  //
  // const fromValue = getAutoCompleteValue("startLocation")
  // const toValue = getAutoCompleteValue("endLocation")
  // const returnFromValue = getAutoCompleteValue("returnStartLocation")
  // const returnToValue = getAutoCompleteValue("returnEndLocation")

  return (
    <>
      <h1>SearchTickets mock v2.1</h1>
    </>
  )
}

export default SearchTickets
