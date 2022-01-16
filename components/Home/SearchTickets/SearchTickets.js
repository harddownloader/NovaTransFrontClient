import React, { useState, useEffect } from "react";
// time and data
// import moment from "moment";
import { format } from "date-fns";
// makestales
// import { makeStyles } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// next
import Router from "next/router";
// material
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// actions
import { getAllLocations } from "@/actions/location";

// checkbox
// import CheckboxLabels from '../../Checkbox/Checkbox'
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// pickers
import MaterialUIPickers from "../../Pickers/DataPicker";
// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

// styles
import styles from "@/styles/SearchTickets.module.scss";
import { NaturePeopleOutlined } from "@mui/icons-material";

// images
const BgImage = "/static/img/backgrounds/bg-winter.jpg";

const { Option } = Select;

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
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
    "& .first_el": {
      borderRadius: "4px 0 0 4px",
    },
    "&.last_el": {
      borderRadius: "0 4px 4px 0",
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

    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
    "&.MuiFilledInput-root.Mui-focused": {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const threeLengthArray = [];

function SearchTickets(props) {
  const classes = useStyles();

  // select-----------------
  // туда
  // const [from, setFrom] = React.useState('');
  // const [to, setTo] = React.useState('');

  // const handleChangeFrom = (event) => {
  //   setFrom(event.target.value);
  // };
  // const handleChangeTo = (event) => {
  //   setTo(event.target.value);
  // };
  // обратно
  const [fromReturn, setFromReturn] = React.useState("");
  const [toReturn, setToReturn] = React.useState("");

  const handleChangeFromReturn = (event) => {
    setFromReturn(event.target.value);
  };
  const handleChangeToReturn = (event) => {
    setToReturn(event.target.value);
  };
  // end select-----------------

  // checkbox------------------
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChangeCheckboxReturn = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // checkbox end -------------

  // список городов для рейса
  const [locations, setLocations] = useState([]);
  // данные для отправки запроса(откуда,куда, дата)
  const [formData, setFormData] = useState({});
  // делаем кнопку поиска билетов активной только тогда,
  //   когда все поля выбраны
  const [disButton, setDisButton] = useState(true);

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

  const getDefaultSelectValue = (type) => {
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

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.heroContent}>
      {props.type !== "searchPage" ? (
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
      ) : null}
      {/* </div> */}

      {/* <div className={classes.heroContent}> */}
      <Container maxWidth="lg" className={styles.search_tickets}>
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3} md={3}></Grid>
          {/* откуда */}
          <Grid item xs={12} sm={2} md={2} className={classes.gridSelect}>
            <FormControl className={classes.formControl} variant="filled">
              <InputLabel id="demo-simple-select-label">Откуда</InputLabel>
              {/* <Select
                value={getDefaultSelectValue('startLocation')}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={from}
                // onChange={handleChangeFrom}
                onChange={onChangeFrom}
                className={`${classes.select} ${classes.searchField} first_el`}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                SelectDisplayProps={{gg: "22"}}
              >
                {locations.map((location) => (
                  <MenuItem value={location._id} key={location._id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={getDefaultSelectValue("startLocation")}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Movie" />
                )}
              />
            </FormControl>
          </Grid>
          {/* куда */}
          <Grid item xs={12} sm={2} md={2} className={classes.gridSelect}>
            <FormControl
              className={`${classes.formControl} center_el`}
              variant="filled"
            >
              <InputLabel id="demo-simple-select-label">Куда</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getDefaultSelectValue("endLocation")}
                // value={to}
                // onChange={handleChangeTo}
                onChange={onChangeTo}
                className={`${classes.select} ${classes.searchField}`}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {locations.map((location) => (
                  <MenuItem value={location._id} key={location._id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            md={2}
            className={`${classes.gridSelect} last_el`}
          >
            <MaterialUIPickers
              value={props.info ? new Date(props.info.journeyDate) : new Date()}
              onChangeDate={onChangeDate}
              classes={`${classes.dataPicker} ${classes.searchField} last_el`}
            />
          </Grid>

          <Grid item xs={12} sm={2} md={2} className={classes.gridSelect}>
            <Box display={{ xs: "none", md: "block" }} m={1}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.margin}
                onClick={dummytransition}
                disabled={disButton}
              >
                Найти билет
              </Button>
            </Box>
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>

        {/* checkbox */}
        {props.type !== "searchPage" ? (
          <Grid container spacing={3} justify="center">
            <Grid item xs={6}>
              {/* <CheckboxLabels /> */}
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChangeCheckboxReturn}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Обратный билет"
                />
              </FormGroup>
            </Grid>
          </Grid>
        ) : null}
        {/* checkox end */}
      </Container>

      {/* two part */}
      {props.type !== "searchPage" ? (
        <Container
          maxWidth="lg"
          className={`search-tickets ${styles.return_trip} ${
            state.checkedB ? "activate" : ""
          }`}
        >
          <Grid container spacing={3}>
            <Grid item xs={3} sm={3} md={3}></Grid>
            {/* откуда */}
            <Grid item xs={12} sm={2} md={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Откуда</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fromReturn}
                  onChange={handleChangeFromReturn}
                  className={`${classes.select} ${classes.searchField}`}
                >
                  {locations.map((location) => (
                    <MenuItem value={location._id} key={location._id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* куда */}
            <Grid item xs={12} sm={2} md={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Куда</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={toReturn}
                  onChange={handleChangeToReturn}
                  className={`${classes.select} ${classes.searchField}`}
                >
                  {locations.map((location) => (
                    <MenuItem value={location._id} key={location._id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2} md={2}>
              <MaterialUIPickers
                classes={`${classes.select} ${classes.searchField}`}
              />
            </Grid>

            {/* <Grid item xs={12} sm={2} md={2}>
            <Box display={{ xs: 'block', md: 'none' }} m={1}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={styles.search_btn}
                onClick={() => { alert('clicked') }}
                disabled={disButton}
              >
                Найти билет
              </Button>
            </Box>
          </Grid> */}
          </Grid>
        </Container>
      ) : null}
      {/* two part end*/}
    </div>
    </ThemeProvider>
  );
}

export default SearchTickets;
