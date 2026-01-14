 import constants from "../../Common/Constants";

// import fetchData from "../../Common/Store/Sagas/SagaHelper";

const Data = {
  features: {
    servercommunication: {
      requestType: "GET",
      apiUrl: constants.get_graph_data+constants.version,
      metaData:true,
      onSuccess: (res) => {
        console.log("on Succes ", res);
      },
      onFailure: (res) => {
        console.log("on failure", res);
      },
    },
    graph: {
      title: "Sample",
      xAxisValue: "name",
      yAxisValue: "answer",
      result: "answer",
      data: [
        {
          id: 1,
          name: "CLO 1",
          answer: 70,
        },
        {
          id: 2,
          name: "CLO 2",
          answer: 80,
        },
        {
          id: 3,
          name: "CLO 3",
          answer: 40,
        },
        {
          id: 4,
          name: "CLO 4",
          answer: 60,
        },
        {
          id: 5,
          name: "CLO 5",
          answer: 100,
        },

      ],
    },
  },
};

const Config = {
  viewModes: {
    presentation: "colorPieChart",
    // layout: "horizontal" //or vertical
  },
  features: {
    fetchData: false,
    graph: true,
  },
};

const Appearance = {
  features: {
    graph: [
      {
        backgroundColor: "white",
        color: "black",
        width: "100%",
        height: "auto",
      },
    ],
  },
};


 export { Data, Config, Appearance };



// scatterChart

// import constants from "../../Common/Constants";

// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//       },
//       onFailure: (res) => {
//       },
//     },
//     graph: {
//       title: "Sample Scatter Chart",
//       xAxisValue: "id",        
//       yAxisValue: "answer",   
//       result: "answer",       
//       data: [
//         {
//           id: 1,
//           name: "CLO 1",
//           answer: 70,
//         },
//         {
//           id: 2,
//           name: "CLO 2",
//           answer: 80,
//         },
//         {
//           id: 3,
//           name: "CLO 3",
//           answer: 40,
//         },
//         {
//           id: 4,
//           name: "CLO 4",
//           answer: 60,
//         },
//         {
//           id: 5,
//           name: "CLO 5",
//           answer: 100,
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "scatterChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//     graphConfig: {
//       xaxis: { key: "id" }, // or "name" if you want "CLO 1"
//       series: [{ key: "answer", color: "#007bff" }],
//     },
//   },
// };

// const Appearance = {
//   features: {
//     graph: {
//       backgroundColor: "white",
//       color: "black",
//       width: "100%",
//       height: "auto",
//       barColor: "#007bff", 
//     },
//   },
// };

// export { Data, Config, Appearance };


//bubble chart

// import constants from "../../Common/Constants";

// // // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       title: "Sample Bubble Chart",
//       xAxisValue: "id",       
//       yAxisValue: "answer",   
//       result: "size",          // Bubble size used as result
//       data: [
//         {
//           id: 1,
//           name: "CLO 1",
//           answer: 70,
//           size: 10,
//         },
//         {
//           id: 2,
//           name: "CLO 2",
//           answer: 80,
//           size: 20,
//         },
//         {
//           id: 3,
//           name: "CLO 3",
//           answer: 40,
//           size: 15,
//         },
//         {
//           id: 4,
//           name: "CLO 4",
//           answer: 60,
//           size: 25,
//         },
//         {
//           id: 5,
//           name: "CLO 5",
//           answer: 100,
//           size: 35,
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "BubbleChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: {
//       backgroundColor: "white",
//       color: "black",
//       width: "100%",
//       height: "auto",
//       barColor: "#007bff", 
//     },
//   },
// };

// export { Data, Config, Appearance };



// box- plot chart

// import constants from "../../Common/Constants";

// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       title: "Sample Box Plot Chart",
//       xAxisValue: "name",
//       yAxisValue: "values",
//       result: "values",
//       data: [
//         {
//           id: 1,
//           name: "CLO 1",
//           values: [65, 70, 75, 80, 85],
//         },
//         {
//           id: 2,
//           name: "CLO 2",
//           values: [60, 62, 65, 67, 69],
//         },
//         {
//           id: 3,
//           name: "CLO 3",
//           values: [40, 45, 50, 55, 60],
//         },
//         {
//           id: 4,
//           name: "CLO 4",
//           values: [50, 55,  60, 62, 65],
//         },
//         {
//           id: 5,
//           name: "CLO 5",
//           values: [80, 85,90, 95, 100],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "boxPlotChart",  
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: {
//       backgroundColor: "white",
//       color: "black",
//       width: "100%",
//       height: "auto",
//       barColor: "#17a2b8", 
//     },
//   },
// };

// export { Data, Config, Appearance };



//candlestick Chart

// import constants from "../../Common/Constants";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       title: "Sample Candlestick Chart",
//       xAxisValue: "x",
//       yAxisValue: ["open", "high", "low", "close"], 
//       result: "ohlc", 
//       data: [
//         {
//           x: "2025-06-20",
//           open: 100,
//           high: 110,
//           low: 95,
//           close: 105,
//         },
//         {
//           x: "2025-06-21",
//           open: 106,
//           high: 115,
//           low: 104,
//           close: 110,
//         },
//         {
//           x: "2025-06-22",
//           open: 108,
//           high: 112,
//           low: 102,
//           close: 107,
//         },
//         {
//           x: "2025-06-23",
//           open: 107,
//           high: 111,
//           low: 103,
//           close: 109,
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "candlestickChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: {
//       backgroundColor: "white",
//       color: "black",
//       width: "100%",
//       height: "auto",
//       candleUpColor: "#26a69a",  
//       candleDownColor: "#ef5350", 
//       strokeColor: "#000", 
//     },
//   },
// };

// export { Data, Config, Appearance };


// Waterfall chart

// import constants from "../../Common/Constants";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       title: "Sample Waterfall Chart",
//       xAxisValue: "label",
//       yAxisValue: ["value"],
//       result: "waterfall", 
//       data: [
//         { label: "Starting Balance", value: 1000, type: "start" },
//         { label: "Revenue", value: 500, type: "increase" },
//         { label: "Operating Costs", value: -200, type: "decrease" },
//         { label: "Marketing", value: -100, type: "decrease" },
//         { label: "Other Income", value: 150, type: "increase" },
//         { label: "Final Balance", value: 1350, type: "end" },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "waterfallChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: {
//       backgroundColor: "white",
//       color: "black",
//       width: "100%",
//       height: "auto",
//       increaseColor: "#66bb6a",  
//       decreaseColor: "#ef5350",  
//       totalColor: "#42a5f5",     
//       strokeColor: "#000",
//     },
//   },
// };

// export { Data, Config, Appearance };



//Doughnut chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       title: "Doughnut chart",
//       dataKey: "value", // Important for doughnut
//       result: "value",
//       data: [
//         { id: 1, name: "CLO 1", value: 70 },
//         { id: 2, name: "CLO 2", value: 80 },
//         { id: 3, name: "CLO 3", value: 40 },
//         { id: 4, name: "CLO 4", value: 60 },
//         { id: 5, name: "CLO 5", value: 100 },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "doughnutChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "auto",
//         barColor: [
//           "#0088FE",
//           "#00C49F",
//           "#FFBB28", 
//           "#FF8042", 
//           "#AA00FF", 
//         ],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



// Histogram

// import constants from "../../Common/Constants";
// // // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       title: "Histogram Chart",
//       dataKey: "frequency", // y-axis value (height of bar)
//       result: "frequency",
//       data: [
//         { id: 1, range: "0-10", frequency: 2 },
//         { id: 2, range: "11-20", frequency: 5 },
//         { id: 3, range: "21-30", frequency: 10 },
//         { id: 4, range: "31-40", frequency: 7 },
//         { id: 5, range: "41-50", frequency: 1 },
//       ],
//       xAxisKey: "range", // bin range for x-axis
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "histogramChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "auto",
//         barColor: [
//           "#4caf50",
//         ],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };

// Streamgraph chart

// import constants from "../../Common/Constants";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       title: "CLO Performance Over Time (Streamgraph)",
//       xAxisValue: "time",  // time axis 
//       yAxisValue: "value", // generic value field used by chart
//       result: "stream",    // label for result type
//       data: [
//         {
//           time: "2021",
//           "CLO 1": 30,
//           "CLO 2": 50,
//           "CLO 3": 20,
//           "CLO 4": 10,
//           "CLO 5": 40,
//         },
//         {
//           time: "2022",
//           "CLO 1": 50,
//           "CLO 2": 40,
//           "CLO 3": 25,
//           "CLO 4": 35,
//           "CLO 5": 45,
//         },
//         {
//           time: "2023",
//           "CLO 1": 70,
//           "CLO 2": 60,
//           "CLO 3": 35,
//           "CLO 4": 55,
//           "CLO 5": 50,
//         },
//         {
//           time: "2024",
//           "CLO 1": 60,
//           "CLO 2": 65,
//           "CLO 3": 45,
//           "CLO 4": 50,
//           "CLO 5": 55,
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "streamgraph", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "400px",
//         barColor: "", 
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };

// //Lollipop Chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       type: "lollipop", 
//       title: "Lollipop Chart - CLO Performance",
//       xAxisValue: "name",
//       yAxisValue: "answer",
//       result: "answer",
//       data: [
//         { id: 1, name: "CLO 1", answer: 70 },
//         { id: 2, name: "CLO 2", answer: 80 },
//         { id: 3, name: "CLO 3", answer: 40 },
//         { id: 4, name: "CLO 4", answer: 60 },
//         { id: 5, name: "CLO 5", answer: 100 },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "lollipopChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "300px",
//         lineColor: "#8884d8",   
//         dotColor: "#8884d8",    
//         dotRadius: 6,           // size for circle
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// Spiral Plot Chart


// import constants from "../../Common/Constants";
// // // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       type: "spiral", 
//       title: "Spiral Chart - Monthly Performance",
//       xAxisValue: "month",   
//       yAxisValue: "value",   
//       result: "value",
//       data: [
//         { id: 1, month: "Jan", value: 65 },
//         { id: 2, month: "Feb", value: 72 },
//         { id: 3, month: "Mar", value: 78 },
//         { id: 4, month: "Apr", value: 55 },
//         { id: 5, month: "May", value: 60 },
//         { id: 6, month: "Jun", value: 90 },
//         { id: 7, month: "Jul", value: 95 },
//         { id: 8, month: "Aug", value: 85 },
//         { id: 9, month: "Sep", value: 70 },
//         { id: 10, month: "Oct", value: 68 },
//         { id: 11, month: "Nov", value: 58 },
//         { id: 12, month: "Dec", value: 62 },

