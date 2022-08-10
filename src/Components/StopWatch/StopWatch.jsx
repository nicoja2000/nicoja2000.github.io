import React, { useState } from "react";
import "./StopWatch.css";
import Timer from "../Timer/Timer.jsx";
import Dropdown from "../Dropdown/Dropdown";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [spaceDown, setGreenTrue] = useState(false);
  const [dark, makeDark] = useState(false);
  const [open, toggleModal] = useState(false);

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const changeDark = () => {
    makeDark(!dark);
  }

  const showModal = () => {
    toggleModal(!open);
  }

  document.addEventListener('keyup', event => {
    if (event.code === 'Space' && isPaused) {
      handleStart();
      setGreenTrue(true);
    }
  })

  document.addEventListener('keyup', event => {
    if(event.code !== 'Escape' && (event.code !== 'Space' || !isPaused)){
      handlePause();
    }

  })

  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      setTimeout(() => { setGreenTrue(true); }, 2000);
    }
  })

  document.addEventListener('keyup', event => {
    if (event.code === 'Escape') {
      handleReset();
      setGreenTrue(false);
    }
  })

  return (
    <div className={dark ? "stop-watchDark" : "stop-watch"}>
      <Dropdown changeDark={changeDark} showModal={showModal} />
      <Timer time={time} spaceDown={spaceDown} dark={dark} />
      <Modal isOpen={open} toggle={toggleModal}>
        <ModalHeader>
          <button onClick= {showModal} type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </ModalHeader>
        <ModalBody class="modal-body">
          <p>Hold/Release Spacebar to Start Timer</p>
          <p>Press Any Key to Stop</p>
        </ModalBody>

      </Modal>
    </div>
  );
}

export default StopWatch;