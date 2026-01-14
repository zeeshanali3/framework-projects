import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetClassAggregateAction } from "../../../Common/Store/Actions/GetActions/getclassaggregateAction";
import { useParams } from "react-router-dom";
import { isLoadingAction } from "../../../Common/Store/Actions/PostActions/isLoadingAction";

const useClassAggregateData = (id, EnrollementId) => {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = loginData?.accessToken;

  const dispatch = useDispatch();
  const [headers, setHeaders] = useState(["Student"]);
  const [subComponentTypes, setSubComponentTypes] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(isLoadingAction(true));
      dispatch(GetClassAggregateAction(token, id,
        (response) => {
          dispatch(isLoadingAction(false));
        },
        (error) => {
          dispatch(isLoadingAction(false));
        }
      ));
    }
  }, [dispatch, token, id]);

  useEffect(() => {
    if (classaggregate?.payload) {
      const subComponentSet = new Set();
      const subComponentTypeSet = new Set();

      Object.values(classaggregate.payload).forEach(marksArray => {
        marksArray.forEach(item => {
          subComponentSet.add(item.subComponentName);
          const type = item.subComponentName.split(' ')[0];
          subComponentTypeSet.add(type);
        });
      });

      setSubComponentTypes(Array.from(subComponentTypeSet));
      setHeaders(["Student", ...Array.from(subComponentSet), ...Array.from(subComponentTypeSet).map(type => `Total ${type}s`), "Overall"]);
    }
  }, [classaggregate]);

  const getComponentWeightage = (componentName) => {
    if(getclasscomponentData.length!=0)
   { const component = getclasscomponentData?.payload.find(c => c.ComponentName === componentName && c.ComponentType === 'Graded');
    return component ? component.Weightage : 0;
   }
  };

  const calculateWeightedPercentage = (obtainedMarks, totalMarks, weightage) => {
    return ((obtainedMarks / totalMarks) * weightage).toFixed(2);
  };

    const calculateTotals = (marksArray, componentPrefix) => {
      let totalObtainedMarks = 0;
      let totalTotalMarks = 0;

      marksArray.forEach(item => {
        if (item.subComponentName.startsWith(componentPrefix)) {
          totalObtainedMarks += parseFloat(item.obtainedMarks);
          totalTotalMarks += parseFloat(item.totalMarks);
        }
      });

      const weightage = getComponentWeightage(componentPrefix);
      const totalWeighted = calculateWeightedPercentage(totalObtainedMarks, totalTotalMarks, weightage);

      return {
        totalObtainedMarks,
        totalTotalMarks,
        totalWeighted
      };
    };

  const calculateData = () => {
    if (!classaggregate || classaggregate.length === 0 || !classaggregate.payload) {
      return "No data available";
    }

    const overallTotals = [];
    let myEnrollementId = null;
    let myOverall = null; 

    Object.entries(classaggregate.payload).forEach(([studentName, marksArray]) => {
      let totalOverall = 0;

      if (marksArray.length > 0) {
        subComponentTypes.forEach(type => {
          const totals = calculateTotals(marksArray, type);
          totalOverall += +totals.totalWeighted;
        });

        totalOverall = parseFloat(totalOverall.toFixed(2)); 
        if (marksArray[0].EnrollementId === EnrollementId) {
          myEnrollementId = marksArray[0].EnrollementId;
          myOverall = totalOverall;
        }

        overallTotals.push(totalOverall); 
      }
    });

    if (overallTotals.length === 0) {
      return "No data available";
    }
    const minOverall = Math.min(...overallTotals, myOverall);
    const maxOverall = Math.max(...overallTotals, myOverall);
    const filteredTotals = overallTotals.filter(total => total !== myOverall);
    const averageOverall = filteredTotals.length > 0
      ? parseFloat((filteredTotals.reduce((sum, total) => sum + total, 0) / filteredTotals.length).toFixed(2))
      : 0;

    return {
      myEnrollementId,
      myOverall,
      minOverall,
      maxOverall,
      averageOverall
    };
  };







  return calculateData();
};

export default useClassAggregateData;
