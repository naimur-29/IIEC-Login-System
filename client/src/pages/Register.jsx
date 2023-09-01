import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../scss/register.scss";

// Local Components:
import MainTitle from "../components/MainTitle.jsx";

// Local custom hooks:
import useFocusNext from "../hooks/useFocusNext";
import useAuth from "../hooks/useAuth";

const Register = () => {
  // states:
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    department: "",
    designation: "",
    password: "",
    rePassword: "",
  });

  // hooks:
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const focusNext = useFocusNext();
  const {
    action: submit,
    isLoading,
    response,
    setResponse,
    error,
    setError,
  } = useAuth();

  // functions:
  const handleFormData = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const isFormDataValid = () => {
    const passwordValidation = new RegExp(
      "^^(?=.*[A-Z]{1,})" +
        "(?=.*[a-z]{1,})(?=.*[0-9]{1,})" +
        "(?=.*[!@#$-_?.:{]{1,})" +
        "[a-zA-Z0-9!@#$-_?.:{]{8,}$"
    );

    if (
      !(
        formData.name &&
        formData.id &&
        formData.department &&
        formData.password &&
        formData.rePassword
      )
    ) {
      setError("Seriously? Enter everything before you press that button!");
      return false;
    } else if (isNaN(formData.id) || formData.id.length !== 8) {
      setError("Enter your proper ID!");
      return false;
    } else if (!formData.password.match(passwordValidation)) {
      setError("Your password wants to become stronger!");
      return false;
    } else if (formData.password !== formData.rePassword) {
      setError("Password doesn't match!");
      return false;
    } else {
      setFormData((prev) => ({
        ...prev,
        id: Number(prev.id),
      }));
      return true;
    }
  };

  const handleSubmit = async (event) => {
    const action = event.target.name;
    setError("");
    setResponse("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    let isValidReq = isFormDataValid();

    if (isValidReq) {
      const res = await submit(
        {
          name: formData.name,
          id: formData.id,
          department: formData.department,
          designation: formData.designation,
          password: formData.password,
        },
        `/${action}`
      );

      // navigate back to dashboard:
      if (res) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }

      setFormData({
        name: "",
        id: "",
        department: "",
        designation: "",
        password: "",
        rePassword: "",
      });
    }

    // clear error/response messages:
    timeoutRef.current = setTimeout(() => {
      setError("");
      setResponse("");
    }, 10000);
  };

  return (
    <section className="register-page">
      <MainTitle />

      <div className="form-section">
        <h3 className="title">Register</h3>

        {/* Error and Response message: */}
        <div className="message-container">
          {error ? (
            <p
              style={{
                backgroundColor: "#f003",
                padding: "2px",
              }}
            >
              {error}
            </p>
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

        <div className="container">
          <label htmlFor="name">Name: </label>
          <input
            ref={focusNext}
            type="text"
            name="name"
            autoComplete="off"
            readOnly
            onFocus={(event) => event.target.removeAttribute("readOnly")}
            value={formData.name}
            onChange={handleFormData}
          />
        </div>

        <div className="container">
          <label htmlFor="id">ID: </label>
          <input
            ref={focusNext}
            type="text"
            name="id"
            autoComplete="off"
            readOnly
            onFocus={(event) => event.target.removeAttribute("readOnly")}
            value={formData.id}
            onChange={handleFormData}
          />
        </div>

        <div className="container">
          <label htmlFor="department">Department: </label>
          <input
            ref={focusNext}
            type="text"
            name="department"
            autoComplete="off"
            readOnly
            onFocus={(event) => event.target.removeAttribute("readOnly")}
            value={formData.department}
            onChange={handleFormData}
          />
        </div>

        <div className="container">
          <label htmlFor="designation">{"IIEC Designation (If any): "}</label>
          <input
            ref={focusNext}
            type="text"
            name="designation"
            autoComplete="off"
            readOnly
            onFocus={(event) => event.target.removeAttribute("readOnly")}
            value={formData.designation}
            onChange={handleFormData}
          />
        </div>

        <div className="container">
          <label htmlFor="password">Password: </label>
          <input
            ref={focusNext}
            type="password"
            name="password"
            autoComplete="off"
            readOnly
            onFocus={(event) => event.target.removeAttribute("readOnly")}
            value={formData.password}
            onChange={handleFormData}
          />
        </div>

        <div className="container">
          <label htmlFor="rePassword">Re-type Password: </label>
          <input
            ref={focusNext}
            type="password"
            name="rePassword"
            autoComplete="off"
            readOnly
            onFocus={(event) => event.target.removeAttribute("readOnly")}
            value={formData.rePassword}
            onChange={handleFormData}
          />
        </div>

        <p className="warning">
          *password must contain more than 8 characters, digits, uppercase,
          lowercase.
        </p>

        <div className="buttons-container">
          <button
            className="btn"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Go Back
          </button>
          <button
            className="btn"
            onClick={handleSubmit}
            name="register"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
