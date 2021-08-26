import React from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration/index";
function Session({ session, focusDuration, breakDuration, isTimerRunning }) {
  if (session === null) {
    return null;
  }
  const currentTimer =
    session.label === "Focusing" ? focusDuration : breakDuration;
  const percent =
    ((currentTimer * 60 - session.timeRemaining) / (currentTimer * 60)) * 100;

  function nullSession() {
    if (session.label === "Focusing") {
      return `Focusing ${minutesToDuration(focusDuration)} minutes`;
    } else {
      return `On Break for ${minutesToDuration(breakDuration)} minutes`;
    }
  }

  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <h2>{nullSession()}</h2>
          <p className="lead">{secondsToDuration(session.timeRemaining)}</p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={percent}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session;
