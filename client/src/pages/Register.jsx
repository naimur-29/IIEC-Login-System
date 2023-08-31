import "../scss/register.scss";

const Register = () => {
  return (
    <section className="register-page">
      <div className="title-section">
        <h2>IUBAT Innovation & Entrepreneurship Center</h2>
      </div>

      <div className="form-section">
        <div className="container">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" />
        </div>

        <div className="container">
          <label htmlFor="id">ID: </label>
          <input type="text" name="id" />
        </div>

        <div className="container">
          <label htmlFor="department">Department: </label>
          <input type="text" name="department" />
        </div>

        <div className="container">
          <label htmlFor="designation">IIEC Designation: </label>
          <input type="text" name="designation" />
        </div>

        <div className="container">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" />
        </div>

        <div className="container">
          <label htmlFor="password again">Re-type Password: </label>
          <input type="password" name="password-again" />
        </div>
      </div>

      <div className="button-section">
        <button>Register</button>
      </div>
    </section>
  );
};

export default Register;
