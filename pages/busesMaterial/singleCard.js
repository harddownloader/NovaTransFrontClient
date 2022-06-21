import React, { useState, useEffect } from "react"
import Alert from '@mui/material/Alert'
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
// import { Card, Row, Col, Modal, Button } from "antd"
import SeatModal from '@/components/Dialog/SeatModal'
import TripDetails from "@/components/Dialog/TripDetails"
import Router from "next/router"
// import SeatDetails from "./seatDetails"
import { API_ROOT } from "../../utils/config"
import { enc, dec } from "../../utils/encdec"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
// sass
import styles from "./SingleCard.module.scss"
import stCollapse from "./SingleCard.Collapse.module.scss"

const SingleCard = (props) => {
  const theme = useTheme()
  const isMobileVesion = !useMediaQuery(theme.breakpoints.up('sm'))
  console.log({ isMobileVesion })
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     expanded: false,
  //     visibleSeatModal: false,
  //     visibleDetailsModal: false,
  //     userBooked: [],
  //     // инфо о билете
  //     bus: props.bus,
  //     months: [
  //       "января",
  //       "февраля",
  //       "марта",
  //       "апреля",
  //       "мая",
  //       "июня",
  //       "июля",
  //       "августа",
  //       "сентября",
  //       "ноября",
  //       "декабря",
  //     ],
  //     ticketDescription: null,
  //   };

  //   this.handleExpandClick = this.handleExpandClick.bind(this);
  // }

  const [expanded, setExpanded] = useState(false)
  const [visibleSeatModal, setVisibleSeatModal] = useState(false)
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false)
  const [userBooked, setUserBooked] = useState([])
  const [bus, setBus] = useState(props.bus)
  // const [months, setMonths] = useState([
  //   "января",
  //   "февраля",
  //   "марта",
  //   "апреля",
  //   "мая",
  //   "июня",
  //   "июля",
  //   "августа",
  //   "сентября",
  //   "ноября",
  //   "декабря",
  // ])
  const [ticketDescription, setTicketDescription] = useState(false)
  const [isLoading , setIsLoading] = useState(true)


  // componentDidMount() {
  //   const { bus } = this.state

  //   const ticketDescription = this.getFirstAndFinishedPoints(bus.wayStations)
  //   this.setState({ticketDescription})
  // }
  useEffect(() => {
    const ticketDescription = getFirstAndFinishedPoints(bus.wayStations)
    setTicketDescription(ticketDescription)
  }, [])

  const handleExpandClick = () => {
    // this.setState({ expanded: !this.state.expanded });
    setExpanded(!expanded)
  }

  // бронь
  const showSeatModal = (e) => {
    e.stopPropagation()
    // this.setState({
    //   visibleSeatModal: true,
    //   loading: false,
    // });
    setVisibleSeatModal(true)
    setIsLoading(false)
  };

  const handleCancel = (e) => {
    e.stopPropagation()
    // this.setState({
    //   visibleSeatModal: false,
    // });
    setVisibleSeatModal(false)
  };

  // modal with trip details
  const showDetailModal = (e) => {
    e.stopPropagation()
    if (!isMobileVesion) return
    // this.setState({
    //   visibleDetailsModal: true,
    //   loading: false,
    // })
    setVisibleDetailsModal(true)
    setIsLoading(false)
  }

  const handleDetailModalCancel = (e) => {
    e.stopPropagation()
    // this.setState({
    //   visibleDetailsModal: false,
    // })
    setVisibleDetailsModal(false)
  }

  const handleUserBooked = (seat) => {
    // let arr = [...this.state.userBooked];
    // arr.push(seat);
    // this.setState({userBooked: arr});
    encryptInfo(seat)
    // console.log(this.props)
  };

  const handleSuccess = (info) => {
    // this.setState({ loading: true })
    // setTimeout(() => {
    //   this.setState({ loading: false, visibleSeatModal: false })
    //   Router.push({
    //     pathname: "/details",
    //     query: { info },
    //   });
    // }, 1000)
    Router.push({
      pathname: "/details",
      query: { info },
    })
  }

  const encryptInfo = (seat) => {
    const {
      startLocation,
      endLocation,
      fare,
      journeyDate,
      // travel,
      slug
    } = props.bus
    const start = startLocation.name
    const end = endLocation.name
    // const travelName = travel.name;
    // const info = { start, end, fare, journeyDate, travelName, seat, slug }
    const info = { start, end, fare, journeyDate, seat, slug }
    const resp = enc(info)
    handleSuccess(resp)
  }

  const getTripContent = (ticketDescription, bus, stCollapse, isTimeInTripVisible) => {
    return (
      <div
        className={stCollapse.tabPanel}
        role="tabpanel"
        id="react-tabs-17"
        aria-labelledby="react-tabs-16"
      >

        {isTimeInTripVisible && <div className={`${styles.timeInRoadWrapper}`}>
          <span className={styles.timeInRoad}>
            {ticketDescription?.timeInTrip} в&nbsp;пути
          </span>
        </div>}

        <div className={stCollapse.detailsRoute}>
          <div className={`${stCollapse.detailsRouteColumn} ${stCollapse.fistCol}`}>
            <div className={stCollapse.detailsRouteInfo}>
              <p>
                <span>
                  Рейс №{" "}
                  <span className={stCollapse.bold}>
                    {bus?.name} Борисполь (аэропорт) - Одесса
                  </span>
                  , по маршруту{" "}
                  <span className={stCollapse.bold}>{ticketDescription?.start?.city} — {ticketDescription?.end?.city}</span>
                </span>
                <span>
                  , на{" "}
                  <span className={stCollapse.bold}>21 июля 2021</span>{" "}
                  года
                </span>
                <span>
                  {" "}
                  в <span className={stCollapse.bold}>{ticketDescription?.start?.time}</span>
                </span>
              </p>
              <p>Тип рейса: Регулярный</p>
              <p>Отправление и прибытие по местному времени</p>
            </div>
          </div>
          <div className={`${stCollapse.detailsRouteColumn} ${stCollapse.secondCol}`}></div>
        </div>
        <div className={stCollapse.details}>
          <div className={stCollapse.detailsContent}>
            <div>
              <div className={stCollapse.wrapperPoints}>
                <span
                  className={stCollapse.mobile_ticket__segment_divider}
                ></span>

                {bus.wayStations.map((station, stationIndex) => {
                  const date = getLocaleDate(station.date)
                  let isDateVisible = true

                  // if date was dublicate
                  if (
                    stationIndex !== 0 &&
                    getLocaleDate(bus.wayStations[stationIndex - 1].date) === date
                  ) isDateVisible = false

                  return (
                    <div
                      key={station.station}
                      className={stCollapse.item}
                    >
                      <div>
                        <div className={stCollapse.time}>{station.time}</div>
                        {isDateVisible && <div className={stCollapse.date}>{date}</div>}
                      </div>
                      <div>
                        <div className={stCollapse.city}>{station.city}</div>
                        <div className={stCollapse.address}>{station.station}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <ul className={stCollapse.listUnstyled}>
                <li className={stCollapse.title}>
                  Перевозчик
                  <div
                    className={`${stCollapse.d_inline_block} ${stCollapse.pointer}`}
                  >
                    <span>
                      <div>
                        <i
                          className={`${stCollapse.icon} ${stCollapse.icon_info} ${stCollapse.text_primary} ${stCollapse.pointer}`}
                        ></i>
                      </div>
                    </span>
                  </div>
                </li>
                <p>
                  Перевозчик:{" "}
                  <strong>
                    {bus?.carrierBrand}
                  </strong>
                </p>
                <p>
                  Автобус:{" "}
                  <strong>
                    {bus?.carrierBus}{" "}
                  </strong>
                </p>
              </ul>
            </div>
          </div>
          {bus?.features && <Alert severity="info">{bus.features}</Alert>}
        </div>
        <div></div>
      </div>
    )
  }

  const getLocaleDate = (date) => {
    const dateObj = new Date(date);
    const optionsDate = {  month: 'long', day: 'numeric' }

    return dateObj.toLocaleDateString('ru-RU', optionsDate)
  }

  const getFirstAndFinishedPoints = (wayStations) => {
    if (!Array.isArray(wayStations) || !wayStations.length) return {
      start: '',
      end: '',
      timeInTrip: 'не указано сколько ',
    }

    const start = wayStations[0]
    const end = wayStations[wayStations.length - 1]
    
    const startDateTime = new Date(`${start.date}T${start.time}:00`)
    const endDateTime = new Date(`${end.date}T${end.time}:00`)
    const timeInTripMilliseconds = Math.abs(endDateTime - startDateTime)
    const timeInTrip = getDateLineFromMilliseconds(timeInTripMilliseconds)

    return {
      start: start,
      end: end,
      timeInTrip
    }
  }

  const getDateLineFromMilliseconds = (milliseconds) => {
    const diffDays = Math.floor(milliseconds / 86400000) // days
    const diffHrs = Math.floor((milliseconds % 86400000) / 3600000) // hours
    const diffMins = Math.round(((milliseconds % 86400000) % 3600000) / 60000) // minutes
    console.log(diffDays + " дней, " + diffHrs + " часов, " + diffMins + " минут")
    return `${diffDays ? diffDays + 'д.' : ''}  ${diffHrs ? diffHrs + 'ч.' : ''}  ${diffMins + 'мин.'}`
  }

  return (
    <div className={styles.ticket}>
      <div className={styles.root} onClick={(e) => showDetailModal(e)}>
        <div className={styles.wrapper}>
          <span
            type="only"
            className={`${styles.badge} ${styles.badge_type1}`}
          >
            Эксклюзивная цена
          </span>
          {/* <span
            type="eticket"
            className={`${styles.badge} ${styles.badge_type2}`}
          >
            Можно не печатать
          </span> */}
        </div>
        <div type="only" className={styles.preview}>
          <span className={`${styles.badge} ${styles.bg_success}`}></span>
          <div className={`${styles.gridBody} ${styles.grid}`}>
            <div className={styles.gridLeft}>

              <div className={`${styles.timeInRoadWrapper} ${styles.timeInRoadWrapperMobile}`}>
                <span className={styles.timeInRoad}>
                  {ticketDescription?.timeInTrip} в&nbsp;пути
                </span>
              </div>

              <div className={styles.items}>
                <div className={`${styles.pointItemWrapper} ${styles.itemWrap}`}>
                  <div className={styles.time_start}>
                    <div type="from" className={styles.time}>
                      {bus?.departure_time}
                      <div>
                        <span className={styles.date}>
                          {/* {bus
                            ? new Date(bus.journeyDate).getDate()
                            : null}{" "} */}
                          {bus
                            ? getLocaleDate(bus.journeyDate)
                            : null}
                        </span>
                        <span className={styles.dateYear}>
                          {bus
                            ? new Date(
                                bus.journeyDate
                              ).getFullYear()
                            : null}
                        </span>
                      </div>
                    </div>
                    <div className={styles.timeInRoadWrapper}>
                      <span className={styles.timeInRoad}>
                        {ticketDescription?.timeInTrip} в&nbsp;пути
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className={styles.title}>
                    {ticketDescription?.start?.city}
                    </div>
                    <div className={styles.description}>
                      <div className={styles.linesEllipsis}>
                        {ticketDescription?.start?.station}
                        <wbr />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.pointItemWrapper} ${styles.itemWrap}`}>
                  <div className={styles.time_end}>
                    <div type="to" className={styles.time}>
                      {bus ? bus.arrival_time : null}
                      <div>
                        <span className={styles.date}>
                          {bus
                            ? getLocaleDate(bus.arrivalDate)
                            : null}
                        </span>
                        <span className={styles.dateYear}>
                          {bus
                            ? new Date(
                                bus.arrivalDate
                              ).getFullYear()
                            : null}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.title}>
                    {ticketDescription?.end?.city}
                    </div>
                    <div className={styles.description}>
                      <div className={styles.linesEllipsis}>
                        {ticketDescription?.end?.station}
                        <wbr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.gridDivider}></div>
            </div>
            
            <div className={styles.gridRight}>
              <div className={styles.priceWrapper}>
                <div className={styles.priceContainer}>
                  <span>
                    <span className={`${styles.price} ${styles.text_nowrap}`}>
                      {bus?.fare}
                    </span>
                    <span className={styles.currency}>грн</span>
                  </span>
                </div>
                <div className={styles.buttonWrapper}>
                  <button
                    className={styles.btn__submit}
                    role="button"
                    onClick={showSeatModal}
                  >
                    <span className="">Выбрать</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gridFooter}>
            <div className={styles.grid}>
              <div className={styles.gridLeft}>
                <div className={styles.flex}>
                  <div className={styles.toggle}>
                    <span className={styles.toggleWrapp} onClick={handleExpandClick}>
                      { expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> }
                      { expanded ? 'Свернуть' : 'Детали рейса' }
                    </span>
                  </div>
                  <div className={styles.information}>
                    <div className={`${styles.carrier} ${styles.nowrap}`}>
                      <span className={styles.carrierTitle}>
                        Перевозчик:{" "}
                      </span>
                      <span>
                      {bus?.carrierBrand}
                      </span>
                    </div>
                    <div className={`${styles.busModel} ${styles.nowrap}`}>
                      <span className={styles.busModelTitle}>Автобус: </span>
                      <span>
                        {bus?.carrierBus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.gridDivider8}></div>
              <div className={`${styles.gridRight9} ${styles.gridRight}`}>
                <button
                  className={`${styles.btn__submit} ${styles.btn__submit_mobile}`}
                  role="button"
                  onClick={showSeatModal}
                >
                  <span className="">{bus?.fare} грн</span>
                </button>
              </div>
            </div>
          </div>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {getTripContent(ticketDescription, bus, stCollapse)}
          </Collapse>
        </div>
      </div>
      {/* {this.state.visible && this.seatModal()} */}
      {visibleSeatModal && <SeatModal
        handleCancel={handleCancel}
        visible={visibleSeatModal}
        sold={bus.soldSeat}
        // setSold={() => {}}
        booked={bus.bookedSeat}
        // setBooked={() => {}}
        handleUserBooked={handleUserBooked}
        isMobileVesion={isMobileVesion}
      />}
      {isMobileVesion && visibleDetailsModal && <TripDetails
        handleCancel={handleDetailModalCancel}
        visible={visibleDetailsModal}
        tripDetails={getTripContent.bind(this, ticketDescription, bus)}
        fare={bus?.fare}
        showSeatModal={showSeatModal}
        isMobileVesion={isMobileVesion}
      />}
    </div>
  )
}

export default SingleCard
