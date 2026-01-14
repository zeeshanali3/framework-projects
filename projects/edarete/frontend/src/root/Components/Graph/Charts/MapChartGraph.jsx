import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const MapChart = ({ data, config, appearance }) => {
  const [activeMarker, setActiveMarker] = useState(null);

  if (!data?.features?.graph?.data || !config?.features || !appearance?.features?.graph) {
    return (
      <div
        style={{
          padding: 20,
          textAlign: "center",
          color: "#ff0000",
          background: "#fff3f3",
          borderRadius: 6,
        }}
      >
        Map cannot be displayed. Missing required props: <strong>data, config, or appearance</strong>.
      </div>
    );
  }

  const markers = data.features.graph.data;
  const showLabels = config.features.showLabels;
  const defaultCenter = { lat: 20, lng: 0 };
  const defaultZoom = 2;
  const graphAppearance = appearance.features.graph[0];

  const MapMarker = ({ id, name, value, lat, lng }) => {
    const isActive = activeMarker === id;
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveMarker(id === activeMarker ? null : id);
        }}
        style={{
          position: "relative",
          color: "#fff",
          background: graphAppearance.markerColor || "#FF5722",
          padding: `${config.features.markerSize || 6}px`,
          borderRadius: "50%",
          textAlign: "center",
          fontSize: 12,
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          userSelect: "none",
        }}
        title={`${name} (${value})`}
      >
        ●
        {isActive && (
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.7)",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: 4,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            <strong>{name}</strong>
            <br />
            Value: {value}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        onClick={() => setActiveMarker(null)}
        style={{
          height: graphAppearance.height || 500,
          width: "100%",
          backgroundColor: graphAppearance.backgroundColor || "#fff",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCrrJL03Amz53MYXuGgNwLP3-RL8EaA2I8" }}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
        >
          {markers.map(({ id, name, coordinates, value }) => (
            <MapMarker
              key={id}
              id={id}
              lat={coordinates[0]}
              lng={coordinates[1]}
              name={name}
              value={value}
            />
          ))}
        </GoogleMapReact>
      </div>

      {showLabels && (
        <div
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
            color: graphAppearance.labelColor || "#333",
            fontSize: 12,
          }}
        >
          {markers.map(({ id, name, value }) => (
            <div key={id} title={`${name}: ${value}`}>
              {name} ({value})
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MapChart;
