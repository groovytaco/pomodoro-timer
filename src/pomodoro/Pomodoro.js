import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Focus from "./Focus";
import Break from "./Break";
import Session from "./Session";
/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}
/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);
  const [stopButton, setStopButton] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1379.mp3`).play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => {
      setStopButton(false);
      setDisableButton(true);

      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  function handleStop() {
    setIsTimerRunning(false);
    setStopButton(true);
    setSession(null);
    setDisableButton(false);
  }

  return (
    <div className = "pomodoro">
      <div className = "row">
        <div className = "col">
          <Focus
            focusDuration = {focusDuration}
            setFocusDuration = {setFocusDuration}
            disableButton = {disableButton}
          />
        </div>
        <div className = "col">
          <div className = "float-right">
            <Break
              breakDuration = {breakDuration}
              setBreakDuration = {setBreakDuration}
              disableButton = {disableButton}
            />
          </div>
        </div>
      </div>
      <div className = "row">
        <div className ="col">
          <div className = "btn-group btn-group-lg mb-2" role = "group">
            <button className = "btn btn-primary" onClick = {playPause}>
              <span
                className = {classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <button
              className = "btn btn-secondary"
              disabled = {stopButton}
              onClick = {handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Session
        session={session}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
      />
    </div>
  );
}

export default Pomodoro;
