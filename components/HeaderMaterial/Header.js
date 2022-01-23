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

// icons
import HelpIcon from "@mui/icons-material/Help";

// styles
import styles from "@/styles/Header.module.scss";

import { API_ROOT } from "../../utils/config";
// images
const logo = "/static/img/logos/logo.png";

const useStyles = makeStyles((theme) => {
  // console.log('theme', theme)
  return {
  container: {
    padding: "10px 0",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
    display: "flex",
    alignItems: "center",
  }}
  // menuButton: {
  //   marginRight: 16,
  //   marginLeft: -12
  // },
  // heroContent: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(8, 0, 6),
  // },
  // heroButtons: {
  //   marginTop: theme.spacing(4),
  // },
  // cardGrid: {
  //   paddingTop: theme.spacing(8),
  //   paddingBottom: theme.spacing(8),
  // },
  // card: {
  //   height: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  // },
  // cardMedia: {
  //   paddingTop: '56.25%', // 16:9
  // },
  // cardContent: {
  //   flexGrow: 1,
  // },
  // footer: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(6),
  // },
});

const Header = (props) => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <AppBar position="relative" className={classes.container}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo NovaTrans"
            height={50}
            className={classes.icon}
          />
          <h1>NovaTrans</h1>
          {/* <Typography variant="h6" color="inherit" noWrap>
          NovaTrans
        </Typography> */}
          <section className={classes.rightToolbar}>
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
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
