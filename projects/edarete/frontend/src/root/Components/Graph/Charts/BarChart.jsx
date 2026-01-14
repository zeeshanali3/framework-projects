import React from "react";
import { Box, Alert } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartGraph = ({ data, config, appearance, graphData }) => {
  // If any prop is missing, don't render
  if (!data || !config || !appearance) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="error">
          Graph cannot render. Required props are missing.
        </Alert>
      </Box>
    );
  }

  const selectedClass = graphData?.class;
  const allClasses = data?.features?.graph?.data || [];

  let chartData = [];

  const classEntry = allClasses.find((cls) => cls.className === selectedClass);

  if (classEntry?.activities?.length) {
    chartData = classEntry.activities.map((act) => ({
      name: act.name,
      completed: act.completedCount,
      uncompleted: act.uncompletedCount,
    }));
  } else {
    chartData = allClasses.map((entry, index) => {
      const name = entry.name || `ID ${entry.id || index + 1}`;
      if (entry.completed !== undefined && entry.uncompleted !== undefined) {
        return {
          name,
          completed: entry.completed,
          uncompleted: entry.uncompleted,
        };
      } else {
        return {
          name,
          value: entry.answer ?? entry.value ?? 0,
        };
      }
    });
  }

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  const barKeys = Object.keys(chartData[0] || {}).filter(
    (key) => key !== "name" && key !== "id"
  );

  const barColors =
    barKeys.length === 1
      ? ["#3b82f6"]
      : ["#10b981", "#ef4444", "#6366f1", "#f97316"]; // green/red/purple/orange

  const layoutFromConfig = config?.viewModes?.layout;
  const layout =
    layoutFromConfig || (barKeys.length === 1 ? "horizontal" : "vertical");

  return (
    <Box
      sx={{
        padding: "25px",
        mb: "15px",
        minHeight: "350px",
        backgroundColor: appearance?.features?.graph[0]?.backgroundColor || "white",
        color: appearance?.features?.graph[0]?.color || "black",
        width: appearance?.features?.graph[0]?.width || "100%",
        height: appearance?.features?.graph[0]?.height || "auto",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout={layout} barCategoryGap={20} barGap={4} margin={{ top: 20, right: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {layout === "horizontal" ? (
            <>
              <XAxis dataKey="name" />
              <YAxis />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                label={{
                  value: "Students",
                  position: "insideTop",
                  offset: 20,
                  style: { textAnchor: "middle" },
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 13, dx: 4 }}
                label={{
                  value: "Activities",
                  angle: 90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
            </>
          )}
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
                  <p><strong>{label}</strong></p>
                  {payload.map((entry, i) => (
                    <p key={i} style={{ color: entry.color }}>
                      {entry.name}: {entry.value}
                    </p>
                  ))}
                </div>
              ) : null
            }
          />
          <Legend />
          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={barColors[index % barColors.length]}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
              barSize={28}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartGraph;
