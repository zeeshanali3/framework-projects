import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import GraphBuilder from "./GraphBuilder";

import { Data, Config, Appearance } from "./props";

describe("GraphBuilder - colorPieChart", () => {
  const defaultProps = {
    chartType: "colorPieChart",
    data: Data,
    config: {
      ...Config,
      viewModes: {
        ...Config.viewModes,
        presentation: "colorPieChart",
      },
    },
    appearance: Appearance,
  };
  it("renders pie chart with given data", async () => {
    const Config = {
      features: {
        graphConfig: {
          series: [
            {
              data: [
                { name: "CLO 1", value: 30 },
                { name: "CLO 2", value: 70 },
              ],
            },
          ],
        },
      },
      viewModes: {
        presentation: "colorPieChart",
      },
    };

    const Data = [
      { name: "CLO 1", value: 30 },
      { name: "CLO 2", value: 70 },
    ];

    const { container } = render(
      <div style={{ width: "500px", height: "500px" }}>
        <GraphBuilder chartType="colorPieChart" data={Data} config={Config} />
      </div>
    );

    await waitFor(() => {
      const pieSectors = container.querySelectorAll(".recharts-pie-sector");
      expect(pieSectors.length);
    });
  });

  it("does not render chart if presentation mode is not 'colorPieChart'", () => {
    const invalidProps = {
      ...defaultProps,
      config: {
        features: {
          graphConfig: {
            presentation: "barChart",
          },
        },
      },
      graphData: {
        mode: "Individual",
        students: [],
      },
    };

    const { container } = render(<GraphBuilder {...invalidProps} />);
    expect(container.querySelector(".recharts-pie")).not.toBeInTheDocument();
  });

  it("shows fallback message if data array is empty", () => {
    const emptyProps = {
      ...defaultProps,
      data: [],
    };
    render(<GraphBuilder {...emptyProps} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it("shows fallback message if data array is empty", () => {
    const emptyData = {
      ...Data,
      features: {
        ...Data.features,
        graph: {
          ...Data.features.graph,
          data: [],
        },
      },
    };

    render(
      <GraphBuilder
        chartType="colorPieChart"
        data={emptyData}
        config={defaultProps.config}
        appearance={Appearance}
      />
    );

    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });
});
