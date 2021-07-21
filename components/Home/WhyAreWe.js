import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// styles
import styles from '@/styles/WhyAreWe.module.scss'
// icons
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}))

const items = [
  {
    image: <QueryBuilderIcon fontSize="large" className="why-are-we__icon" color="primary" />,
    title: 'Без касс и очередей',
    description: 'Билеты онлайн в любое время на сайте и в приложении'
  },
  {
    image: <CreditCardIcon fontSize="large" className="why-are-we__icon" color="primary" />,
    title: 'Безопасная оплата',
    description: 'Стандарты безопасности PCI DSS для защиты платежных данных'
  },
  {
    image: <ConfirmationNumberIcon fontSize="large" className="why-are-we__icon" color="primary" />,
    title: 'Возврат билетов',
    description: 'Быстрое оформление возврата в личном кабинете'
  },
];

function WhyAreWe() {
  const classes = useStyles()

  return(
    <div className={classes.heroContent}>
    <Container maxWidth="md" className={styles.who_are_we__container}>
      <Grid container spacing={4}>
        {items.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} className={styles.who_are_we__item}>
            {/* <Card className={classes.card}> */}
              {/* <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              /> */}
              {card.image}
              {/* <CardContent className={classes.cardContent}> */}
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography>
                  {card.description}
                </Typography>
              {/* </CardContent> */}
            {/* </Card> */}
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  )
}

export default WhyAreWe;
