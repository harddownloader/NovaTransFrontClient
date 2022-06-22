import React from "react"
import {
  Paper,
  Typography,
} from '@mui/material'
import classes from './CardInfo.module.scss'

export default function PoperCard(props) {
  const {
    heading,
    children,
    elevation=1,
  } = props

  return (
    <Paper
      elevation={elevation}
      className={classes.poper_card}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        className={classes.heading}
      >
        {heading}
      </Typography>

      {children}
    </Paper>
  )
} 
