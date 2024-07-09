import React from "react";
import Form from "./Form";
import Game from "./Game";
import Title from "./Title";

function Main() {
  return (
    <>
      <Title />
      <div className="container mainContainer">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="game-tab"
              data-bs-toggle="tab"
              data-bs-target="#game-tab-pane"
              type="button"
              role="tab"
              aria-controls="game-tab-pane"
              aria-selected="true"
            >
              Game
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="webService-tab"
              data-bs-toggle="tab"
              data-bs-target="#webService-tab-pane"
              type="button"
              role="tab"
              aria-controls="webService-tab-pane"
              aria-selected="false"
            >
              Weather
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <Game />
          <Form />
        </div>
      </div>
    </>
  );
}
export default Main;