//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "spiralChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "400px",
//         lineColor: "#00BFFF",   
//         dotColor: "#1E90FF",   
//         dotRadius: 5,
//         spiralTurns: 4,         // number of spiral loops
//         spiralGap: 20,         
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };




//Ridgeline Plot Chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on Failure", res);
//       },
//     },
//     graph: {
//       type: "ridgeline",  
//       title: "Ridgeline Plot - Department-wise Score Distribution",
//       xAxisValue: "score",
//       yAxisValue: "department",
//       result: "density",                       //common score
//       data: [
//         { department: "Sales", score: 45 },
//         { department: "Sales", score: 50 },
//         { department: "Sales", score: 60 },
//         { department: "Sales", score: 65 },
//         { department: "Marketing", score: 55 },
//         { department: "Marketing", score: 60 },
//         { department: "Marketing", score: 70 },
//         { department: "HR", score: 50 },
//         { department: "HR", score: 60 },
//         { department: "HR", score: 62 },
//         { department: "HR", score: 78 },
//         { department: "HR", score: 82 },
//         { department: "Engineering", score: 70 },
//         { department: "Engineering", score: 75 },
//         { department: "Engineering", score: 80 },
//         { department: "Engineering", score: 85 },
//         { department: "Support", score: 55 },
//         { department: "Support", score: 58 },
//         { department: "Support", score: 60 },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "ridgelineChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "500px",
//         ridgeLineColor: "#008080",    // Teal lines
//         fillOpacity: 0.6,
//         smoothCurves: true,
//         overlapFactor: 0.7,           // how much each ridge overlaps vertically
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };






// Apex line chart

// import constants from "../../Common/Constants";
// //  import fetchData from "../../Common/Store/Sagas/SagaHelper";
// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Monthly Performance",
//       xAxisValue: "month",
//       yAxisValue: "value",
//       data: [
//         { month: "Jan", value: 10 },
//         { month: "Feb", value: 41 },
//         { month: "Mar", value: 35 },
//         { month: "Apr", value: 51 },
//         { month: "May", value: 49 },
//         { month: "Jun", value: 98 },
//         { month: "Jul", value: 69 },
//         { month: "Aug", value: 91 },
//         { month: "Sep", value: 148 },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "steplineChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "#fff",
//         color: "#000",
//         width: "100%",
//         height: 350,
//         seriesColors: ["#00E396"], // optional
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };

//Gradient Chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";
// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: "your_api_url_here",
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("Success", res);
//       },
//       onFailure: (res) => {
//         console.log("Failure", res);
//       },
//     },
//     graph: {
//       title: "Forecast",
//       xAxisValue: "date",
//       yAxisValue: "sales",
//       result: "sales",
//       data: [
//         { id: 1, date: "1/11/2000", sales: 4 },
//         { id: 2, date: "2/11/2000", sales: 3 },
//         { id: 3, date: "3/11/2000", sales: 10 },
//         { id: 4, date: "4/11/2000", sales: 9 },
//         { id: 5, date: "5/11/2000", sales: 29 },
//         { id: 6, date: "6/11/2000", sales: 19 },
//         { id: 7, date: "7/11/2000", sales: 22 },
//         { id: 8, date: "8/11/2000", sales: 9 },
//         { id: 9, date: "9/11/2000", sales: 12 },
//         { id: 10, date: "10/11/2000", sales: 7 },
//         { id: 11, date: "11/11/2000", sales: 19 },
//         { id: 12, date: "12/11/2000", sales: 5 },
//         { id: 13, date: "1/11/2001", sales: 13 },
//         { id: 14, date: "2/11/2001", sales: 9 },
//         { id: 15, date: "3/11/2001", sales: 17 },
//         { id: 16, date: "4/11/2001", sales: 2 },
//         { id: 17, date: "5/11/2001", sales: 7 },
//         { id: 18, date: "6/11/2001", sales: 5 },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "gradientForecastChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "auto",
//         barColor: "#FDD835",
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// Dashed Line chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: "your_api_url_here",
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("Success", res);
//       },
//       onFailure: (res) => {
//         console.log("Failure", res);
//       },
//     },
//     graph: {
//       title: "Page Statistics",
//       xAxisValue: "date",
//       yAxisValue: "value",
//       data: [
//         {
//           category: "Session Duration",
//           values: [
//             { date: "01 Jan", value: 45 },
//             { date: "02 Jan", value: 52 },
//             { date: "03 Jan", value: 38 },
//             { date: "04 Jan", value: 24 },
//             { date: "05 Jan", value: 33 },
//             { date: "06 Jan", value: 26 },
//             { date: "07 Jan", value: 21 },
//             { date: "08 Jan", value: 20 },
//             { date: "09 Jan", value: 6 },
//             { date: "10 Jan", value: 8 },
//             { date: "11 Jan", value: 15 },
//             { date: "12 Jan", value: 10 },
//           ],
//         },
//         {
//           category: "Page Views",
//           values: [
//             { date: "01 Jan", value: 35 },
//             { date: "02 Jan", value: 41 },
//             { date: "03 Jan", value: 62 },
//             { date: "04 Jan", value: 42 },
//             { date: "05 Jan", value: 13 },
//             { date: "06 Jan", value: 18 },
//             { date: "07 Jan", value: 29 },
//             { date: "08 Jan", value: 37 },
//             { date: "09 Jan", value: 36 },
//             { date: "10 Jan", value: 51 },
//             { date: "11 Jan", value: 32 },
//             { date: "12 Jan", value: 35 },
//           ],
//         },
//         {
//           category: "Total Visits",
//           values: [
//             { date: "01 Jan", value: 87 },
//             { date: "02 Jan", value: 57 },
//             { date: "03 Jan", value: 74 },
//             { date: "04 Jan", value: 99 },
//             { date: "05 Jan", value: 75 },
//             { date: "06 Jan", value: 38 },
//             { date: "07 Jan", value: 62 },
//             { date: "08 Jan", value: 47 },
//             { date: "09 Jan", value: 82 },
//             { date: "10 Jan", value: 56 },
//             { date: "11 Jan", value: 45 },
//             { date: "12 Jan", value: 47 },
//           ],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "dashedLineChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "white",
//         color: "black",
//         width: "100%",
//         height: "auto",
//         seriesColors: ["#008FFB", "#00E396", "#FEB019"], 
//         strokeStyles: {
//           width: [5, 7, 5],
//           dashArray: [0, 8, 5],
//         },
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };

