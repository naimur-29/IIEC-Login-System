import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../scss/authForm.scss";

// local custom hooks:
import useAuth from "../hooks/useAuth";

const AuthForm = ({ reloadActiveUsersList }) => {
  // states:
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  // hooks:
  const {
    action: submit,
    isLoading,
    response,
    setResponse,
    error,
    setError,
  } = useAuth();

  // functions:
  const isFormDataValid = () => {
    if (!(formData.id && formData.password)) {
      setError("Seriously? Enter something before you press that button!");
      return false;
    } else if (isNaN(formData.id)) {
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
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    setResponse("");
    setError("");

    if (isFormDataValid()) {
      await submit(formData, `/${[event.target.name]}`);
      reloadActiveUsersList();

      setFormData({
        id: "",
        password: "",
      });
    }
  };

  return (
    <div className="auth-section">
      <div>
        {error ? <p style={{ backgroundColor: "#f003" }}>{error}</p> : <></>}

        {response ? (
          <p style={{ backgroundColor: "#0f03" }}>{response}</p>
        ) : (
          <></>
        )}
      </div>

      <div className="form">
        <div className="labels-container">
          <label>ID</label>
          <label>Password</label>
        </div>

        <div className="inputs-container">
          <input
            type="string"
            name="id"
            autoComplete="off"
            value={formData.id}
            onChange={handleFormData}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
      </div>

      <div className="buttons-container">
        <button
          className="btn"
          name="login"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Login
        </button>
        <button
          className="btn"
          name="logout"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Logout
        </button>
        <Link className="btn" to={"register"}>
          New here? click to register your account!
        </Link>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  reloadActiveUsersList: PropTypes.func,
};

export default AuthForm;
