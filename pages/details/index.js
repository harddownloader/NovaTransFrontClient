import Layout from "../../components/Layout";
import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  AutoComplete,
  InputNumber,
  Button
} from "antd";
import Swal from "sweetalert2";
import Router from "next/router";
import { dec } from "../../utils/encdec";
import { postBookSeat } from "../../actions/book";
const { Option } = Select;
import Header from '../../components/HeaderMaterial/Header';


class Details extends React.Component {
  state = {
    dataSource: [],
    name: "",
    email: "",
    phone: "",
    address: ""
  };

  handleAutoComplete = value => {
    this.setState({
      dataSource:
        !value || value.indexOf("@") >= 0
          ? []
          : [
              `${value}@gmail.com`,
              `${value}@hotmail.com`,
              `${value}@yahoo.com`
            ],
      email: value
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNumber = value => {
    this.setState({ phone: value });
  };

  handleSubmit = async () => {
    const { name, phone, address, email } = this.state;
    const seatNumber = this.props.seat;
    const info = { name, phone, address, email, seatNumber };
    const resp = await postBookSeat(this.props.slug, info);
    if (!resp.error) {
      this.sweetAlert("success");
    } else {
      this.sweetAlert("error");
    }
  };

  sweetAlert = status => {
    setTimeout(() => {
      if(status !== "error"){
        Router.push("/");
      }
    }, 1000);

    if (status === "error") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Что то пошло не так!"
      });
    } else {
      Swal.fire("Поздравляю!", "Ваше место забронировано", "success");
    }
  };

  render() {
    return (
      <Layout>
        <Header />
        <Row className="row-container">
          {console.log(this.state)}
          <Col span={4}></Col>
          <Col span={8}>
            <Card title="Ваши данные" style={{ width: "100%" }}>
              <Input.Group>
                <h4>Ваше имя:</h4>
                <Input onChange={this.handleChange} name="name" />
              </Input.Group>
              <br />
              <Input.Group>
                <h4>Email:</h4>
                <AutoComplete
                  dataSource={this.state.dataSource}
                  style={{ width: "100%" }}
                  onChange={this.handleAutoComplete}
                />
              </Input.Group>
              <Input.Group>
                <h4>Адрес:</h4>
                <Input onChange={this.handleChange} name="address" />
              </Input.Group>
              <br />
              <Row>
                <Col span={11}>
                  <Input.Group>
                    <h4>Телефон: </h4>
                    <InputNumber
                      style={{ width: "100%" }}
                      onChange={this.handleNumber}
                      name="phone"
                      max={9999999999}
                    />
                  </Input.Group>
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                  <Input.Group>
                    <h4>Пункт посадки: </h4>
                    <Select defaultValue="Buspark" style={{ width: "100%" }}>
                      <Option disabled value="Buspark">
                        Одесса
                      </Option>
                      <Option disabled value="Attariya">
                        Киев
                      </Option>
                    </Select>
                  </Input.Group>
                </Col>
              </Row>
              <br />
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={this.handleSubmit}
              >
                Подтвердить покупку
              </Button>
            </Card>
          </Col>
          <Col span={2}></Col>
          <Col span={6}>
            <Card title="Информация о рейсе" style={{ width: "100%" }}>
              <p>
                <b>Рейс: </b>
                {this.props.start} - {this.props.end}
              </p>
              <p>
                <b>Дата: </b>
                {this.props.journeyDate}
              </p>
              <p>
                <b>Места: </b>
                {this.props.seat}
              </p>
              {/* <p>
                <b>Travel: </b>
                {this.props.travelName}
              </p> */}
            </Card>

            <br />
            <Card title="Платежная информация" style={{ width: "100%" }}>
              <p>
                <b>Стоимость билета: </b> {this.props.fare} грн.
              </p>
              <p>
                <b>Итого: </b> {this.props.fare} грн.
              </p>
            </Card>
          </Col>
          <Col span={4}></Col>
        </Row>
      </Layout>
    );
  }
}

Details.getInitialProps = ({ query }) => {
  const info = dec(query.info);
  if (info) {
    return info;
  }
  return {};
};

export default Details;
