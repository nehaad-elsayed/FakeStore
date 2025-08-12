import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  text?: string;
  fullScreen?: boolean;
}


const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = "#3182ce",
  text = "Loading...",
  fullScreen = false,
}) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    height: fullScreen ? "100vh" : "auto",
    width: "100%",
    minHeight: fullScreen ? "100vh" : "200px",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    color: "#4a5568",
    margin: 0,
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <ClipLoader size={size} color={color} />
      {text && <p style={textStyle}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
