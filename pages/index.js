import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import DirectionsBus from '@material-ui/icons/DirectionsBus';
// import HelpIcon from '@material-ui/icons/Help';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';

// import TextField from '@material-ui/core/TextField';

// import MaterialUIPickers from './DataPicker'
import Header from '../components/HeaderMaterial/Header';
import SearchTickets from '../components/Home/SearchTickets/SearchTickets'
import WhyAreWe from '../components/Home/WhyAreWe'
import AboutDrivers from '../components/Home/AboutDrivers'
import Footer from '../components/Footer/Footer';

// import './test.css'

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