//Spline chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";
// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Spline Chart",
//       xAxisValue: "datetime", 
//       yAxisValue: "value",
//       data: [
//         {
//           category: "series1",
//           values: [
//             { datetime: "2018-09-19T00:00:00.000Z", value: 31 },
//             { datetime: "2018-09-19T01:30:00.000Z", value: 40 },
//             { datetime: "2018-09-19T02:30:00.000Z", value: 28 },
//             { datetime: "2018-09-19T03:30:00.000Z", value: 51 },
//             { datetime: "2018-09-19T04:30:00.000Z", value: 42 },
//             { datetime: "2018-09-19T05:30:00.000Z", value: 109 },
//             { datetime: "2018-09-19T06:30:00.000Z", value: 100 },
//           ],
//         },
//         {
//           category: "series2",
//           values: [
//             { datetime: "2018-09-19T00:00:00.000Z", value: 11 },
//             { datetime: "2018-09-19T01:30:00.000Z", value: 32 },
//             { datetime: "2018-09-19T02:30:00.000Z", value: 45 },
//             { datetime: "2018-09-19T03:30:00.000Z", value: 32 },
//             { datetime: "2018-09-19T04:30:00.000Z", value: 34 },
//             { datetime: "2018-09-19T05:30:00.000Z", value: 52 },
//             { datetime: "2018-09-19T06:30:00.000Z", value: 41 },
//           ],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "splineChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         strokeCurve: "smooth",
//         backgroundColor: "#ffffff",
//         color: "#000000",
//         seriesColors: ["#00BFFF", "#FF69B4"], 
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



//Negative spline chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Area with Negative Values",
//       xAxisValue: "x",
//       yAxisValue: "y",
//       data: [
//         {
//           category: "north",
//           values: [
//             { x: 1996, y: 322 },
//             { x: 1997, y: 324 },
//             { x: 1998, y: 329 },
//             { x: 1999, y: 342 },
//             { x: 2000, y: 348 },
//             { x: 2001, y: 334 },
//             { x: 2002, y: 325 },
//             { x: 2003, y: 316 },
//             { x: 2004, y: 318 },
//             { x: 2005, y: 330 },
//             { x: 2006, y: 355 },
//             { x: 2007, y: 366 },
//             { x: 2008, y: 337 },
//             { x: 2009, y: 352 },
//             { x: 2010, y: 377 },
//             { x: 2011, y: 383 },
//             { x: 2012, y: 344 },
//             { x: 2013, y: 366 },
//             { x: 2014, y: 389 },
//             { x: 2015, y: 334 },
//           ],
//         },
//         {
//           category: "south",
//           values: [
//             { x: 1996, y: 162 },
//             { x: 1997, y: 90 },
//             { x: 1998, y: 50 },
//             { x: 1999, y: 77 },
//             { x: 2000, y: 35 },
//             { x: 2001, y: -45 },
//             { x: 2002, y: -88 },
//             { x: 2003, y: -120 },
//             { x: 2004, y: -156 },
//             { x: 2005, y: -123 },
//             { x: 2006, y: -88 },
//             { x: 2007, y: -66 },
//             { x: 2008, y: -45 },
//             { x: 2009, y: -29 },
//             { x: 2010, y: -45 },
//             { x: 2011, y: -88 },
//             { x: 2012, y: -132 },
//             { x: 2013, y: -146 },
//             { x: 2014, y: -169 },
//             { x: 2015, y: -184 },
//           ],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "negativeAreaChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         type: "area",
//         curve: "straight",
//         opacity: 0.5,
//         tooltipFormat: "yyyy",
//         tickAmount: 4,
//         titleFontSize: "14px",
//         seriesColors: ["#008FFB", "#FF4560"], 
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };




