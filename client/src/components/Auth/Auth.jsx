import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"

// The Auth component handles user signup and login
const Auth = ({ updateToken }) => {
  // The "signup" state determines whether the form is in signup (true) or login (false) mode
  const [signup, setSignup] = useState(true);

  // Create references for the form fields
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef(); //
  const passwordRef = useRef();

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    console.log("Form was submitted"); // Logs a message to the console

    try {
      // Send a POST request to register the user
      const response = await fetch(
        `http://localhost:8080/users${signup ? "/signup" : "/login"}`,

        {
          method: "POST", // HTTP method
          headers: {
            "Content-Type": "application/json", // Headers for the request to indicate the data is JSON
          },
          body: JSON.stringify({
            // Body of the request with values from the form fields
            firstName: signup && firstNameRef.current.value,
            lastName: signup && lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      // Get the response as JSON
      const data = await response.json();

      console.log(data); // Log the response from the API

      // Update the token with the value received in the response

      updateToken(data.Token, data.User._id);

      navigate("/rooms");
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* When the form is submitted, call handleSubmit */}
      <h2>{signup ? "Signup" : "Login"}</h2>{" "}
      {/* Display "Signup" or "Login" based on the signup state */}
      {signup && (
        <>
          {/* First Name and input LiastName*/}

          <input ref={firstNameRef} placeholder="First Name" required />{" "}
          <input ref={lastNameRef} placeholder="Last Name" required />{" "}
        </>
      )}
      {/* input email / input password / submit button  */}
      <input ref={emailRef} placeholder="Email" required />
      <input ref={passwordRef} placeholder="Password" required />{" "}
      <button>Submit</button> {/* Submit button */}
      <button
        type="button"
        onClick={() => {
          // When clicked, toggle the "signup" state to switch between signup and login
          setSignup(!signup);
        }}
      >
        {/* Button text changes based on the "signup" state */}
        {signup ? "Need to login?" : "Need to signup?"}
      </button>
    </form>
  );
};

export default Auth; // Export the component to be used in other files
