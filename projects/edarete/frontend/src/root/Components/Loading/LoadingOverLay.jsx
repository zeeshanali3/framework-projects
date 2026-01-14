import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateLoading } from "../../Common/Store/Actions/General/UpdateActions/updateLoading";

const LoadingOverlay = ({ isLoading, text = "Loading..." }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        dispatch(updateLoading(false));
      }, 5000);

      return () => clearTimeout(timer); // Cleanup in case the component unmounts early
    }
  }, [isLoading, dispatch]);
  if (!isLoading) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.spinnerContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>{text}</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position:"fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Dimmed background
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    textAlign: "center",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(255, 255, 255, 0.2)",
    borderTop: "5px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "15px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "500",
  },
};

// Adding CSS for spinner animation
const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject keyframes into the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinnerKeyframes, styleSheet.cssRules.length);

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

export default LoadingOverlay;
