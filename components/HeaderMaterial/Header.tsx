import React from "react"
import Link from "next/link"
// import Image from 'next/image'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@mui/styles'
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from '@mui/material/Container'
import classes from "./Header.module.scss"
import LangMenu from './LangMenu'
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints" // this was exported from mui breakpoint type for Container maxWidth, that path may change in the future
// images
const logo = "/static/img/logos/logo_with_location_blue.png"


const useStyles = makeStyles((theme) => {
  return {
    icon: {
      marginRight: theme.spacing(2),
    },
    rightToolbar: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
    }
  }
})

interface HeaderPorps {
  isDarkStyle?: boolean
  containerWidth: false | Breakpoint
}

const Header = ({
  isDarkStyle=false,
  containerWidth="md"
}: HeaderPorps) => {
  const styles = useStyles()
  const [open, setOpen] = React.useState(true)
  
  return (
    <>
      <Collapse in={open} className={classes.collapse_alert}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Правила перевозок обновленны</AlertTitle>
          Мы обновили правила перевозок - мы пожете про это почитать <strong>здесь</strong>.
        </Alert>
      </Collapse>

      <AppBar
        color="transparent"
        elevation={0}
        position="relative"
        className={`${classes.container} ${isDarkStyle ? classes.darkColors : classes.lightColors}`}
      >
      <Container maxWidth={containerWidth}>
        <Toolbar disableGutters>
          <Link href='/'>
            <img
              src={logo}
              alt="Logo NovaTrans"
              height={50}
              className={`${styles.icon} ${classes.pointer}`}
            />
          </Link>
          <Link href='/'>
            <h1 className={`${classes.heading} ${classes.pointer}`}>NovaTrans</h1>
          </Link>
          <section className={styles.rightToolbar}>
            <LangMenu isDarkStyle={isDarkStyle} />
          </section>
        </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
