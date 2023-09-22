"use client";

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./search.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const inputRefEmail = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    const inputEmail = inputRefEmail.current.value;

    const reqBody = {
      email: inputEmail,
    };

    fetch("api/", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            id="email"
            placeholder="Search Products"
            aria-label="Search Products"
            ref={inputRefEmail}
          />
          <button>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faMagnifyingGlass}
            />
          </button>
        </div>
      </form>
    </section>
  );
}

export default Search;
