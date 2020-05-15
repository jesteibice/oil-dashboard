import React, { useState, Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "./Dashboard.css";
import PerfectScrollbar from "react-perfect-scrollbar";
// import Iframe from 'react-iframe'
// import VectorMap from 'react-jvectormap';
// import WorldMap from 'react-world-map';
// var WorldMap = require('react-world-map');
// import { ReactWorldCountriesMap } from "react-world-countries-map"
import { GeoMap } from "@corps-ui/maps";
import countries from "../countries.json";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
// url to a valid topojson file
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

var numeral = require("numeral");

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
    // lineHeight: "44px",
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
  boxc: {
    minHeight: "41.6vh",

    height: "41.6vh",
  },
}));

// window.addEventListener('WorldMapClicked', function(e) {console.log('map was clicked, current selection is: ', e.detail.clickedState)});

function Dashboard() {
  const classes = useStyles();

  const [map, setMap] = useState(false);
  const [wprod, setWprod] = useState("");
  const [wconsum, setWconsum] = useState("");
  const [brent, setBrent] = useState("");
  const [wti, setWti] = useState("");

  //   if (map) {
  //     console.log('loaded')
  //     // var mapa = document.querySelectorAll("iframe").contentWindow;
  //     // console.log(mapa)
  //     // const hx = sx;
  //     // document.getElementsByTagName("svg").sytle.cssText = "background: blue;";
  // //     var styleEl = document.createElement('style');
  // // styleEl.innerHTML = 'svg { background-color: blue ;}';
  // // document.head.appendChild(styleEl);
  // setTimeout(function(){
  //   //do what you need here
  //   setStylePath("Map.css")
  // }, 2000);

  //   }

  // var obj = JSON.stringify(countries)
  // var i;
  // var array1 = new Array;
  // var array2 = new Array;
  // var array3 = new Array;

  // for (i = 0; i < 250; i++) {
  //   var fil1 = (countries[i]["ISO3166-1-Alpha-3"]);
  //   // var fil1 = (countries[i]["ISO3166-1-Alpha-3"] + " " + i);
  //   var bycountryconsum = "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-" + fil1 + "-TBPD.A";
  //   var bycountryprod = "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-" + fil1 + "-TBPD.M";
  //   array1.push(bycountryconsum);
  //   array2.push(bycountryprod)
  // }
  // setTimeout(function(){
  //   //do what you need here
  //   for (i = 0; i < 50; i++) {
  //   // console.log(array2[i])
  //   // console.log(array1[i]);
  //   fetch(array2[i], {
  //     method: 'GET'
  //   })
  //   .then(function(response) { return response.json(); })
  //   .then(function(json) {
  //     // console.log(json.series[0].data[0])
  //     // var result = {};
  //     // result["key"] = {}
  //     // result["key"].json = json
  //     array3.push(json)
  //     // console.log(json.series)

  //     // use the json
  //   });
  //   }
  // //   array3.sort(function(a, b){return b-a});

  // //   array3.sort(function(a, b) {
  // //     return parseFloat(a.price) - parseFloat(b.price);
  // // });
  //   console.log(array3)
  //   // console.log(array3.series.data)

  //   // console.log(array3.json[0].series[0].data[0])
  // }, 2500);

  axios
    .get(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-WORL-TBPD.M"
    )
    .then(
      (response) => {
        var wordprod = response.data;
        var wordprod2 = wordprod.series[0].data[0][1];
        var wordprod22 = wordprod2.toFixed(2);
        var wordprod3 = wordprod22.toString().split(".").join("");
        wordprod3 += 0;
        // var wordprod3 = wordprod2.toString();
        var string = numeral(wordprod3).format("0.00a");
        var end = string.replace(/m/g, "");
        setWprod(end);
        console.log(wordprod3);
      },
      (error) => {
        console.log(error);
      }
    );

  axios
    .get(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-WORL-TBPD.A"
    )
    .then(
      (response) => {
        var wordconsum = response.data;
        var wordconsum2 = wordconsum.series[0].data[0][1];
        var wordconsum3 = wordconsum2.toFixed(3);
        var wordconsum4 = wordconsum3.toString().split(".").join("");
        var string2 = numeral(wordconsum4).format("0.00a");
        var end2 = string2.replace(/m/g, "");
        setWconsum(end2);
      },
      (error) => {
        console.log(error);
      }
    );

  axios
    .get(
      "https://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=PET.RBRTE.D"
    )
    .then(
      (response) => {
        var brent = response.data;
        var brent2 = brent.series[0].data[0][1];
        var brent3 = numeral(brent2).format("$00.0");
        setBrent(brent3);
      },
      (error) => {
        console.log(error);
      }
    );

  axios
    .get(
      "https://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=PET.RWTC.D"
    )
    .then(
      (response) => {
        var wti = response.data;
        var wti2 = wti.series[0].data[0][1];
        var wti3 = numeral(wti2).format("$00.0");
        setWti(wti3);
      },
      (error) => {
        console.log(error);
      }
    );

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
                  <label className="bigwhite">{wprod}</label>
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
            <Grid item xs={5} className="mapacont">
              {/* <Iframe onLoad={() => setMap(true)} url="https://www.eia.gov/opendata/embed/iframe.php?geoset_id=INTL.53-1-TBPD.M&map=world&regions=WLD&relation_mode=line%22" */}
  
              <div className="map">
           
            
                {/* <ComposableMap>
                <ZoomableGroup>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                      ))
                    }
                  </Geographies>
                  </ZoomableGroup>
                </ComposableMap>{" "} */}
    <object type="text/html" data="https://www.eia.gov/opendata/embed/iframe.php?geoset_id=INTL.53-1-TBPD.M&map=world&regions=WLD&relation_mode=line%22" width="100%" height="100%" style={{overflow: "auto", border:"none"}}>
    </object>
              </div>
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
                        <label className="bigwhite2">{wconsum}</label>
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
                        <div className="bigwhite3">{brent}</div>
                      </div>
                      <div className="half halftwo">
                        <div className="brent">WTI</div>
                        <div className="bigwhite4">{wti}</div>
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
