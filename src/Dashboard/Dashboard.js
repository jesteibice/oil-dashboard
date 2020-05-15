import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "./Dashboard.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import Chart from "react-apexcharts";
import numeral from "numeral";

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
    maxHeight: "34.9vh",
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

var options = {
  series: [
    {
      name: "STOCK ABC",
      // data: series.monthDataSeries1.prices
    },
  ],
  chart: {
    type: "area",
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },

  title: {
    text: "Fundamental Analysis of Stocks",
    align: "left",
  },
  subtitle: {
    text: "Price Movements",
    align: "left",
  },
  // labels: series.monthDataSeries1.dates,
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    opposite: true,
  },
  legend: {
    horizontalAlign: "left",
  },
};


// window.addEventListener('WorldMapClicked', function(e) {console.log('map was clicked, current selection is: ', e.detail.clickedState)});

function Dashboard() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [dataC, setDataC] = useState([]);
  const [map, setMap] = useState(false);
  const [wprod, setWprod] = useState("");
  const [wconsum, setWconsum] = useState("");
  const [brent, setBrent] = useState("");
  const [wti, setWti] = useState("");
  const [chart, setChart] = useState("");
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      zoom: {
        enabled: false,
      },
      width: "100%",
      toolbar: {
        show: true,
        offsetX: 5,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          customIcons: [],
        },
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    // labels: series.monthDataSeries1.dates,
    xaxis: {
      // type: 'datetime',
      type: "category",
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      labels: {
        show: true,
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        show: true,
      },
    },
    legend: {
      horizontalAlign: "left",
    },
    noData: {
      text: "Loading...",
    },

    colors: ["#66C7DC", "#232554"],
    grid: {
      show: true,
      borderColor: "#E7E7E7",
      strokeDashArray: 5000,
      opacity: 0.1,
      position: "back",
      // xaxis: {
      //     lines: {
      //         show: true
      //     }
      // },
      // yaxis: {
      //     lines: {
      //         show: false
      //     }
      // },
      // row: {
      //     colors: undefined,
      //     opacity: 0.5
      // },
      // column: {
      //     colors: undefined,
      //     opacity: 0.5
      // },
      // padding: {
      //     top: 0,
      //     right: 0,
      //     bottom: 0,
      //     left: 0
      // },
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);
  // const [chartProd, setChartProd] = useState("");
  // const [chartConsum, setChartConsum] = useState("");

  // var i;
  // for (i = 0; i < 30; i++) {
  //   var fil1 = (top50[i]["ISO3166-1-Alpha-3"]);
  //   var retrievedFil1 = localStorage.getItem('topoilprod'+fil1);

  //   console.log(JSON.parse(retrievedFil1).series[0].data[0][1]);
  //   console.log(JSON.parse(retrievedFil1).series[0].name.replace("Petroleum and other liquids production, ", "").replace(", Monthly", ""));
  //   console.log(JSON.parse(retrievedFil1).series[0].geography);
  // }

  useEffect(() => {
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
          console.log("setWprod", end);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
          console.log("setBrent", brent3);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
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
  }, []);

  const handleResponseData = (url) => {
    axios.get(url).then(
      (response) => {
        const topoilprod = response.data;

        const name = topoilprod.series[0].name
          .replace("Petroleum and other liquids production, ", "")
          .replace(", Monthly", "");
        const geography = topoilprod.series[0].geography;
        const newestData = topoilprod.series[0].data[0][1];

        const newItem = {
          name,
          geography,
          newestData,
        };

        setData((oldData) => [...oldData, newItem]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleResponseData2 = (url) => {
    axios.get(url).then(
      (response) => {
        const topoilconsum = response.data;
        console.log(topoilconsum.series[0].name)
        const name = topoilconsum.series[0].name
          .replace("Petroleum and other liquids consumption, ", "")
          .replace(", Annual", "");
        const geography = topoilconsum.series[0].geography;
        const newestData = topoilconsum.series[0].data[0][1];

        const newItem = {
          name,
          geography,
          newestData,
        };

        setDataC((oldDataC) => [...oldDataC, newItem]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // TODO: USA C
  useEffect(() => {
    handleResponseData2(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-USA-TBPD.A"
    );
  }, []);

  // TODO: SAU C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-SAU-TBPD.A"     );   }, []);
  // TODO: RUS C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-RUS-TBPD.A"     );   }, []);
  // TODO: IRQ C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-IRQ-TBPD.A"     );   }, []);
  // TODO: IRN C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-IRN-TBPD.A"     );   }, []);
  // TODO: CHN C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-CHN-TBPD.A"     );   }, []);
  // TODO: CAN C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-CAN-TBPD.A"     );   }, []);
  // TODO: ARE C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-ARE-TBPD.A"     );   }, []);
  // TODO: KWT C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-KWT-TBPD.A"     );   }, []);
  // TODO: BRA C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-BRA-TBPD.A"     );   }, []);
  // TODO: VEN C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-VEN-TBPD.A"     );   }, []);
  // TODO: MEX C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-MEX-TBPD.A"     );   }, []);
  // TODO: NGA C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-NGA-TBPD.A"     );   }, []);
  // TODO: AGO C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-AGO-TBPD.A"     );   }, []);
  // TODO: NOR C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-NOR-TBPD.A"     );   }, []);
  // TODO: KAZ C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-KAZ-TBPD.A"     );   }, []);
  // TODO: QAT C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-QAT-TBPD.A"     );   }, []);
  // TODO: DZA C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-DZA-TBPD.A"     );   }, []);
  // TODO: OMN C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-OMN-TBPD.A"     );   }, []);
  // TODO: LBY C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-LBY-TBPD.A"     );   }, []);
  // TODO: GBR C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-GBR-TBPD.A"     );   }, []);
  // TODO: COL C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-COL-TBPD.A"     );   }, []);
  // TODO: IDN C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-IDN-TBPD.A"     );   }, []);
  // TODO: AZE C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-AZE-TBPD.A"     );   }, []);
  // TODO: IND C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-IND-TBPD.A"     );   }, []);
  // TODO: MYS C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-MYS-TBPD.A"     );   }, []);
  // TODO: ECU C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-ECU-TBPD.A"     );   }, []);
  // TODO: ARG C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-ARG-TBPD.A"     );   }, []);
  // TODO: ROU C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-ROU-TBPD.A"     );   }, []);
  // TODO: EGY C   
  useEffect(() => {     handleResponseData2(       "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.5-2-EGY-TBPD.A"     );   }, []);

  // TODO: USA
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-USA-TBPD.M"
    );
  }, []);

  // TODO: SAU
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-SAU-TBPD.M"
    );
  }, []);

  // TODO: RUS
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-RUS-TBPD.M"
    );
  }, []);

  // TODO: IRQ
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-IRQ-TBPD.M"
    );
  }, []);
  // TODO: IRN
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-IRN-TBPD.M"
    );
  }, []);
  // TODO: CHN
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-CHN-TBPD.M"
    );
  }, []);
  // TODO: CAN
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-CAN-TBPD.M"
    );
  }, []);
  // TODO: ARE
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-ARE-TBPD.M"
    );
  }, []);
  // TODO: KWT
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-KWT-TBPD.M"
    );
  }, []);
  // TODO: BRA
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-BRA-TBPD.M"
    );
  }, []);
  // TODO: VEN
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-VEN-TBPD.M"
    );
  }, []);
  // TODO: MEX
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-MEX-TBPD.M"
    );
  }, []);
  // TODO: NGA
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-NGA-TBPD.M"
    );
  }, []);
  // TODO: AGO
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-AGO-TBPD.M"
    );
  }, []);
  // TODO: NOR
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-NOR-TBPD.M"
    );
  }, []);
  // TODO: KAZ
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-KAZ-TBPD.M"
    );
  }, []);
  // TODO: QAT
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-QAT-TBPD.M"
    );
  }, []);
  // TODO: DZA
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-DZA-TBPD.M"
    );
  }, []);
  // TODO: OMN
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-OMN-TBPD.M"
    );
  }, []);
  // TODO: LBY
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-LBY-TBPD.M"
    );
  }, []);
  // TODO: GBR
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-GBR-TBPD.M"
    );
  }, []);
  // TODO: COL
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-COL-TBPD.M"
    );
  }, []);
  // TODO: IDN
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-IDN-TBPD.M"
    );
  }, []);
  // TODO: AZE
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-AZE-TBPD.M"
    );
  }, []);
  // TODO: IND
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-IND-TBPD.M"
    );
  }, []);
  // TODO: MYS
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-MYS-TBPD.M"
    );
  }, []);
  // TODO: ECU
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-ECU-TBPD.M"
    );
  }, []);
  // TODO: ARG
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-ARG-TBPD.M"
    );
  }, []);
  // TODO: ROU
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-ROU-TBPD.M"
    );
  }, []);
  // TODO: EGY
  useEffect(() => {
    handleResponseData(
      "http://api.eia.gov/series/?api_key=c10de4f134f66672b5c80ff6c0eda8c4&series_id=INTL.53-1-EGY-TBPD.M"
    );
  }, []);

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
                      {data
                        .sort(
                          (prev, curr) =>
                            parseFloat(curr.newestData) -
                            parseFloat(prev.newestData)
                        )
                        .map((item) => (
                          <div className="table">
                            {/* <div className="left_col">{item.geography} - {item.name}</div> */}
                            <div className="left_col">{item.name}</div>
                            <div className="right_col">{`${item.newestData.toFixed(
                              1
                            )}k`}</div>
                          </div>
                        ))}
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
                <object
                  type="text/html"
                  data="https://www.eia.gov/opendata/embed/iframe.php?geoset_id=INTL.53-1-TBPD.M&map=world&regions=WLD&relation_mode=line%22"
                  width="100%"
                  height="100%"
                  style={{ overflow: "auto", border: "none" }}
                ></object>
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
                          {dataC
                        .sort(
                          (prev, curr) =>
                            parseFloat(curr.newestData) -
                            parseFloat(prev.newestData)
                        ).slice(0,3)
                        .map((item) => (
                          <div className="table2">
                          {/* <div className="left_col">{item.geography} - {item.name}</div> */}
                          <div className="left_col">{item.name}</div>
                          <div className="right_col">{`${item.newestData.toFixed(
                              1
                            )}k`}</div>
                          </div>
                        ))}

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
                  <Paper className={classes.papermidmid}>
                    {/* <div className="mixed-chart"> */}
                    <Chart
                      options={options}
                      series={series}
                      type="area"
                      width="100%"
                      height="95%"
                    />
                    {/* </div> */}
                  </Paper>
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
