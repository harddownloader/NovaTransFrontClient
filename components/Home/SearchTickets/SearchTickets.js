import React, { useState, useEffect } from "react";
// time and data
import { format } from "date-fns";
// makestales
import { makeStyles } from '@mui/styles';
// next
import Router from "next/router";
// material
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// actions
import { getAllLocations } from "@/actions/location";

// checkbox
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// pickers
import MaterialUIPickers from "../../Pickers/DatePicker";
// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from '@mui/material/FormHelperText';
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

// styles
import styles from "@/styles/SearchTickets.module.scss";
import { NaturePeopleOutlined } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


// images
const BgImage = "/static/img/backgrounds/bg-winter.jpg";

const { Option } = Select;

const useStyles = makeStyles((theme) => {
  return {
  // container
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${BgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "cover",
    paddingTop: "50px",
    paddingBottom: "114px",
    marginTop: "-80px",

    padding: theme.spacing(8, 0, 6),
  },
  // grid select
  gridSelect: {
    padding: "0 !important",
    color: "#fff",
  },
  // form control for select
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    width: "100%",
    // нижние подчеркивание
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "&.center_el": {
      borderRight: "1px solid rgb(233, 233, 233)",
      borderLeft: "1px solid rgb(233, 233, 233)",
    },
  },
  // select
  select: {},
  // data picker
  dataPicker: {
    lineHeight: "1.1876em",
    padding: "8px 12px 0px",
    //
    "& .MuiInputLabel-shrink": {
      transform: "translate(12px, 10px) scale(0.75)",
    },
    // нижние подчеркивание
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
  },
  // selects + data pickers
  searchField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    "&.first_el": {
      borderRadius: "4px 0 0 4px",
    },
    "&.first_el:hover": {
      borderRadius: "4px 0 0 4px",
    },
  },
  searchFieldrenderedInput: {
    "&.first_input_el .MuiInputBase-root": {
      borderRadius: "4px 0 0 4px",
    },
    "&.middle_input_el .MuiInputBase-root": {
      borderRadius: "0px",
    },
  }
}});

const threeLengthArray = [];

