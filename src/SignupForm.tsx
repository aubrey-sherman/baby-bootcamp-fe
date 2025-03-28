import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Alert from "./Alert.tsx";
import { SignUp, RegisterParams } from "./types.ts";

/** Sign-up form for Baby Bootcamp
 *
 * Props: signup function, errors like ["message1", ...]
 * State: formData, errors
 *
 * RoutesList -> SignupForm -> Alert
*/

function SignupForm({ signUp }: SignUp) {
  const navigate = useNavigate();
  const defaultFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    babyName: ""
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<string[]>([]);

  /** Update formData as user types into form fields */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(currentData => ({ ...currentData, [name]: value }));
  }

  /** Send formData to BabyBootcampApp on form submission */
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    try {
      await signUp(formData);
      navigate('/')

    } catch (errors: any) {
      setErrors(errors);
    }
  }

  return (
    <div className="SignupForm">
    <h2>Sign up for a Baby Bootcamp account</h2>
    <p>Already have an account? Log in <Link to={'/login'}> here</Link>.</p>
      <form onSubmit={handleSubmit}>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="username-input" className="col-sm-4 col-form-label">
            Username (must be between 1 and 30 characters).
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="username"
              id="username-input"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="password-input" className="col-sm-4 col-form-label">
            Password (must be between 5-20 characters.)
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              name="password"
              id="password-input"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="first-name-input" className="col-sm-4 col-form-label">
            First name (must be between 1-100 characters).
          </label>
          <div className="col-sm-8">
            <input
              id="first-name-input"
              type="text"
              name="firstName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="last-name-input" className="col-sm-4 col-form-label">
            Last name (must be between 1-100 characters).
          </label>
          <div className="col-sm-8">
            <input
              id="last-name-input"
              type="text"
              name="lastName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="last-name-input" className="col-sm-4 col-form-label">
            Your baby's name ❤️ (must be between 2-100 characters).
          </label>
          <div className="col-sm-8">
            <input
              id="baby-name-input"
              type="text"
              name="babyName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="email-input" className="col-sm-4 col-form-label">
            Email (must be between 6-100 characters and a valid address).
          </label>
          <div className="col-sm-8">
            <input
              id="email-input"
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

          <button type="submit" className="btn btn-dark">Submit</button>
        {errors.length > 0 && <Alert messages={errors} />}
      </form>

    </div>
  );

}

export default SignupForm;