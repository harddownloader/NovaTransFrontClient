import React from "react";
// import Image from 'next/image'
// import { makeStyles } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import DirectionsBus from '@mui/icons-material/DirectionsBus';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
// icons
import HelpIcon from "@mui/icons-material/Help";
import classes from "./Header.module.scss";
import { API_ROOT } from "../../utils/config";
// images
const logo = "/static/img/logos/logo.png";

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
});

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
          <img
            src={logo}
            alt="Logo NovaTrans"
            height={50}
            className={styles.icon}
          />
          <h1>NovaTrans</h1>
          {/* <Typography variant="h6" color="inherit" noWrap>
          NovaTrans
        </Typography> */}
          <section className={styles.rightToolbar}>
            {/* <IconButton color="inherit" aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Save">
            <SaveIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="More Options">
            <MoreVertIcon />
          </IconButton> */}
            <HelpIcon className={classes.icon} />
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
  );
}

export default Header;
