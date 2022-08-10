import React from "react";
import "./Dropdown.css";

function Dropdown(props) {

  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  return (
    <div class="dropdown">
      <button onClick={myFunction} class="dropbtn">Options</button>
      <div id="myDropdown" class="dropdown-content">
        <a onClick={() => {
          props.changeDark();
          myFunction();
        }}
        >Dark Mode</a>
        <a
          onClick={() => {
            props.showModal();
            myFunction();
          }}
        >How To</a>
      </div>
    </div>
  );
}

export default Dropdown;
