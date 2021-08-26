import React from "react";

function Break({ breakDuration, setBreakDuration, disableButton }) {
  function helper(num) {
    if (num < 10) {
      return "0";
    }
    return "";
  }

  function handleIncreaseBreak() {
    if (breakDuration >= 15) return;
    const newValue = breakDuration + 1;
    setBreakDuration(newValue);
  }

  function handleDecreaseBreak() {
    if (breakDuration <= 1) return;
    const newValue = breakDuration - 1;
    setBreakDuration(newValue);
  }

  return (
    <div className = "float-right">
      <div className = "input-group input-group-lg mb-2">
        <span className = "input-group-text">
          {`Break: ${helper(breakDuration)}${breakDuration}:00`}
        </span>
        <div className = "input-group-append">
          <button
            className = "btn btn-secondary"
            onClick = {() => {
              handleDecreaseBreak();
            }}
            disabled = {disableButton}
          >
            <span className = "oi oi-minus" />
          </button>
          <button
            className = "btn btn-secondary"
            onClick = {() => {
              handleIncreaseBreak();
            }}
            disabled = {disableButton}
          >
            <span className = "oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Break;
