import React from "react"
import Link from "next/link"
// import Image from 'next/image'
// import { makeStyles } from "@mui/material/styles"
import { makeStyles } from '@mui/styles'
// import CssBaseline from '@mui/material/CssBaseline'
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
// import DirectionsBus from '@mui/icons-material/DirectionsBus'
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Container from '@mui/material/Container'
// icons
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import classes from "./Header.module.scss"
import { API_ROOT } from "../../utils/config"
// images
const logo = "/static/img/logos/logo.png"

const useStyles = makeStyles((theme) => {
  return {
    icon: {
      marginRight: theme.spacing(2),
    },
    rightToolbar: {
      marginLeft: "auto",
      marginRight: -12,
      display: "flex",
      alignItems: "center",
    }
  }
})

const Header = (props) => {
  const {
    isDarkStyle,
    containerWidth="md",
  } = props

  const styles = useStyles()
  
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
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
              className={`${styles.icon} ${classes.pointer} ${isDarkStyle ? classes.invent_img : ''}`}
            />
          </Link>
          <Link href='/'>
            <h1 className={`${classes.pointer}`}>NovaTrans</h1>
          </Link>
          <section className={styles.rightToolbar}>
            <HelpOutlineIcon className={classes.icon} />
            <Box display={{ xs: "none", md: "block" }} m={1}>
              <Typography variant="h6" color="inherit" align="right">
                Служба поддержки
              </Typography>
            </Box>
          </section>
        </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
