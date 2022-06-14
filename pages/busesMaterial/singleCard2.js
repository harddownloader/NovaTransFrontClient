import React, { Component } from "react";
import Alert from '@mui/material/Alert';
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { Card, Row, Col, Modal, Button } from "antd";
import Router from "next/router";
import SeatDetails from "./seatDetails";
import { API_ROOT } from "../../utils/config";
import { enc, dec } from "../../utils/encdec";

// sass
import styles from "@/styles/singleCard/SingleCard2.module.scss";
import stCollapse from "@/styles/singleCard/SingleCard.Collapse.module.scss";

class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      visible: false,
      userBooked: [],
      // инфо о билете
      bus: props.bus,
      months: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "ноября",
        "декабря",
      ],
      ticketDescription: null,
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  componentDidMount() {
    const { bus } = this.state

    const ticketDescription = this.getFirstAndFinishedPoints(bus.wayStations)
    this.setState({ticketDescription})
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  // бронь
  showModal = () => {
    this.setState({
      visible: true,
      loading: false,
    });
  };

  handleUserBooked = (seat) => {
    // let arr = [...this.state.userBooked];
    // arr.push(seat);
    // this.setState({userBooked: arr});
    this.encryptInfo(seat);
    // console.log(this.props)
  };

  handleOk = (info) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      Router.push({
        pathname: "/details",
        query: { info },
      });
    }, 1000);
  };

  encryptInfo = (seat) => {
    const { startLocation, endLocation, fare, journeyDate, travel, slug } =
      this.props.bus;
    let start = startLocation.name;
    let end = endLocation.name;
    let travelName = travel.name;
    const info = { start, end, fare, journeyDate, travelName, seat, slug };
    const resp = enc(info);
    this.handleOk(resp);
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  seatColorMeaning = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "start",
            flexDirection: "row-reverse",
          }}
        >
          <p>Доступно</p>
          <Button type="primary" style={{ margin: "0 1rem" }}></Button>
          <p>Забронировано</p>
          <Button
            style={{ backgroundColor: "rgb(67, 67, 67)", margin: "0 1rem" }}
          ></Button>
          <p>Продано</p>
          <Button type="danger" style={{ margin: "0 1rem" }}></Button>
        </div>
      </>
    );
  };

  seatModal = () => (
    <Modal
      title="Бронирование Места"
      visible={this.state.visible}
      onCancel={this.handleCancel}
      footer={[this.seatColorMeaning()]}
    >
      <SeatDetails
        sold={this.props.bus.soldSeat}
        setSold={() => {}}
        booked={this.props.bus.bookedSeat}
        setBooked={() => {}}
        slug={"ss"}
        handleUserBooked={this.handleUserBooked}
      />
    </Modal>
  );

  getLocaleDate = (date) => {
    const dateObj = new Date(date);
    const optionsDate = {  month: 'long', day: 'numeric' };

    return dateObj.toLocaleDateString('ru-RU', optionsDate);
  }

  getFirstAndFinishedPoints = (wayStations) => {
    const start = wayStations[0]
    const end = wayStations[wayStations.length - 1]
    
    const startDateTime = new Date(`${start.date}T${start.time}:00`)
    const endDateTime = new Date(`${end.date}T${end.time}:00`)
    const timeInTripMilliseconds = Math.abs(endDateTime - startDateTime)
    const timeInTrip = this.getDateLineFromMilliseconds(timeInTripMilliseconds)

    return {
      start: start,
      end: end,
      timeInTrip
    }
  }

  getDateLineFromMilliseconds = (milliseconds) => {
    const diffDays = Math.floor(milliseconds / 86400000) // days
    const diffHrs = Math.floor((milliseconds % 86400000) / 3600000) // hours
    const diffMins = Math.round(((milliseconds % 86400000) % 3600000) / 60000) // minutes
    console.log(diffDays + " дней, " + diffHrs + " часов, " + diffMins + " минут")
    return `${diffDays ? diffDays + 'д.' : ''}  ${diffHrs ? diffHrs + 'ч.' : ''}  ${diffMins + 'мин.'}`
  }

  render() {
    const {
      bus,
      ticketDescription,
      expanded,
    } = this.state;

    return (
      <div className={styles.ticket}>
        <div className={styles.root}>
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
            <div className={styles.grid}>
              <div className={styles.gridLeft}>
                <div className={styles.items}>
                  <div className={`${styles.item} ${styles.itemWrap}`}>
                    <div className={styles.time_start}>
                      <div type="from" className={styles.time}>
                        {this.state?.bus?.departure_time}
                        <div>
                          <span className={styles.date}>
                            {this.state.bus
                              ? new Date(this.state.bus.journeyDate).getDate()
                              : null}{" "}
                            {this.state.bus
                              ? this.state.months[
                                  new Date(
                                    this.state.bus.journeyDate
                                  ).getMonth()
                                ]
                              : null}
                          </span>
                          <span className={styles.dateYear}>
                            {this.state.bus
                              ? new Date(
                                  this.state.bus.journeyDate
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
                  <div className={`${styles.item} ${styles.itemWrap}`}>
                    <div className={styles.time_end}>
                      <div type="to" className={styles.time}>
                        {this.state.bus ? this.state.bus.arrival_time : null}
                        <div>
                          <span className={styles.date}>
                            {this.state.bus
                              ? new Date(this.state.bus.arrivalDate).getDate()
                              : null}{" "}
                            {this.state.bus
                              ? this.state.months[
                                  new Date(
                                    this.state.bus.arrivalDate
                                  ).getMonth()
                                ]
                              : null}
                          </span>
                          <span className={styles.dateYear}>
                            {this.state.bus
                              ? new Date(
                                  this.state.bus.arrivalDate
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
              </div>
              <div className={styles.gridDivider}></div>
              <div className={styles.gridRight}>
                <div className={styles.priceWrapper}>
                  <div className={styles.priceContainer}>
                    <span>
                      <span className={`${styles.price} ${styles.text_nowrap}`}>
                        {this.state?.bus?.fare}
                      </span>
                      <span className={styles.currency}>грн</span>
                    </span>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <button
                      className={styles.btn__submit}
                      role="button"
                      onClick={this.showModal}
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
                      <span onClick={this.handleExpandClick}>
                        <i
                          className={`${styles.toggleIcon} icon icon-down-arrow`}
                        ></i>
                        { expanded ? 'Свернуть' : 'Детали рейса' }
                      </span>
                    </div>
                    <div className={styles.information}>
                      <div className={`${styles.carrier} ${styles.nowrap}`}>
                        <span className={styles.carrierTitle}>
                          Перевозчик:{" "}
                        </span>
                        <span>
                        {this.state?.bus?.carrierBrand}
                        </span>
                      </div>
                      <div className={`${styles.busModel} ${styles.nowrap}`}>
                        <span className={styles.busModelTitle}>Автобус: </span>
                        <span>
                          {this.state?.bus?.carrierBus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.gridDivider8}></div>
                <div className={styles.gridRight9}></div>
              </div>
            </div>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              {/* <CardContent> */}
              <div
                className={stCollapse.tabPanel}
                role="tabpanel"
                id="react-tabs-17"
                aria-labelledby="react-tabs-16"
              >
                <div className={stCollapse.detailsRoute}>
                  <div className={stCollapse.detailsRouteColumn}>
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
                  <div className={stCollapse.detailsRouteColumn}></div>
                </div>
                <div className={stCollapse.details}>
                  <div className={stCollapse.detailsContent}>
                    <div>
                      <div className={stCollapse.wrapperPoints}>
                        <span
                          className={stCollapse.mobile_ticket__segment_divider}
                        ></span>

                        {bus.wayStations.map((station, stationIndex) => {
                          const date = this.getLocaleDate(station.date)
                          let isDateVisible = true

                          // if date was dublicate
                          if (
                            stationIndex !== 0 &&
                            this.getLocaleDate(bus.wayStations[stationIndex - 1].date) === date
                          ) isDateVisible = false

                          return (
                            <div className={stCollapse.item}>
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

                        {/* <div className={stCollapse.item}>
                          <div>
                            <div className={stCollapse.time}>23:06</div>
                            <div className={stCollapse.date}>21 июля</div>
                          </div>
                          <div>
                            <div className={stCollapse.city}>Киев</div>
                            <div className={stCollapse.address}>
                              Остановка "метро "Теремки", проспект Академика
                              Глушкова
                            </div>
                          </div>
                        </div> */}
                        {/* <div className={stCollapse.item}>
                          <div>
                            <div className={stCollapse.time}>02:20</div>
                          </div>
                          <div>
                            <div className={stCollapse.city}>Умань</div>
                            <div className={stCollapse.address}>
                              Автовокзал Умань, улица Киевская; дом 1
                            </div>
                          </div>
                        </div> */}
                        {/* <div className={stCollapse.item}>
                          <div>
                            <div className={stCollapse.time}>03:55</div>
                          </div>
                          <div>
                            <div className={stCollapse.city}>Кривое озеро</div>
                            <div className={stCollapse.address}>
                              Автостанция Кривое озеро, улица Куйбышева; дом 6
                            </div>
                          </div>
                        </div> */}
                        {/* <div className={stCollapse.item}>
                          <div>
                            <div className={stCollapse.time}>06:15</div>
                            <div className={stCollapse.date}>22 июля</div>
                          </div>
                          <div>
                            <div className={stCollapse.city}>Одесса</div>
                            <div className={stCollapse.address}>
                              Автовокзал "Центральный", улица Колонтаевская; дом
                              58
                            </div>
                          </div>
                        </div> */}
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
                            {this.state?.bus?.carrierBrand}
                          </strong>
                        </p>
                        <p>
                          Автобус:{" "}
                          <strong>
                            {this.state?.bus?.carrierBus}{" "}
                          </strong>
                        </p>
                      </ul>
                    </div>
                  </div>
                  {bus?.features && <Alert severity="info">{bus.features}</Alert>}
                </div>
                <div></div>
              </div>
              {/* </CardContent> */}
            </Collapse>
          </div>
        </div>
        {this.state.visible && this.seatModal()}
      </div>
    );
  }
}

export default SingleCard;
