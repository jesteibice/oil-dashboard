import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import { shadows } from '@material-ui/system';
import Box from "@material-ui/core/Box";
import "./Dashboard.css";
// import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from "react-perfect-scrollbar";
const axios = require('axios');

// GET request for remote image
// axios({
//   method: 'get',
//   url: 'https://www.eia.gov/opendata/embed/iframe.php?geoset_id=INTL.53-1-TBPD.M&map=world&regions=WLD&relation_mode=line%22',
//   responseType: 'stream'
// })
//   .then(function (response) {
//     console.log(response.data);
//   });


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    overflow: "hidden",
  },
  rootright: {
    flexGrow: 1,
    marginTop: 0,
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#878ECA",
    backgroundColor: "#232554",
    marginTop: "0.5em",
    fontFamily: "Avenir Next",
    fontSize: "28px",
    borderRadius: "0.3em",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: "0.02em",
    lineHeight: "42px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    minHeight: "10vh",
  },
  leftpane: {
    minHeight: "75vh",
  },
  paperlefttop: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#878ECA",
    position: "relative",
    backgroundColor: "#232554",
    marginTop: "0",
    fontSize: "21px",
    borderRadius: "0.3em",
    letterSpacing: "0.02em",
    lineHeight: "44px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: "0.7em",
    minHeight: "25vh",
    fontFamily: "Avenir Next",
    fontStyle: "normal",
    fontWeight: "normal",
  },

  paperleftbottom: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#878ECA",
    position: "relative",
    backgroundColor: "#232554",
    marginTop: "0.7em",
    fontSize: "30px",
    borderRadius: "0.3em",
    // letterSpacing: "0.17px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    minHeight: "49vh",
    fontFamily: "Avenir Next",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "21px",
    lineHeight: "25px",

    // letter-spacing: 0.02em;
  },

  papermidmid: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#878ECA",
    position: "relative",
    backgroundColor: "#232554",
    marginTop: "0",
    fontSize: "30px",
    borderRadius: "0.3em",
    fontWeight: 350,
    letterSpacing: "0.17px",
    lineHeight: "44px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    minHeight: "34.9vh",
  },
  paperBottom: {
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: "#878ECA",
    position: "relative",
    backgroundColor: "#232554",
    marginTop: "0",
    marginBottom: "0",

    fontSize: "13px",
    lineHeight: "18px",
    letterSpacing: "0.08px",
    fontWeight: 300,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: "2em",
    paddingRight: "2em",
    // paddingBottom: 0,
    minHeight: "5vh",
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#878ECA",
    position: "relative",
    backgroundColor: "#232554",
    marginTop: "0",
    borderRadius: "0.3em",
    // letterSpacing: "0.17px",
    lineHeight: "44px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: "16px",
    // flexGrow: 5,
    minHeight: "16vh",
    fontFamily: "Avenir Next",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "21px",
    lineHeight: "25px",
    letterSpacing: "0.02em",
  },
  paper3: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#878ECA",
    position: "relative",
    backgroundColor: "#232554",
    // marginTop: "0",
    marginTop: "8px",

    borderRadius: "0.3em",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    minHeight: "20vh",
    height: "20vh",
    fontFamily: "Avenir Next",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "21px",
    lineHeight: "25px",
    letterSpacing: "0.02em",
  },
  paper4: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: "#878ECA",
    position: "relative",
    backgroundColor: "#232554",
    marginTop: "0",
    fontSize: "30px",
    borderRadius: "0.3em",
    fontWeight: 350,
    letterSpacing: "0.17px",
    lineHeight: "44px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: "0.7em",
    // flexGrow: 5,
    minHeight: "38.5vh",
  },
  boxc:{
    minHeight: "41.6vh",

    height: "41.6vh",
  }
}));