// Basic column Chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";
// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Monthly Financial Overview",
//       xAxisValue: "month",
//       yAxisValue: "value",
//       data: [
//         {
//           category: "Net Profit",
//           values: [
//             { month: "Feb", value: 44 },
//             { month: "Mar", value: 55 },
//             { month: "Apr", value: 57 },
//             { month: "May", value: 56 },
//             { month: "Jun", value: 61 },
//             { month: "Jul", value: 58 },
//             { month: "Aug", value: 63 },
//             { month: "Sep", value: 60 },
//             { month: "Oct", value: 66 },
//           ],
//         },
//         {
//           category: "Revenue",
//           values: [
//             { month: "Feb", value: 76 },
//             { month: "Mar", value: 85 },
//             { month: "Apr", value: 101 },
//             { month: "May", value: 98 },
//             { month: "Jun", value: 87 },
//             { month: "Jul", value: 105 },
//             { month: "Aug", value: 91 },
//             { month: "Sep", value: 114 },
//             { month: "Oct", value: 94 },
//           ],
//         },
//         {
//           category: "Free Cash Flow",
//           values: [
//             { month: "Feb", value: 35 },
//             { month: "Mar", value: 41 },
//             { month: "Apr", value: 36 },
//             { month: "May", value: 26 },
//             { month: "Jun", value: 45 },
//             { month: "Jul", value: 48 },
//             { month: "Aug", value: 52 },
//             { month: "Sep", value: 53 },
//             { month: "Oct", value: 41 },
//           ],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "basicColumnChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         title: "Monthly Financial Overview",
//         height: 400,
//         backgroundColor: "#ffffff",
//         color: "#000000",
//         barShape: "rounded", // or 'flat'
//         dataLabels: true,    // true to show, false to hide
//         seriesColors: ["#008FFB", "#00E396", "#FEB019"], // match series order
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



//Stacked column 100
// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Stacked Columns 100",
//       xAxisValue: "quarter",
//       yAxisValue: "value",
//       data: [
//         {
//           category: "PRODUCT A",
//           values: [
//             { quarter: "2011 Q1", value: 44 },
//             { quarter: "2011 Q2", value: 55 },
//             { quarter: "2011 Q3", value: 41 },
//             { quarter: "2011 Q4", value: 67 },
//             { quarter: "2012 Q1", value: 22 },
//             { quarter: "2012 Q2", value: 43 },
//             { quarter: "2012 Q3", value: 21 },
//             { quarter: "2012 Q4", value: 49 },
//           ],
//         },
//         {
//           category: "PRODUCT B",
//           values: [
//             { quarter: "2011 Q1", value: 13 },
//             { quarter: "2011 Q2", value: 23 },
//             { quarter: "2011 Q3", value: 20 },
//             { quarter: "2011 Q4", value: 8 },
//             { quarter: "2012 Q1", value: 13 },
//             { quarter: "2012 Q2", value: 27 },
//             { quarter: "2012 Q3", value: 33 },
//             { quarter: "2012 Q4", value: 12 },
//           ],
//         },
//         {
//           category: "PRODUCT C",
//           values: [
//             { quarter: "2011 Q1", value: 11 },
//             { quarter: "2011 Q2", value: 17 },
//             { quarter: "2011 Q3", value: 15 },
//             { quarter: "2011 Q4", value: 15 },
//             { quarter: "2012 Q1", value: 21 },
//             { quarter: "2012 Q2", value: 14 },
//             { quarter: "2012 Q3", value: 15 },
//             { quarter: "2012 Q4", value: 13 },
//           ],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "stackedColumns100", // You can use this key to switch chart types
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 400,
//         backgroundColor: "#ffffff",
//         color: "#000000",
//         barShape: "rounded", // or 'flat'
//         dataLabels: true,
//         seriesColors: ["#008FFB", "#00E396", "#FEB019"],
//         legendPosition: "right", // can be 'bottom' for mobile
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// column with data label

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Monthly Inflation in Argentina, 2002",
//       xAxisValue: "month",
//       yAxisValue: "percentage",
//       data: [
//         {
//           category: "Inflation",
//           values: [
//             { month: "Jan", percentage: 2.3 },
//             { month: "Feb", percentage: 3.1 },
//             { month: "Mar", percentage: 4.0 },
//             { month: "Apr", percentage: 10.1 },
//             { month: "May", percentage: 4.0 },
//             { month: "Jun", percentage: 3.6 },
//             { month: "Jul", percentage: 3.2 },
//             { month: "Aug", percentage: 2.3 },
//             { month: "Sep", percentage: 1.4 },
//             { month: "Oct", percentage: 0.8 },
//             { month: "Nov", percentage: 0.5 },
//             { month: "Dec", percentage: 0.2 },
//           ],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "columnWithDataLabels",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         barShape: "rounded",
//         dataLabels: true,
//         seriesColors: ["blue"],
//         legendPosition: "none",
//         titleStyle: {
//           color: "#444",
//         },
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// Stacked chart
// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Stacked Columns",
//       xAxisValue: "date",
//       yAxisValue: "value",
//       data: [
//         {
//           category: "PRODUCT A",
//           values: [
//             { date: "Jan", value: 44 },
//             { date: "Feb", value: 55 },
//             { date: "Mar", value: 41 },
//             { date: "Apr", value: 67 },
//             { date: "May", value: 22 },
//             { date: "Jun", value: 43 },
//           ],
//         },
//         {
//           category: "PRODUCT B",
//           values: [
//             { date: "Jan", value: 13 },
//             { date: "Feb", value: 23 },
//             { date: "Mar", value: 20 },
//             { date: "Apr", value: 8 },
//             { date: "May", value: 13 },
//             { date: "Jun", value: 27 },
//           ],
//         },
//         {
//           category: "PRODUCT C",
//           values: [
//             { date: "Jan", value: 11 },
//             { date: "Feb", value: 17 },
//             { date: "Mar", value: 15 },
//             { date: "Apr", value: 15 },
//             { date: "May", value: 21 },
//             { date: "Jun", value: 14 },
//           ],
//         },
//         {
//           category: "PRODUCT D",
//           values: [
//             { date: "Jan", value: 21 },
//             { date: "Feb", value: 7 },
//             { date: "Mar", value: 25 },
//             { date: "Apr", value: 13 },
//             { date: "May", value: 22 },
//             { date: "Jun", value: 8 },
//           ],
//         },
//       ],
//     },
//   },
// };
// const Config = {
//   viewModes: {
//     presentation: "stackedColumnChart", // use this to switch chart types
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };
// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         backgroundColor: "#ffffff",
//         color: "#000000",
//         barShape: "rounded",
//         dataLabels: true,
//         seriesColors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
//         legendPosition: "right",
//         borderRadius: 10,
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


