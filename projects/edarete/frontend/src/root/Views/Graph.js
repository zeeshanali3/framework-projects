// Import necessary libraries
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

// Data for the chart
const data = [
  { name: 'Semester1', GPA: 3.5 },
  { name: 'Semester2', GPA: 3.6 },
  { name: 'Semester3', GPA: 3.7 },
  { name: 'Semester4', GPA: 3.8 },
  { name: 'Semester5', GPA: 3.9 },
  { name: 'Semester6', GPA: 4.0 },
  { name: 'Semester7', GPA: 3.8 },
  { name: 'Semester8', GPA: 3.9 }
];

// Chart component
const GPABarChart = () => {
  return (
    <>
      <h1 className='pl-3 pt-3 text-lg text-black'>Semester GPA</h1>
      <BarChart
        width={800}
        height={400}
        data={data}
        layout="vertical"
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
        <XAxis type="number" domain={[0, 4]} />
        <YAxis dataKey="name" type="category" padding={{ left: 10, right: 10 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="GPA" fill="#8884d8" />
      </BarChart>
    </>
  );
};

// Export the component
export default GPABarChart;
