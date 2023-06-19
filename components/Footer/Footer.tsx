import React from "react"

// mui
import {
  CssBaseline,
  Grid,
  Typography,
  Link,
  Container,
  Box,
} from "@mui/material"

// project components
import Copyright from './Copyright'

// icons
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'

// styles
import classes from "./Footer.module.scss"

// images
import { PATH_TO_LOGO, WEBSITE_NAME } from "@/utils/const"
const headingImg = "/static/img/logos/NewTrans.png"

const pagesRows = [
  {
    title: "Информация",
    list: [
       {
        title: "О Нас",
        link: '/info/ru/about-us'
      },
      {
        title: "Политика конфиденциальности",
        link: '/info/ru/privacy-policy'
      },
      {
        title: "Договор оферты",
        link: '/info/ru/public-offer'
      },
      {
        title: "Правила перевозок",
        link: '/info/ru/transportation-rules'
      }
    ],
  },
]

export const Footer = () => {
  const socials = [
    {
      title: "Контакты",
      links: [
        {
          name: "+38097-356-96-96",
          icon: <LocalPhoneIcon className={classes.social_link__icon} color="primary" />,
          link: 'tel:380973569696',
        },
        {
          name: "newtrans.comp@gmail.com",
          icon: <EmailIcon className={classes.social_link__icon} color="primary" />,
          link: 'mailto:newtrans.comp@gmail.com',
        },
        {
          name: "Одеская обл., ул. Фрунзе 64",
          icon: <LocationOnIcon className={classes.social_link__icon} color="primary" />,
          link: '#',
        }
      ],
    },
  ]

  return (
    <>
      <CssBaseline />
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container justifyContent="space-evenly">
          <Grid
            item
            xs={12} sm={3} md={3}
            className={`${classes.footer__company} ${classes.info_block}`}
          >
            <div
              className={classes.footer_logo_wrapper}
            >
              <img
                src={PATH_TO_LOGO}
                alt={`logo ${WEBSITE_NAME}`}
                height={50}
              />
            </div>
            <div
              className={classes.footer_logo_wrapper}
            >
              <img
                src={headingImg}
                alt={`logo ${WEBSITE_NAME}`}
                height={15}
              />
            </div>
            <Typography
              color="textSecondary"
              gutterBottom
              className={classes.footer__logo_description}
            >
              Если перевозки -<br /> то мы
            </Typography>
          </Grid>
          {pagesRows.map((pagesCol, index) => (
            <Grid
              item
              xs={12}
              sm={3}
              md={6}
              key={index}
              className={`${classes.footer__pages_list} ${classes.info_block}`}
            >
              <Typography
                variant="h6"
                color="textPrimary"
                gutterBottom
                className={classes.pages_list__title}
              >
                {pagesCol.title}
              </Typography>
              <ul className={classes.pages_list}>
                {pagesCol.list.map((page, index) => (
                  <li
                    key={index}
                    className={classes.pages_list__item}
                  >
                    <Link
                      href={page.link}
                      variant="subtitle1"
                      color="textSecondary"
                      className={classes.pages_list__item_link}
                      underline="none"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          {socials.map((social, index) => (
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              key={index}
              className={`${classes.social_list_container} ${classes.info_block}`}
            >
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {social.title}
              </Typography>
              <ul className={classes.social_list}>
                {social.links.map((link, index) => (
                  <li key={index} className={classes.social_link__item}>
                    <Link href={link.link} underline="none" variant="subtitle1" color="textSecondary" >
                      <Typography className={classes.social_list__text}>
                        {link.icon} {link.name}
                      </Typography>
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
    </>
  )
}