//Grouped Bar

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Grouped",
//       xAxisCategories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
//       data: [
//         {
//           name: "Series A",
//           values: [44, 55, 41, 64, 22, 43, 21],
//         },
//         {
//           name: "Series B",
//           values: [53, 32, 33, 52, 13, 44, 32],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "groupedBarChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 430,
//         barOrientation: "horizontal",
//         dataLabelPosition: "inside",
//         dataLabelColor: "#000", // 🟢 Set label text color to black
//         fontSize: "14px",
//         strokeColor: "#fff",
//         seriesColors: ["#8884d8", "#82ca9d"], // Color for Series A and B
//       },
//     ],
//   },
// };



// export { Data, Config, Appearance };




// Stacked bar 100

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Stacked Bar Chart",
//       xAxisCategories: ["2008", "2009", "2010", "2011", "2012", "2013", "2014"],
//       data: [
//         {
//           name: "Marine Sprite",
//           values: [44, 55, 41, 37, 22, 43, 21],
//         },
//         {
//           name: "Striking Calf",
//           values: [53, 32, 33, 52, 13, 43, 32],
//         },
//         {
//           name: "Tank Picture",
//           values: [12, 17, 11, 9, 15, 11, 20],
//         },
//         {
//           name: "Bucket Slope",
//           values: [9, 7, 5, 8, 6, 9, 4],
//         },
//         {
//           name: "Reborn Kid",
//           values: [25, 12, 19, 32, 25, 24, 10],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "stackedBarChart100",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 430,
//         barOrientation: "horizontal",
//         dataLabelPosition: "inside",
//         dataLabelColor: "#000",
//         fontSize: "12px",
//         strokeColor: "#fff",
//         seriesColors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



// Stacked bar

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Fiction Books Sales",
//       xAxisCategories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
//       data: [
//         {
//           name: "Marine Sprite",
//           values: [44, 55, 41, 37, 22, 43, 21],
//         },
//         {
//           name: "Striking Calf",
//           values: [53, 32, 33, 52, 13, 43, 32],
//         },
//         {
//           name: "Tank Picture",
//           values: [12, 17, 11, 9, 15, 11, 20],
//         },
//         {
//           name: "Bucket Slope",
//           values: [9, 7, 5, 8, 6, 9, 4],
//         },
//         {
//           name: "Reborn Kid",
//           values: [25, 12, 19, 32, 25, 24, 10],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "stackedBarChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         stacked: true,
//         barOrientation: "horizontal",
//         strokeColor: "#fff",
//         showTotalLabels: true,
//         fontSize: "13px",
//         fontWeight: 900,
//         seriesColors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



// Line column chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";


// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Traffic Sources",
//       labels: [
//         "01 Jan 2001", "02 Jan 2001", "03 Jan 2001", "04 Jan 2001",
//         "05 Jan 2001", "06 Jan 2001", "07 Jan 2001", "08 Jan 2001",
//         "09 Jan 2001", "10 Jan 2001", "11 Jan 2001", "12 Jan 2001",
//       ],
//       data: [
//         {
//           name: "Website Blog",
//           type: "column",
//           values: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
//         },
//         {
//           name: "Social Media",
//           type: "line",
//           values: [23, 82, 95, 27, 43, 22, 67, 77, 22, 42, 12, 81],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "lineColumnChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         dataLabelSeries: [1],
//         strokeWidths: [0, 4],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// line area chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";


// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Line Area",
//       labels: [
//         "Dec 01", "Dec 02", "Dec 03", "Dec 04", "Dec 05", "Dec 06",
//         "Dec 07", "Dec 08", "Dec 09", "Dec 10", "Dec 11"
//       ],
//       data: [
//         {
//           name: "TEAM A",
//           type: "area",
//           values: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
//         },
//         {
//           name: "TEAM B",
//           type: "line",
//           values: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
//         }        
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "lineAreaChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         fillOpacity: [0.35, 1],
//         curve: "smooth",
//         tooltipSuffix: " points",
        
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// LINE COLUMN AREA

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";


// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Line Column Area",
//       labels: [
//         "01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003",
//         "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003", "11/01/2003",
//       ],
//       data: [
//         {
//           name: "TEAM A",
//           type: "column",
//           values: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//         },
//         {
//           name: "TEAM B",
//           type: "area",
//           values: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//         },
//         {
//           name: "TEAM C",
//           type: "line",
//           values: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "lineColumnAreaChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         strokeWidths: [0, 2, 5],
//         fillOpacities: [0.85, 0.25, 1],
//         seriesColors: ["#008FFB", "#00E396", "#eb0404d4"],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



//MUltiple Y AXis

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Multiple Y Axis",
//       labels: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
//       yAxisTitles: [
//         "Income (thousand crores)",
//         "Operating Cashflow (thousand crores)",
//         "Revenue (thousand crores)",
//       ],
//       data: [
//         {
//           name: "Income",
//           type: "column",
//           values: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
//         },
//         {
//           name: "Cashflow",
//           type: "column",
//           values: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
//         },
//         {
//           name: "Revenue",
//           type: "line",
//           values: [20, 29, 37, 36, 44, 45, 50, 58],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "multipleYAxisChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         strokeWidths: [1, 1, 4],
//         seriesColors: ["#008FFB", "#00E396", "#FEB019"],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



//MONOCHROME CAHRT

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Monochrome",
//       labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"], // x-axis
//       yAxisTitle: "Values", // y-axis
//       data: [
//         {
//           name: "Roses",
//           type: "polarArea",
//           values: [42, 47, 52, 58, 65],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "monochromePieChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         fillOpacity: 1,
//         strokeWidth: 1,
//         legendPosition: "bottom",
//         themeMonochrome: {
//           enabled: true,
//           shadeTo: "light",
//           shadeIntensity: 0.6,
//         },
//         responsiveBreakpoints: [
//           {
//             breakpoint: 480,
//             width: 200,
//           },
//         ],
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// RADAR MULTIPLE SERIES

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Radar Multiple Series",
//       labels: ["2011", "2012", "2013", "2014", "2015", "2016"], // x-axis
//       yAxisTitle: "Values", // y-axis
//       data: [
//         {
//           name: "Series 1",
//           type: "radar",
//           values: [80, 50, 30, 40, 100, 20],
//         },
//         {
//           name: "Series 2",
//           type: "radar",
//           values: [20, 30, 40, 80, 20, 80],
//         },
//         {
//           name: "Series 3",
//           type: "radar",
//           values: [44, 76, 78, 13, 43, 10],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "radarMultipleSeries",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         dropShadow: {
//           enabled: true,
//           blur: 1,
//           left: 1,
//           top: 1,
//         },
//         strokeWidth: 2,
//         fillOpacity: 0.1,
//         markerSize: 0,
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


//RADAR WITH POLYGON

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Radar with Polygon Fill",
//       labels: [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//       ], // x-axis
//       yAxisTitle: "Values", // y-axis
//       data: [
//         {
//           name: "Series 1",
//           type: "radar",
//           values: [20, 100, 40, 30, 50, 80, 33],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "radarPolygonFill",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         strokeWidth: 2,
//         fillOpacity: 0.3,
//         color: "#FF4560",
//         marker: {
//           size: 4,
//           strokeColor: "#FF4560",
//           fillColor: "#fff",
//           strokeWidth: 2,
//         },
       
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


//BASIC RADIAL BAR CHART

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Basic Radial Bar Chart",
//       labels: ["Cricket"],
//       yAxisTitle: "Percentage",
//       data: [
//         {
//           name: "Cricket",
//           type: "radialBar",
//           values: [70],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "basicRadialBarChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         innerRadius: "70%",
//         fillColor: "#00E396",
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



// Custom angle chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";


// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Custom Angle Circle",
//       labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
//       yAxisTitle: "Users",
//       data: [
//         {
//           name: "Social Media",
//           type: "radialBar",
//           values: [76, 67, 61, 90],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "customAngleCircle",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 350,
//         startAngle: 0,
//         endAngle: -270,
//         hollowSize: "50%",
//         fillColor: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
//         showLegend: true,
//         legendPosition: "left",
//         fontSize: "12px",
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// pattern  donut chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Favourite Movie Type",
//       labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
//       yAxisTitle: "Genres",
//       data: [
//         {
//           name: "Movie Preferences",
//           type: "donut",
//           values: [44, 55, 41, 17, 15],
//         },
//       ],
//       plotOptions: {
//         donutLabels: {
//           show: true,
//           showTotalAlways: true,
//         },
//       },
//       dataLabels: {
//         dropShadow: {
//           blur: 3,
//           opacity: 0.8,
//         },
//       },
//       dropShadow: {
//         enabled: true,
//         color: "#111",
//         top: -1,
//         left: 3,
//         blur: 3,
//         opacity: 0.2,
//       },
//       stroke: {
//         width: 0,
//       },
//       fill: {
//         type: "pattern",
//         opacity: 1,
//         pattern: {
//           enabled: true,
//           style: [
//             "verticalLines",
//             "squares",
//             "horizontalLines",
//             "circles",
//             "slantedLines",
//           ],
//         },
//       },
//       states: {
//         hover: {
//           filter: "none",
//         },
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               position: "bottom",
//             },
//           },
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "patternedDonutChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 380,
//         themePalette: "palette2",
//         fontSize: "14px",
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



