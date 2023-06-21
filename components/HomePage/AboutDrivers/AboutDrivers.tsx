import React from "react"

// mui
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

// project components
import Carousel from "../../Carousel/ReactAliceCarousel"

// assets
import classes from "./AboutDrivers.module.scss"

export const AboutDrivers = () => {
  return (
    <div className={classes.heroContent}>
      <Container className={classes.about_drivers__container} maxWidth="lg">
        <Grid container gap={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              variant="h2"
              gutterBottom
              className={classes.about_drivers__heading}
            >
              О водителе и машинах
            </Typography>
            <Grid item xs={12} sm={12} md={12}>
              <Carousel />
            </Grid>
          </Grid>
          <Grid container gap={4} justifyContent="center">
            <Grid item xs={12} sm={8} md={8}>
              <Typography className={classes.about_drivers__description}>
                NewTrans - транспортна компанія по наданню послуг міжнародних пасажирських перевезень.
                Ми прагнемо змінити ринок автобусних перевезень і привести його до європейських стандартів якості обслуговування пасажирів.
                В режимі онлайн наші користувачі можуть переглядати всі доступні варіанти поїздки та легко оплачувати квитки банківською карткою або в касах партнерів.
                Усі наші автобуси забезпеченні визначеною законодавством необхідною кількістю професійних водіїв. Наші водії регулярно проходять медогляд та тест на професійну компетентність. Постійний розвиток транспортного відділення дає можливість якісного відбору та високої стандартизації обслуговування  клієнтів нашими водіями.
                Міжнародні автобусні перевезення: плануй свій рейс із компанією NewTrans.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default AboutDrivers