function Dashboard() {
  const classes = useStyles();


  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        style={{ backgroundColor: "#1C1E43", height: "100vh" }}
      >
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                bgcolor="#1B1F44"
                m={8}
                p={8}
                boxShadow={6}
                color="text.primary"
                clone
              >
                <Paper className={classes.paper}>
                  Worldwide Oil Production
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={3} className={classes.leftpane}>
              <Box
                bgcolor="#1B1F44"
                m={8}
                p={8}
                boxShadow={6}
                color="text.primary"
                clone
              >
                <Paper className={classes.paperlefttop}>
                  <div>World Oil Production</div>
                  <label className="bigwhite">17.87</label>
                  <label className="underbig"> million barrel per day</label>
                </Paper>
              </Box>
              <Box
                bgcolor="#1B1F44"
                m={8}
                p={8}
                boxShadow={6}
                color="text.primary"
                clone
              >
                <Paper className={classes.paperleftbottom}>
                  <div>Top Oil Producers</div>{" "}
                  {/* <div className="maintable scroll"> */}
                  <PerfectScrollbar className="maintable">
                    <div>
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>{" "}
                      <div className="table">
                        <div className="left_col">Country 1</div>
                        <div className="right_col">5,600,200</div>
                      </div>
                    </div>
                  </PerfectScrollbar>
                  {/* </div> */}
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <iframe className="map" frameBorder="0" style={{fill: "#1C1E43"}} src="https://www.eia.gov/opendata/embed/iframe.php?geoset_id=INTL.53-1-TBPD.M&map=world&regions=WLD&relation_mode=line%22"></iframe>
              {/* <Paper className={classes.papermidmid}>xs=6</Paper> */}
            </Grid>
            <Grid item xs>
              
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="stretch"
                spacing={2}
              >
                {" "}
                <Grid item xs={8}>
                <div className={classes.boxc} spacing={2}>
                  <Box
                    bgcolor="#1B1F44"
                    m={8}
                    p={8}
                    boxShadow={6}
                    color="text.primary"
                    clone
                  >
                    <Paper className={classes.paper2}>
                      <div>World Oil Consumption</div>
                      <label className="bigwhite2">93</label>
                      <label className="underbig2">
                        {" "}
                        million barrel per day
                      </label>
                    </Paper>
                  </Box>
                  <Box
                    bgcolor="#1B1F44"
                    m={8}
                    p={8}
                    boxShadow={6}
                    color="text.primary"
                    clone
                  >
                    <Paper className={classes.paper3}>
                      <div>Top 3 Oil Consumers</div>
                      <div className="maintable2">
                        <div>
                          <div className="table2">
                            <div className="left_col">Country 1</div>
                            <div className="right_col">5,600,200</div>
                          </div>
                          <div className="table2">
                            <div className="left_col">Country 1</div>
                            <div className="right_col">5,600,200</div>
                          </div>{" "}
                          <div className="table2">
                            <div className="left_col">Country 1</div>
                            <div className="right_col">5,600,200</div>
                          </div>{" "}
                        </div>
                      </div>
                    </Paper>
                  </Box>
                  </div>

                </Grid>
                <Grid item xs={4}>
                  <Box
                    bgcolor="#1B1F44"
                    m={8}
                    p={8}
                    boxShadow={6}
                    color="text.primary"
                    clone
                  >
                    <Paper className={classes.paper4}>
                      <div className="half halfone">
                        <div className="brent">Brent</div>
                        <div className="bigwhite3">$20.7</div>
                      </div>
                      <div className="half halftwo">
                        <div className="brent">Brent</div>
                        <div className="bigwhite4">$20.7</div>
                      </div>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs>
                <Box
                  bgcolor="#1B1F44"
                  m={8}
                  p={8}
                  boxShadow={6}
                  color="text.primary"
                  clone
                >
                  <Paper className={classes.papermidmid}>xs=12</Paper>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                bgcolor="#1B1F44"
                m={8}
                p={8}
                boxShadow={6}
                color="text.primary"
                clone
              >
                <Paper className={classes.paperBottom}>
                  *Source EIA (www.eia.gov) and national statistics sources.
                  Petroleum supply includes the production of crude oil
                  (including lease condensate), natural gas plant liquids, and
                  it also includes refinery processing gain for volume (TBPD)
                  only. Petroleum and other liquids consumption includes all
                  domestic use and international bunkering of refined products,
                  refinery fuel, and where available, direct combustion of crude
                  oil and refinery by-products.
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </div>

        {/* <Typography component="div" style={{ backgroundColor: '#1B1F44', height: '100vh' }} /> */}
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
