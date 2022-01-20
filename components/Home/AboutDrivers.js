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
        <Grid container spacing={4}>
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
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} sm={8} md={8}>
              <Typography className={styles.about_drivers__description}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                vero nemo recusandae laborum voluptatum consectetur provident,
                est possimus minus voluptas. Iusto saepe iste reiciendis? Iste
                nam delectus expedita nemo quae. Maiores harum eveniet
                reprehenderit voluptates, magnam blanditiis quis eum inventore
                repellat suscipit mollitia officiis excepturi repellendus nihil
                ab, aliquid dolore. Quaerat pariatur aliquam officiis quas
                possimus repellendus sit odit reiciendis? Ad ducimus repellat,
                alias deleniti odit optio consequuntur fugiat itaque voluptatem,
                dolores aut aspernatur veniam numquam quis illo ut dignissimos
                veritatis voluptas nisi, molestiae quia laudantium deserunt
                harum. Aliquid, veniam.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutDrivers;
