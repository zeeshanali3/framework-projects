import React, { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, colors } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetClassAggregateAction } from "../Common/Store/Actions/General/GetActions/getclassaggregateAction";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction";

const tablecellSX = {
    fontWeight: 500,
    borderBottom: "1px solid #F7FAFF",
    fontSize: "16px",
    padding: "9px 10px",
    color:"black"
};
const tableheaderSX = {
  fontWeight: 500,
  borderBottom: "1px solid #F7FAFF",
  fontSize: "16px",
  padding: "9px 10px",
};

const ClassAggregate = ({id}) => {

    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const token = loginData?.accessToken;
    const { classaggregate } = useSelector((state) => state?.CLASSAGGREGATE);
    const { getclasscomponentData } = useSelector((state) => state?.GETCLASSCOMPONENTREDUCER);
    const dispatch = useDispatch();
    const [headers, setHeaders] = useState(["Student"]);
    const [subComponentTypes, setSubComponentTypes] = useState([]);

    useEffect(() => {
          dispatch(isLoadingAction(true));
        dispatch(GetClassAggregateAction(token, id,
              (response) => {
                  dispatch(isLoadingAction(false));
              },
              (error) => {
                  dispatch(isLoadingAction(false));
              }
        ));
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

    if (!classaggregate || classaggregate.length === 0 || !classaggregate.payload) {
        return <div>No data available</div>;
    }

    const getComponentWeightage = (componentName) => {
        const component = getclasscomponentData?.payload.find(c => c.ComponentName === componentName && c.ComponentType === 'Graded');
        return component ? component.Weightage : 0;
    };

    const calculateWeightedPercentage = (obtainedMarks, totalMarks, weightage) => {
        if (totalMarks === 0) {
            return 0;
        }
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

    return (
        <div className="m-2">
            <TableContainer component={Paper} sx={{ boxShadow: "none", marginTop: '20px' }}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className="dark-table">
                    <TableHead sx={{ background: "#F7FAFF" }}>
                        <TableRow>
                            {headers.map((head, index) => (
                                <TableCell key={index} sx={tablecellSX}>
                                    <Typography variant="subtitle1">{head}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(classaggregate.payload).map(([studentName, marksArray], index) => {
                            const totals = {};
                            subComponentTypes.forEach(type => {
                             
                                totals[type] = calculateTotals(marksArray, type);
                            });

                            const totalOverall = Object.values(totals).reduce((sum, { totalWeighted }) => sum + +totalWeighted, 0).toFixed(2);

                            const chartData = subComponentTypes.map(type => (
                                {
                                name: type,
                                Marks: totals[type].totalObtainedMarks,
                                Total: totals[type].totalTotalMarks,
                            }));

                            return (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell sx={tableheaderSX}>
                                            <Typography variant="body1" fontSize={"15px"} color={"black"} fontWeight={"bold"}>{studentName}</Typography>
                                        </TableCell>
                                        {headers.slice(1, -subComponentTypes.length - 1).map((componentName, idx) => {
                                            const marksEntry = marksArray?.find(item => item.subComponentName === componentName);
                                            const obtainedMarks = marksEntry ? marksEntry.obtainedMarks : 0;
                                            const totalMarks = marksEntry ? marksEntry.totalMarks : 0;
                                            return (
                                                <TableCell key={idx} sx={tablecellSX}>
                                                    <Typography variant="body2" fontSize={"15px"}>
                                                        {`${obtainedMarks} / ${totalMarks}`}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        })}
                                        {subComponentTypes.map((type, idx) => (
                                            <TableCell key={idx} sx={tablecellSX}>
                                                <Typography variant="body2" fontSize={"15px"}>
                                                    {`${totals[type].totalObtainedMarks} / ${totals[type].totalTotalMarks}`}
                                                </Typography>
                                                <Typography variant="caption" color="green" fontSize={"15px"}>
                                                    {totals[type].totalWeighted}%
                                                </Typography>
                                            </TableCell>
                                        ))}
                                        <TableCell sx={tablecellSX}>
                                            <Typography variant="body2" fontSize={"15px"} fontWeight={"bold"}>
                                                {totalOverall}%
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={headers.length} sx={{ padding: "0 10px" }}>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <BarChart data={chartData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis/>
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="Marks" fill="#8884d8" />
                                                    <Bar dataKey="Total" fill="#82ca9d" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ClassAggregate;