function SearchTickets(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('md'));

  // select-----------------
  // обратно
  const [fromReturn, setFromReturn] = useState("");
  const [toReturn, setToReturn] = useState("");
  // checkbox------------------
  const [isBackTicketFildsShow, setIsBackTicketFildsShow] = useState(true);

  // список городов для рейса
  const [locations, setLocations] = useState([]);
  // данные для отправки запроса(откуда,куда, дата)
  const [formData, setFormData] = useState({});
  // делаем кнопку поиска билетов активной только тогда,
  //   когда все поля выбраны
  const [disButton, setDisButton] = useState(true);

  const handleChangeFromReturn = (event) => {
    setFromReturn(event.target.value);
  };
  const handleChangeToReturn = (event) => {
    setToReturn(event.target.value);
  };
  // end select-----------------

  const checkButtonDisabled = (val) => {
    threeLengthArray.push(val);
    if (threeLengthArray.length >= 3) {
      setDisButton(false);
    }
  };

  const onChangeFrom = (val) => {
    setFormData({ ...formData, ...{ startLocation: val.target.value } });
    checkButtonDisabled(val.target.value);
  };

  const onChangeTo = (val) => {
    setFormData({ ...formData, ...{ endLocation: val.target.value } });
    checkButtonDisabled(val.target.value);
  };

  const onChangeDate = (val) => {
    const journeyDate = format(val, "yyyy-MM-dd");
    setFormData({ ...formData, ...{ journeyDate } });
    checkButtonDisabled(val);
  };

  useEffect(() => {
    // запрос на получения списка городов для рейсов
    fetchAllLocations();
  }, []);

  // получаем список городов для селекта
  const fetchAllLocations = async () => {
    const locations = await getAllLocations();
    setLocations(locations);
  };

  //
  const dummytransition = () => {
    // console.log('dummytransition', {
    //   pathname: "/buses",
    //   query: formData
    // })
    Router.push({
      // pathname: "/buses",
      pathname: "/busesMaterial",
      query: formData,
    });
  };

  let defaultOptionValue = null;

  // нужна ли тут на самом деле эта функция это вопрос
  const getDefaultSelectValue = (type) => {
    // console.log('getDefaultSelectValue', props)
    if (
      props &&
      props.hasOwnProperty("info") &&
      props.info.hasOwnProperty(type)
    ) {
      return props.info.type;
    } else {
      // return ''
      return [];
    }
  };

  /**
   * 
   * @param {number} status 
   * @returns jsx component
   * 
   * status = 1 - desctop
   * status = 2 - mobile
   */
  const getSearchTicketsBtn = (status) => {
    if (
      (status === 1 && !isNotMobile) ||
      (status === 2 && isNotMobile)
    ) return <></>

    return (
      <Grid item xs={12} sm={12} md={2} className={classes.gridSelect}>
        <Box
          sx={{
            ml: !isNotMobile ? 0 : 1,
            mt: !isNotMobile ? 1 : 0
          }}
          className={styles.search_btn_container}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={styles.search_btn}
            onClick={dummytransition}
            disabled={disButton}
            startIcon={<SearchIcon/>}
            fullWidth={isNotMobile ? false : true}
          >
            Найти билет
          </Button>
        </Box>
      </Grid>
    );
  }

  return (
      <div className={classes.heroContent}>
        {props.type !== "searchPage" ? (
          // welcome block
          <Container maxWidth="md" className={styles.welcome_block}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ color: "white" }}
            >
              Билеты на автобус
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{ color: "white" }}
            >
              по Украине, Польше и Европе
            </Typography>
          </Container>
        ) : <></>}

        {/* thither */}
        <Container maxWidth="lg" className={styles.search_tickets}>
          <Grid container gap={0}>
            <Grid item xs={3} sm={3} md={3}></Grid>
            {/* откуда */}
            <Grid item xs={12} sm={12} md={2} className={classes.gridSelect}>
              <Autocomplete
                  disablePortal
                  id="toCity1"
                  className={`${classes.select} ${classes.searchField} first_el`}
                  // options={getDefaultSelectValue("startLocation")}
                  options={locations.map(location => location.name)}
                  onChange={onChangeFrom}
                  renderInput={(params) => (
                    <TextField {...params} label="Откуда" className={`${classes.searchFieldrenderedInput} first_input_el`} />
                  )}
                />
            </Grid>
            {/* куда */}
            <Grid item xs={12} sm={12} md={2} className={classes.gridSelect}>
              <Autocomplete
                  disablePortal
                  id="toCity2"
                  className={`${classes.select} ${classes.searchField}`}
                  // options={getDefaultSelectValue("startLocation")}
                  options={locations.map(location => location.name)}
                  onChange={onChangeTo}
                  style={{borderRadius: '0px'}}
                  renderInput={(params) => (
                    <TextField {...params} label="Куда" className={`${classes.searchFieldrenderedInput} middle_input_el`} />
                  )}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={2}
              className={`${classes.gridSelect}`}
            >
              <MaterialUIPickers
                value={props.info ? new Date(props.info.journeyDate) : new Date()}
                onChangeDate={onChangeDate}
                classes={`${classes.dataPicker} ${classes.searchField}`}
                isLastElementInRow
              />
            </Grid>

            {/* search btn */}
            {getSearchTicketsBtn(1)}

            <Grid item xs={3}></Grid>
          </Grid>

          {/* back tickets checkbox */}
          {props.type !== "searchPage" ? (
            <Grid container gap={3} justifyContent="center">
              <Grid item xs={6} className={styles.returnBackCheckboxWrap}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isBackTicketFildsShow}
                        onChange={(e) => setIsBackTicketFildsShow(!isBackTicketFildsShow)}
                        color="primary"
                        className={styles.returnBackCheckbox}
                      />
                    }
                    className={styles.customFormControlClass}
                    label="Обратный билет"
                    sx={{
                      color: '#fff', fontSize: 34, 
                    }}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          ) : <></>}
          {/* checkox end */}
        </Container>

        {/* back */}
        {(props.type !== "searchPage" && isBackTicketFildsShow) ? 
        // {props.type !== "searchPage" ? (
          <Container
            maxWidth="lg"
            className={`search-tickets ${styles.return_trip} ${
              isBackTicketFildsShow ? "activate" : ""
            }`}
          >
            <Grid container gap={0}>
              <Grid item xs={3} sm={3} md={3}></Grid>
              {/* откуда */}
              <Grid item xs={12} sm={12} md={2}>
                <Autocomplete
                  disablePortal
                  id="fromCity1"
                  className={`${classes.select} ${classes.searchField} first_el`}
                  // options={getDefaultSelectValue("startLocation")}
                  options={locations.map(location => location.name)}
                  value={fromReturn}
                  onChange={handleChangeFromReturn}
                  renderInput={(params) => (
                    <TextField {...params} label="Откуда" className={`${classes.searchFieldrenderedInput} first_input_el`} />
                  )}
                />
              </Grid>
              {/* куда */}
              <Grid item xs={12} sm={12} md={2}>
                <Autocomplete
                  disablePortal
                  id="fromCity2"
                  className={`${classes.select} ${classes.searchField}`}
                  // options={getDefaultSelectValue("startLocation")}
                  options={locations.map(location => location.name)}
                  value={fromReturn}
                  onChange={handleChangeToReturn}
                  renderInput={(params) => (
                    <TextField {...params} label="Куда" className={`${classes.searchFieldrenderedInput} middle_input_el`} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2}>
                <MaterialUIPickers
                  classes={`${classes.select} ${classes.searchField}`}
                  isLastElementInRow
                />
              </Grid>

              {/* search btn */}
              {getSearchTicketsBtn(2)}

              <Grid item xs={3}></Grid>
            </Grid>
          </Container> : <></>}
        {/* two part end*/}
      </div>
  );
}

export default SearchTickets;
