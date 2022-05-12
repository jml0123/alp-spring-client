import React from "react";
import Typography from "@material-ui/core/Typography";
import "./PointsCircle.css";

export default function PointsCircle(props) {
  return (
    <div className="circle-pts-wrapper">
      <Typography variant="h1">{props.pointsVal}</Typography>
      <Typography>Points</Typography>
    </div>
  );
}
