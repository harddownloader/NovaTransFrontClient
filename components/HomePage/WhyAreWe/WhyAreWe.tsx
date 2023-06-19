import React from "react"

// mui
import {
  Container,
  Grid,
  Typography
} from '@mui/material'

// assets
import classes from "./WhyAreWe.module.scss"
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'

const cols = [
  {
    image: (
      <QueryBuilderIcon
        fontSize="large"
        className="why-are-we__icon"
        color="primary"
      />
    ),
    title: "Без касс и очередей",
    description: "Билеты онлайн в любое время на сайте и в приложении",
  },
  {
    image: (
      <CreditCardIcon
        fontSize="large"
        className="why-are-we__icon"
        color="primary"
      />
    ),
    title: "Безопасная оплата",
    description: "Стандарты безопасности PCI DSS для защиты платежных данных",
  },
  {
    image: (
      <ConfirmationNumberOutlinedIcon
        fontSize="large"
        className="why-are-we__icon"
        color="primary"
      />
    ),
    title: "Возврат билетов",
    description: "Быстрое оформление возврата в личном кабинете",
  },
]

export const WhyAreWe = () => {
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md" className={classes.who_are_we__container}>
        <Grid container>
          {cols.map((card, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              className={classes.who_are_we__item}
            >
              {card.image}
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
              <Typography>{card.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
