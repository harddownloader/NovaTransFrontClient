import React, { Component } from "react";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { Card, Row, Col, Modal, Button } from "antd";
import Router from "next/router";
import SeatDetails from "./seatDetails";
import { API_ROOT } from "../../utils/config";
import { enc, dec } from "../../utils/encdec";

// sass
import styles from "@/styles/SingleCard2.module.scss";

class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      visible: false,
      userBooked: []
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  // бронь
  showModal = () => {
    this.setState({
      visible: true,
      loading: false
    });
  };

  handleUserBooked = (seat) => {
    // let arr = [...this.state.userBooked];
    // arr.push(seat);
    // this.setState({userBooked: arr});
    this.encryptInfo(seat);
    // console.log(this.props)
  }

  handleOk = (info) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      Router.push({
        pathname: "/details",
        query: {info}
      });
    }, 1000);
  };

  encryptInfo = seat => {
    const {startLocation, endLocation, fare, journeyDate, travel, slug} = this.props.bus;
    let start = startLocation.name;
    let end = endLocation.name;
    let travelName = travel.name;
    const info = {start, end, fare, journeyDate, travelName, seat, slug}
    const resp = enc(info);
    this.handleOk(resp)
  }
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  seatColorMeaning = () => {
    return(
      <>
        <div style={{display: 'flex', alignItems: 'start', flexDirection: 'row-reverse'}}>
          <p>Доступно</p>
          <Button type="primary" style={{margin: '0 1rem'}}></Button>
          <p>Забронировано</p>
          <Button style={{backgroundColor: "rgb(67, 67, 67)", margin: '0 1rem'}}></Button>
          <p>Продано</p>
          <Button type="danger" style={{margin: '0 1rem'}}></Button>
        </div>
      </>
    )
  }

  seatModal = () => (
    <Modal
      title="Бронирование Места"
      visible={this.state.visible}
      onCancel={this.handleCancel}
      footer={[
        this.seatColorMeaning()
      ]}
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

  render() {
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
                        23:06
                        <div>
                          <span className={styles.date}>19 июля</span>
                          <span className={styles.dateYear}>2021</span>
                        </div>
                      </div>
                      <div className={styles.timeInRoadWrapper}>
                        <span className={styles.timeInRoad}>
                          7&nbsp;ч. 9&nbsp;мин. в&nbsp;пути
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className={styles.title}>Киев</div>
                      <div className={styles.description}>
                        <div className={styles.linesEllipsis}>
                          Остановка "метро "Теремки", проспект Академика
                          Глушкова
                          <wbr />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.item} ${styles.itemWrap}`}>
                    <div className={styles.time_end}>
                      <div type="to" className={styles.time}>
                        06:15
                        <div>
                          <span className={styles.date}>20 июля</span>
                          <span className={styles.dateYear}>2021</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.title}>Одесса</div>
                      <div className={styles.description}>
                        <div className={styles.linesEllipsis}>
                          Автовокзал "Центральный", улица Колонтаевская; дом 58
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
                        279
                      </span>
                      <span className={styles.currency}>грн</span>
                    </span>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <button className={styles.btn__submit} role="button" onClick={this.showModal}>
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
                        Детали рейса
                      </span>
                    </div>
                    <div className={styles.information}>
                      <div className={`${styles.carrier} ${styles.nowrap}`}>
                        <span className={styles.carrierTitle}>
                          Перевозчик:{" "}
                        </span>
                        <span>Суботин Д.Л.</span>
                      </div>
                      <div className={`${styles.busModel} ${styles.nowrap}`}>
                        <span className={styles.busModelTitle}>Автобус: </span>
                        <span>Mercedes-Bens Travego</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.gridDivider8}></div>
                <div className={styles.gridRight9}>
                  {/* <div className={styles.options}>
                    <div>
                      <span>
                        <div>
                          <span className={`icon icon-undefined`}></span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div></div> */}
                </div>
              </div>
            </div>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              {/* <CardContent> */}
              <div
                class="TabPanel react-tabs__tab-panel--selected"
                role="tabpanel"
                id="react-tabs-17"
                aria-labelledby="react-tabs-16"
              >
                <div class="DetailsRoute">
                  <div class="DetailsRouteColumn">
                    <div class="DetailsRouteInfo">
                      <p>
                        <span>
                          Рейс №{" "}
                          <span class="bold">
                            НАУ1035 Борисполь (аэропорт) - Одесса
                          </span>
                          , по маршруту <span class="bold">Киев — Одесса</span>
                        </span>
                        <span>
                          , на <span class="bold">21 июля 2021</span> года
                        </span>
                        <span>
                          {" "}
                          в <span class="bold">23:06</span>
                        </span>
                      </p>
                      <p>Тип рейса: Регулярный</p>
                      <p>Отправление и прибытие по местному времени</p>
                    </div>
                  </div>
                  <div class="DetailsRouteColumn"></div>
                </div>
                <div class="Details">
                  <div class="DetailsContent">
                    <div>
                      <div class="WrapperPoints">
                        <span class="mobile-ticket__segment-divider"></span>
                        <div class="Item">
                          <div>
                            <div class="Time">
                              23:06
                            </div>
                            <div class="Date">
                              21 июля
                            </div>
                          </div>
                          <div>
                            <div class="City">
                              Киев
                            </div>
                            <div class="Address">
                              Остановка "метро "Теремки", проспект Академика
                              Глушкова
                            </div>
                          </div>
                        </div>
                        <div class="Item">
                          <div>
                            <div class="Time">
                              02:20
                            </div>
                          </div>
                          <div>
                            <div class="City">
                              Умань
                            </div>
                            <div class="Address">
                              Автовокзал Умань, улица Киевская; дом 1
                            </div>
                          </div>
                        </div>
                        <div class="Item">
                          <div>
                            <div class="Time">
                              03:55
                            </div>
                          </div>
                          <div>
                            <div class="City">
                              Кривое озеро
                            </div>
                            <div class="Address">
                              Автостанция Кривое озеро, улица Куйбышева; дом 6
                            </div>
                          </div>
                        </div>
                        <div class="Item">
                          <div>
                            <div class="Time">
                              06:15
                            </div>
                            <div class="Date">
                              22 июля
                            </div>
                          </div>
                          <div>
                            <div class="City">
                              Одесса
                            </div>
                            <div class="Address">
                              Автовокзал "Центральный", улица Колонтаевская; дом
                              58
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul class="ListUnstyled-">
                        <li class="Title">
                          Перевозчик
                          <div class="d-inline-block pointer">
                            <span>
                              <div>
                                <i class="icon icon-info text-primary pointer"></i>
                              </div>
                            </span>
                          </div>
                        </li>
                        <p>
                          Бренд: <strong>ТТК Новая Украина</strong>
                        </p>
                        <p>
                          Автобус: <strong>Mercedes-Bens Travego </strong>
                        </p>
                      </ul>
                    </div>
                  </div>
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
