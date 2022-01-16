import React from "react";
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import DirectionsBus from '@mui/icons-material/DirectionsBus';
// import HelpIcon from '@mui/icons-material/Help';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import CssBaseline from "@mui/material/CssBaseline";
// import Grid from '@mui/material/Grid';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { makeStyles } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';

// import TextField from '@mui/material/TextField';

// import MaterialUIPickers from './DataPicker'
import Header from "../components/HeaderMaterial/Header";
import SearchTickets from "../components/Home/SearchTickets/SearchTickets";
import WhyAreWe from "../components/Home/WhyAreWe";
import AboutDrivers from "../components/Home/AboutDrivers";
import Footer from "../components/Footer/Footer";

// import './test.css'

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  //   menuButton: {
  //     marginRight: 16,
  //     marginLeft: -12
  //   },
  //   // heroContent: {
  //   //   backgroundColor: theme.palette.background.paper,
  //   //   padding: theme.spacing(8, 0, 6),
  //   // },
  //   heroButtons: {
  //     marginTop: theme.spacing(4),
  //   },
  //   cardGrid: {
  //     paddingTop: theme.spacing(8),
  //     paddingBottom: theme.spacing(8),
  //   },
  //   card: {
  //     height: '100%',
  //     display: 'flex',
  //     flexDirection: 'column',
  //   },
  //   cardMedia: {
  //     paddingTop: '56.25%', // 16:9
  //   },
  //   cardContent: {
  //     flexGrow: 1,
  //   },
}));

// export default function Album() {
export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />

      <main>
        <SearchTickets />
        <WhyAreWe />
        <AboutDrivers />
      </main>

      <Footer />
    </React.Fragment>
  );
}
