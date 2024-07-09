import React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Form() {
  const [formData, setFormData] = useState({
    city: "",
  });

  const [show, setShow] = useState(false);
  function handleClose() {
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }

  const [cityName, setCityName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/realtime?location=${formData.city}`,
        {
          headers: {
            apikey: "r11BV4x7LZtvYczto8QvcSlFxuyLfWho",
          },
        }
      );

      const weatherData = response.data;
      console.log(weatherData);
      setCityName(weatherData.location.name);
      setLat(weatherData.location.lat);
      setLon(weatherData.location.lon);
      setTemp(weatherData.data.values.temperature);
      setHumidity(weatherData.data.values.humidity);
      setWindSpeed(weatherData.data.values.windSpeed);
      handleShow(true);
    } catch (error) {
      console.log("Error:", error);
      alert("you entered a wrong city name.");
    }
  };

  return (
    <>
      <div
        className="tab-pane fade show"
        id="webService-tab-pane"
        role="tabpanel"
        aria-labelledby="webService-tab"
      >
        <form onSubmit={handleSubmit}>
          <br />
          <h2>Enter a city to get information about it's weather tomorrow</h2>
          <br />

          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="city" className="col-form-label">
                City
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="City Name"
                required

                //aria-describedby="passwordHelpInline"
              />
            </div>
          </div>
          <br />

          <div>
            <button type="submit">submit</button>
          </div>
        </form>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title> {cityName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>location</b>
            </p>
            <div>
              <p>lat: {lat} </p>
              <p>lon: {lon}</p>
            </div>
            <hr />
            <p>
              <b>Weather</b>
            </p>
            <div>
              <p>temperature: {temp}</p>
              <p>humidity: {humidity}</p>
              <p>windSpeed: {windSpeed}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default Form;
