import { useState } from "react";

import { z } from "zod";

import "./RegistrationForm.scss";

import RegistrationFormSchema from "../schema/RegistrationFormSchema";

export default function RegistrationForm() {
  const [error, setError] = useState({});

  const [submitted, setSubmitted] = useState(null);

  const validate = (form) => {
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());

    const result = RegistrationFormSchema.safeParse(formDataObject);

    if (result.success) {
      setError({});
    } else {
      setError(z.treeifyError(result.error));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    validate(event.target);

    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    const result = RegistrationFormSchema.safeParse(formDataObject);

    const { password, confirmPassword, ...rest } = result.data;
    setSubmitted(rest);
  };

  return (
    <div>
      {" "}
      <form
        onSubmit={submitHandler}
        onChange={(e) => validate(e.currentTarget)}
        onBlur={(e) => validate(e.currentTarget)}
      >
        <legend>Registration</legend>
        <fieldset>
          <label>
            <span>Fornavn</span>
            <input
              autoComplete="given-name"
              type="text"
              name="firstName"
            ></input>
            <ul className="error-list">
              {error.properties?.firstName?.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <label>
            <span>Efternavn</span>
            <input
              autoComplete="family-name"
              type="text"
              name="lastName"
            ></input>
            <ul className="error-list">
              {error.properties?.lastName?.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <label>
            <span>Email</span>
            <input autoComplete="email" type="email" name="email"></input>
            <ul className="error-list">
              {error.properties?.email?.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <label>
            <span>Adgangskode</span>
            <input
              autoComplete="new-password"
              type="password"
              name="password"
            ></input>
            <ul className="error-list">
              {error.properties?.password?.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <label>
            <span>Bekræft adgangskode</span>
            <input
              autoComplete="new-password"
              type="password"
              name="confirmPassword"
            ></input>
            <ul className="error-list">
              {error.properties?.confirmPassword?.errors.map(
                (message, index) => (
                  <li key={index}>{message}</li>
                ),
              )}
            </ul>
          </label>
          <label>
            <span>Fødselsdag</span>
            <input autoComplete="bday-day" type="date" name="birthdate"></input>
            <ul className="error-list">
              {error?.properties?.birthdate?.errors?.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <label>
            <span>Telefonnummer</span>
            <input autoComplete="tel" type="tel" name="phoneNumber"></input>
            <ul className="error-list">
              {error.properties?.phoneNumber?.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <label>
            <span>Brugernavn</span>
            <input autoComplete="username" type="text" name="username"></input>
            <ul className="error-list">
              {error.properties?.username?.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <label>
            <span>Postnummer</span>
            <input
              autoComplete="postal-code"
              type="text"
              name="postalCode"
            ></input>
            <ul className="error-list">
              {error.properties?.postalCode?.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </label>
          <button type="submit">Registrer</button>
        </fieldset>
      </form>
      {submitted && (
        <div>
          <h2>Registreringen var vellykket!</h2>
          <p>Tak for din registrering.</p>

          <pre>{JSON.stringify(submitted, null, 2)}</pre>

          <button
            type="button"
            onClick={() => {
              setSubmitted({});
            }}
          >
            Start ny registrering
          </button>
        </div>
      )}
    </div>
  );
}
