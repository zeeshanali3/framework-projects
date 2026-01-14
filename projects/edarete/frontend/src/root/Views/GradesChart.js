// Import necessary libraries
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

// Data for the grades chart
const gradesData = [
  { name: 'Semester1', A: 10, B: 20, C: 5 },
  { name: 'Semester2', A: 15, B: 18, C: 7 },
  { name: 'Semester3', A: 12, B: 22, C: 8 },
  { name: 'Semester4', A: 14, B: 25, C: 10 },
  { name: 'Semester5', A: 18, B: 20, C: 6 },
  { name: 'Semester6', A: 20, B: 18, C: 5 },
  { name: 'Semester7', A: 17, B: 19, C: 8 },
  { name: 'Semester8', A: 19, B: 21, C: 7 }
];

// Grades Chart component
const GradesBarChart = () => {
  return (
    <>
      <h1 className='pl-3 pt-3 text-lg text-black'>Student Grades Per Semester</h1>
      <BarChart
        width={800}
        height={400}
        data={gradesData}
        layout="vertical"
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" padding={{ left: 10, right: 10 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="A" fill="#82ca9d" name="A+" />
        <Bar dataKey="B" fill="#8884d8" name="B+" />
        <Bar dataKey="C" fill="#ffc658" name="C+" />
      </BarChart>
    </>
  );
};

// Export the component
export default GradesBarChart;
