import React, { useState } from 'react'
import styles from "../../SearchTripsPage/SingleCard.module.scss"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Collapse from "@mui/material/Collapse"
import stCollapse from "../../SearchTripsPage/SingleCard.Collapse.module.scss"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { futureAnyFix } from "@/interfaces/futureAnyFix"

const PopularTripCard = (props) => {
  const {
    searchingWithReturnTicket,
    isReturnTicket,
    orders,
    handleBook,
  } = props

  const purchasedTicket = Boolean(orders?.oneWayTicketsOrder && !isReturnTicket)
  const purchasedReturnTicket = Boolean(orders?.returnTicketsOrder && isReturnTicket)

  const theme = useTheme()
  const isMobileVersion = !useMediaQuery(theme.breakpoints.up('sm'))

  const [expanded, setExpanded] = useState(false)
  const [visibleSeatModal, setVisibleSeatModal] = useState(false)
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false)
  const [userBooked, setUserBooked] = useState([])
  const [bus, setBus] = useState(props.bus)
  const [ticketDescription, setTicketDescription] = useState<futureAnyFix>(null)
  const [isLoading , setIsLoading] = useState(true)

  const showDetailModal = (e: futureAnyFix) => {}
  const showSeatModal = () => {}
  const getOurSeats = () => null
  const getLocaleDate = (date: string) => null
  const handleExpandClick = () => {}


  return (
    <div className={styles.ticket}>
      <div className={styles.root} onClick={(e) => showDetailModal(e)}>
        <div className={styles.wrapper}>
          <span
            // type="only"
            className={`${styles.badge} ${ (purchasedTicket || purchasedReturnTicket) ? styles.badge_type3 : styles.badge_type1}`}
          >
            {(purchasedTicket || purchasedReturnTicket)
              ? `${getOurSeats()}` : `Эксклюзивная цена`}
          </span>
          {/* <span
            type="eticket"
            className={`${styles.badge} ${styles.badge_type2}`}
          >
            Можно не печатать
          </span> */}
        </div>
        <div
          // type="only"
          className={`${styles.preview} ${
            (purchasedTicket || purchasedReturnTicket)
              ? styles.success_border
              : styles.blue_border
          }`}
        >
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
                    <div
                      // type="from"
                      className={styles.time}
                    >
                      {ticketDescription?.start?.time}
                      <div>
                        <span className={styles.date}>
                          {ticketDescription?.start?.date &&
                          getLocaleDate(ticketDescription?.start?.date)}
                        </span>
                        <span className={styles.dateYear}>
                          {ticketDescription?.start?.date &&
                          new Date(
                            ticketDescription?.start?.date
                          ).getFullYear()}
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
                    <div
                      // type="to"
                      className={styles.time}
                    >
                      {ticketDescription?.end?.time}
                      <div>
                        <span className={styles.date}>
                          {ticketDescription?.end?.date &&
                          getLocaleDate(ticketDescription?.end?.date)
                          }
                        </span>
                        <span className={styles.dateYear}>
                          {ticketDescription?.end?.date &&
                          new Date(
                            ticketDescription?.end?.date
                          ).getFullYear()}
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
                    className={`${styles.btn__submit} ${(purchasedTicket || purchasedReturnTicket) ? styles.ticket_bought : ''}`}
                    role="button"
                    onClick={(purchasedTicket || purchasedReturnTicket) ? (e) => {
                      e.stopPropagation
                      handleBook(null)
                    } : showSeatModal}
                  >
                    <span className="">{(purchasedTicket || purchasedReturnTicket) ? `Отменить` : `Выбрать`}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gridFooter}>
            <div className={styles.grid}>
              <div className={styles.gridLeft}>
                <div className={styles.flex}>
                  <div className={`${styles.toggle} ${(purchasedTicket || purchasedReturnTicket) ? styles.success_color : styles.blue_color}`}>
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
                  className={`${styles.btn__submit} ${styles.btn__submit_mobile} ${(purchasedTicket || purchasedReturnTicket) ? styles.cancel_color : ''}`}
                  role="button"
                  onClick={(purchasedTicket || purchasedReturnTicket) ? (e) => {
                    e.stopPropagation
                    handleBook(null)
                  } : showSeatModal}
                >
                  <span className="">{(purchasedTicket || purchasedReturnTicket) ? `Отменить` : `${bus?.fare} грн`}</span>
                </button>
              </div>
            </div>
          </div>
          {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
          {/*  {getTripContent(ticketDescription, bus, stCollapse)}*/}
          {/*</Collapse>*/}
        </div>
      </div>
    </div>
  );
}

export default PopularTripCard
