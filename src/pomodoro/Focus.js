import React from "react";

function Focus({ focusDuration, setFocusDuration, disableButton }) {
  function helper(num) {
    if (num < 10) {
      return "0";
    }
    return "";
  }

  function handleIncreaseFocus() {
    if (focusDuration >= 60) return;
    const newValue = focusDuration + 5;
    setFocusDuration(newValue);
  }

  function handleDecreaseFocus() {
    if (focusDuration <= 5) return;
    const newValue = focusDuration - 5;
    setFocusDuration(newValue);
  }

  return (
    <div className = "input-group input-group-lg mb-2">
      <span className = "input-group-text">
        {`Focus: ${helper(focusDuration)}${focusDuration}:00`}
      </span>
      <div className = "input-group-append">
        <button
          className = "btn btn-secondary"
          onClick = {handleDecreaseFocus}
          disabled = {disableButton}
        >
          <span className = "oi oi-minus" />
        </button>
        <button
          className = "btn btn-secondary"
          onClick = {handleIncreaseFocus}
          disabled = {disableButton}
        >
          <span className = "oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default Focus;
