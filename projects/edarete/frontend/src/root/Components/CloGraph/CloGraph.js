import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GetCloGraphAction } from "../../Common/Store/Actions/General/GetActions/getclographAction";

export default function CloGraph({CourseId}) {
    const { getclographData } = useSelector((state) => state?.GETCLOGRAPH);
    const dispatch = useDispatch();
   
    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const token = loginData?.accessToken;

    useEffect(() => {
        if (CourseId) {
            dispatch(GetCloGraphAction(token, CourseId));
        }
    }, [dispatch, CourseId]);



    const chartData = getclographData?.payload || [];
    function calculatePercentageAbove50(data) {
        return data.map(clo => {
          const { CLOId, TotalStudentCount, StudentsAbove50Percent } = clo;
      
          // Calculate the percentage of students above 50%
          const percentageAbove50 = (TotalStudentCount > 0)
            ? (StudentsAbove50Percent / TotalStudentCount) * 100
            : 0;
      
          return {
            CLOId,
            percentageAbove50: parseFloat(percentageAbove50.toFixed(2)) // rounded to 2 decimal places
          };
        });
      }

    return (
        <div>
            <h1 className="text-black text-lg title-font font-medium mb-3 underline">Course Learning Outcomes Attainment</h1>
            
            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={calculatePercentageAbove50(chartData)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="CLONum" />
                    <YAxis  />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentageAbove50" name="Students Above 50%" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>

            {/* Table */}
            <div className="mt-5 flex justify-center" style={{ marginLeft: "30px",}}>
                <table className="table-auto border-collapse border border-green-800">
                    <thead>
                        <tr>
                            <th className="border border-green-600 px-4 py-2">CLO's'</th>
                            <th className="border border-green-600 px-4 py-2">Total Students</th>
                            <th className="border border-green-600 px-4 py-2">Number of Students Attained CLO Above 50%</th>
                            <th className="border border-green-600 px-4 py-2"> Percentage</th>

                        </tr>
                    </thead>
                    <tbody>
                        {chartData.map((data, index) => (
                            <tr key={index}>
                                <td className="border border-green-600 px-4 py-2">{data.CLONum}</td>
                                <td className="border border-green-600 px-4 py-2">{data.TotalStudentCount}</td>
                                <td className="border border-green-600 px-4 py-2">{data.StudentsAbove50Percent}</td>
                                <td className="border border-green-600 px-4 py-2">{`${parseFloat((data.StudentsAbove50Percent / data.  TotalStudentCount) * 100).toFixed(2)} %`}</td>

                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}