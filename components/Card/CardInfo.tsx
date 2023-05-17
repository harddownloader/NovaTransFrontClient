import React from "react"
import {
  Paper,
  Typography,
} from '@mui/material'
import classes from './CardInfo.module.scss'

export function CardInfo(props) {
  const {
    heading,
    children,
    elevation=1,
  } = props

  return (
    <Paper
      elevation={elevation}
      className={classes.wrap}
    >
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
