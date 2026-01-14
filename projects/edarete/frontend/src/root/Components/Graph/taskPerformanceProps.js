 import constants from "../../Common/Constants";

// import fetchData from "../../Common/Store/Sagas/SagaHelper";

const Data = {
  features: {
    servercommunication: {
      requestType: "GET",
      apiUrl: constants.get_task_performance_graph_data+constants.version,
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
      xAxisValue: "status",
      yAxisValue: "count",
      result: "count",
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
  },
  features: {
    fetchData: true,
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
        height: "350px",
        barColor: "",
      },
    ],
  },
};




 export { Data, Config, Appearance };