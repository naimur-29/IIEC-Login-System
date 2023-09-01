import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../scss/authForm.scss";

// local custom hooks:
import useAuth from "../hooks/useAuth";
import useFocusNext from "../hooks/useFocusNext";

const AuthForm = ({ activeUsersList, reloadActiveUsersList }) => {
  // states:
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  // references:
  const timeoutRef = useRef(null);
  const focusNextRef = useFocusNext();

  // hooks:
  const {
    action: submit,
    isLoading,
    response,
    setResponse,
    error,
    setError,
  } = useAuth();

  // useEffects:

  // functions:
  const isUserAlreadySignedIn = () => {
    for (let user of activeUsersList) {
      if (String(user.id) === String(formData.id)) {
        return [true, user.name];
      }
    }
    return [false, null];
  };

  const isFormDataValid = () => {
    if (!(formData.id && formData.password)) {
      setError("Seriously? Enter everything before you press that button!");
      return false;
    } else if (isNaN(formData.id) || formData.id.length !== 8) {
      setError("Enter your proper ID!");
      return false;
    } else {
      setFormData((prev) => ({ ...prev, id: Number(prev.id) }));
      return true;
    }
  };

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = async (event) => {
    const action = event.target.name;
    setError("");
    setResponse("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    let isValidReq = isFormDataValid();

    if (isValidReq) {
      // check if user already signed in or out:
      const actionValidity = isUserAlreadySignedIn();

      if (action === "login" && actionValidity[0]) {
        setError(
          `${actionValidity[1].split(" ")[0]}, you've already signed in!`
        );
      } else {
        await submit(formData, `/${action}`);
        reloadActiveUsersList();
      }

      setFormData({
        id: "",
        password: "",
      });
    }

    timeoutRef.current = setTimeout(() => {
      setError("");
      setResponse("");
    }, 5000);
  };

  return (
    <div className="auth-section">
      <div className="form">
        {/* Input fields: */}
        <div className="fields-container">
          <div className="container">
            <label>ID: </label>
            <input
              ref={focusNextRef}
              type="string"
              name="id"
              autoComplete="off"
              readOnly
              onFocus={(event) => event.target.removeAttribute("readOnly")}
              value={formData.id}
              onChange={handleFormData}
            />
          </div>

          <div className="container">
            <label>Password: </label>
            <input
              ref={focusNextRef}
              type="password"
              name="password"
              autoComplete="off"
              readOnly
              onFocus={(event) => event.target.removeAttribute("readOnly")}
              value={formData.password}
              onChange={handleFormData}
            />
          </div>
        </div>

        {/* Error and Response message: */}
        <div className="message-container">
          {error ? (
            <p style={{ backgroundColor: "#f003", padding: "2px" }}>{error}</p>
          ) : (
            <></>
          )}

          {response ? (
            <p style={{ backgroundColor: "#0f03", padding: "2px" }}>
              {response}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="buttons-container">
        <button
          className="btn"
          name="login"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <button
          className="btn"
          name="logout"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Logout
        </button>
        <Link className="btn register" to={"register"}>
          New here? click to register your account!
        </Link>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  reloadActiveUsersList: PropTypes.func,
  activeUsersList: PropTypes.array,
};

export default AuthForm;
