import React from 'react'
import { Container, Typography } from "@mui/material"
import classes from "./Heading.module.scss"

export const Heading = ({ isNotMobile }) => {
  return (
    <>
      <Container maxWidth="md" className={classes.welcome_block}>
        <Typography
          component="h1"
          variant={isNotMobile ? "h2" : "h4"}
          align="center"
          // color="textPrimary"
          gutterBottom
          className={classes.heading}
        >
          Билеты на автобус
        </Typography>
        <Typography
          variant={isNotMobile ? "h5" : "h6"}
          align="center"
          // color="textSecondary"
          paragraph
          className={classes.heading}
        >
          по Украине, Молдавии, Румынии и Болгарии
        </Typography>
      </Container>
    </>
  )
}

