import React from "react";

// import { makeStyles } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";

import Carousel from "../Carousel/ReactAliceCarousel";
// styles
import styles from "@/styles/AboutDrivers.module.scss";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

const AboutDrivers = () => {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container className={styles.about_drivers__container} maxWidth="lg">
        <Grid container gap={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              variant="h2"
              gutterBottom
              className={styles.about_drivers__heading}
            >
              О водителе и машинах
            </Typography>
            <Grid item xs={12} sm={12} md={12}>
              <Carousel />
            </Grid>
          </Grid>
          <Grid container gap={4} justifyContent="center">
            <Grid item xs={12} sm={8} md={8}>
              <Typography className={styles.about_drivers__description}>
                GOOD BUS - транспортна компанія по наданню послуг міжнародних пасажирських перевезень.
                Ми прагнемо змінити ринок автобусних перевезень і привести його до європейських стандартів якості обслуговування пасажирів.
                В режимі онлайн наші користувачі можуть переглядати всі доступні варіанти поїздки та легко оплачувати квитки банківською карткою або в касах партнерів.
                Усі наші автобуси забезпеченні визначеною законодавством необхідною кількістю професійних водіїв. Наші водії регулярно проходять медогляд та тест на професійну компетентність. Постійний розвиток транспортного відділення дає можливість якісного відбору та високої стандартизації обслуговування  клієнтів нашими водіями.
                Міжнародні автобусні перевезення: плануй свій рейс із компанією GOOD BUS.
                {/*<br /><br />*/}
                {/*<b>Розділ Правила перевезення</b><br />*/}
                {/*▶️ Умови повернення квитка<br />*/}
                {/** Більше ніж за 72год до виїзду: 90%<br />*/}
                {/** За 72год до виїзду: 50%<br />*/}
                {/** За 24год і менше до виїзду: вартість квитка не повертається.<br />*/}
                {/*▶️Багаж<br />*/}
                {/** В вартість квитка входить 1 валіза/сумка і ручна поклажа до 5 кг<br />*/}
                {/** Ціна додаткового багажу: 10% від вартості квитка/1 місце не більше 23кг<br />*/}
                {/*▶️ Знижки<br />*/}
                {/*Діти до 6 років 50% вартості квитка,з наданням окремого місця.<br />*/}
                {/*▶️ Тварини тільки до 7кг (повна вартість квитка,з наданням окремого місця).<br />*/}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutDrivers;
