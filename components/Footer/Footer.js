import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import StarIcon from '@material-ui/icons/StarBorder';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
// icons
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
// styles
import styles from '@/styles/Footer.module.scss'
// images
const footer = '/static/img/logos/logo_fiolet_and_black_vertical_cliped_200x200.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        NovaTrans
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];


// const footers = [
//   // {
//   //   title: 'Company',
//   //   description: ['Team', 'History', 'Contact us', 'Locations'],
//   // },
//   {
//     title: 'Информация',
//     description: ['О Нас', 'Вопросы и ответы', 'Договор оферты', 'Контакты'],
//   },
//   {
//     title: 'Resources',
//     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//   },
//   // {
//   //   title: 'Мы в социальных сетях',
//   //   description: ['Facebook', 'Instagram'],
//   // },
// ];

const pages = [
  {
    title: 'Информация',
    description: ['О Нас', 'Вопросы и ответы', 'Договор оферты', 'Контакты'],
  }
];

const cosials = [
  {
    title: 'Мы в социальных сетях',
    // description: ['Facebook', 'Instagram'],
    links: [
      {
        name: 'Facebook',
        icon: <FacebookIcon className="social-link__icon" color="primary" />
      },
      {
        name: 'Instagram',
        icon: <InstagramIcon className="social-link__icon" color="primary" />
      }
    ],
  },
]

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          <Grid item xs={12} sm={3} md={3} className={styles.footer__company}>
            <img
              src={footer}
              alt="logo NovaTrans"
              height="75"
              className={classes.icon}
            />
            <Typography
              // variant="subtitle1"
              color="textSecondary"
              gutterBottom
              className={styles.footer__logo_description}
            >
              Ваш надежный перевозчик.
            </Typography>
          </Grid>
          {pages.map((page, index) => (
            <Grid item xs={12} sm={3} md={6} key={index} className={styles.footer__pages_list}>
              <Typography variant="h6" color="textPrimary" gutterBottom className={styles.pages_list__title}>
                {page.title}
              </Typography>
              <ul>
                {page.description.map((item, index) => (
                  <li key={index}>
                    <Link href="#" variant="subtitle1" color="textSecondary" className={styles.pages_list__item}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          {cosials.map((cosial, index) => (
            <Grid item xs={12} sm={3} md={3} key={index} className={styles.footer__socials}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {cosial.title}
              </Typography>
              <ul>
                {cosial.links.map((link, index) => (
                  <li key={index}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      
                      <Typography className={styles.social_link__item}>{link.icon} {link.name}</Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
