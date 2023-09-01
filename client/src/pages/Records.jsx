import { useState, useEffect, useRef } from "react";

import "../scss/records.scss";

// local components:
import MainTitle from "../components/MainTitle";

// hooks:
import useFetchOnDemand from "../hooks/useFetchOnDemand";

const Records = () => {
  // states:
  const [userInput, setUserInput] = useState("");

  // references:
  const timeoutRef = useRef(null);

  // hooks:
  const { data, setData, action, isLoading, error, setError, url } =
    useFetchOnDemand();

  // useEffects:
  useEffect(() => {
    if (data) {
      window.open(url, "_self");
      setData(null);
      setUserInput("");
    }
  }, [data, setData, url]);

  // functions:
  const handleSubmit = async () => {
    if (timeoutRef) clearTimeout(timeoutRef);

    if (userInput) {
      await action("/" + userInput);
      setUserInput("");
    } else {
      setError("Enter something first!");
    }

    timeoutRef.current = setTimeout(() => {
      setError("");
      setData(null);
    }, 5000);
  };

  return (
    <section className="records-page">
      <MainTitle />

      <div className="history-section">
        <h3 className="title">Activity History</h3>

        {/* Error Message: */}
        {error ? <p className="error-message">{error}</p> : <></>}

        <div className="form-container">
          <label htmlFor="date">Date: </label>
          <input
            type="text"
            placeholder="DD-MM-YYYY"
            value={userInput}
            autoComplete="off"
            readOnly
            onFocus={(event) => event.target.removeAttribute("readOnly")}
            onChange={(event) => setUserInput(event.target.value.trim())}
          />
          <button className="btn" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Download"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Records;