// Vertical line chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";


// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Vertical Line Chart",
//       xAxisTitle: "Value",
//       yAxisTitle: "Category",
//       labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
//       data: [
//         {
//           name: "pv",
//           type: "line",
//           values: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
//         },
//         {
//           name: "uv",
//           type: "line",
//           values: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "verticalLineChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         fontSize: "14px",
//         strokeColors: ["#8884d8", "#82ca9d"],
//         height: 300,
//         aspect: 2.0 / 0.9,
       
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



//stacked area chart


// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Stacked Area Chart",
//       labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
//       xAxisKey: "name",
//       data: [
//         {
//           name: "uv",
//           type: "area",
//           values: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
//         },
//         {
//           name: "pv",
//           type: "area",
//           values: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
//         },
//         {
//           name: "amt",
//           type: "area",
//           values: [2400, 2210, 2290, 2000, 2181, 2500, 2100],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "stackedAreaChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         fontSize: "14px",
//         height: 400,
//         aspect: 2.0 / 0.9,
//         strokeColors: ["#8884d8", "#82ca9d", "#ffc658"],
//         fillColors: ["#8884d8", "#82ca9d", "#ffc658"],
      
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// line bar area composed chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//  features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Line Bar Area Composed Chart",
//       labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F"],
//       xAxisKey: "name",
//       data: [
//         {
//           name: "uv",
//           type: "line",
//           values: [590, 868, 1397, 1480, 1520, 1400],
//         },
//         {
//           name: "pv",
//           type: "bar",
//           values: [800, 967, 1098, 1200, 1108, 680],
//         },
//         {
//           name: "amt",
//           type: "area",
//           values: [1400, 1506, 989, 1228, 1100, 1700],
//         },
//         {
//           name: "cnt",
//           type: "scatter",
//           values: [490, 590, 350, 480, 460, 380],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "lineBarAreaComposedChart",
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 400,
//         aspect: 2.0 / 0.9,
//         fontSize: "14px",
//         barSize: 20,
//         strokeColors: {
//           uv: "#ff7300",
//           pv: "#413ea0",
//           amt: "#8884d8",
//           cnt: "red",
//         },
//         fillColors: {
//           amt: "#8884d8",
//           pv: "#413ea0",
//         },
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };



//same data composed chart


// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";

// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data+constants.version,
//       metaData:true,
//       onSuccess: (res) => {
//         console.log("on Succes ", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "Same Data Composed Chart",
//       labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F"],
//       xAxisKey: "name",
//       data: [
//         {
//           name: "uv",
//           type: "bar",
//           values: [590, 868, 1397, 1480, 1520, 1400],
//         },
//         {
//           name: "uv",
//           type: "line",
//           values: [590, 868, 1397, 1480, 1520, 1400],
//         },
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "sameDataComposedChart",
//   },
//   features: {
//     graph: true,
//     fetchData: false,
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         height: 400,
//         aspect: 2.0 / 0.9,
//         barSize: 20,
//         fontSize: "14px",
//         strokeColors: {
//           uv: "#ff7300", // line
//         },
//         fillColors: {
//           uv: "#0600c1ff", // bar
//         },
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };


// Map chart

// import constants from "../../Common/Constants";
// // import fetchData from "../../Common/Store/Sagas/SagaHelper";



// const Data = {
//   features: {
//     servercommunication: {
//       requestType: "GET",
//       apiUrl: constants.get_graph_data + constants.version,
//       metaData: true,
//       onSuccess: (res) => {
//         console.log("on Success", res);
//       },
//       onFailure: (res) => {
//         console.log("on failure", res);
//       },
//     },
//     graph: {
//       title: "World Map Sample",
//       xAxisValue: "name",
//       yAxisValue: "value",
//       result: "value",
//       data: [
//         { id: 1, name: "Pakistan", coordinates: [33.6844, 73.0551], value: 500 },
//         { id: 2, name: "United States", coordinates: [40.7128, -74.0060], value: 300 },
//         { id: 3, name: "Japan", coordinates: [35.6895, 139.6917], value: 800 },
//         { id: 4, name: "United Kingdom", coordinates: [51.5072, -0.1276], value: 650 },
//         { id: 5, name: "Australia", coordinates: [-33.8688, 151.2093], value: 450 }
//       ],
//     },
//   },
// };

// const Config = {
//   viewModes: {
//     presentation: "mapChart", 
//   },
//   features: {
//     fetchData: false,
//     graph: true,
//     showLabels: true,
//     markerSize: 6,
//     projection: "geoMercator",
//   },
// };

// const Appearance = {
//   features: {
//     graph: [
//       {
//         backgroundColor: "#e6f2ff",
//         defaultFill: "#EAEAEC",
//         hoverFill: "#F53",
//         markerColor: "#FF5722",
//         labelColor: "#333",
//         height: 500,
//       },
//     ],
//   },
// };

// export { Data, Config, Appearance };
