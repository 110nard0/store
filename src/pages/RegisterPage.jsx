import React, { useState } from "react";

import "../assets/styles/pages/RegisterPage.scss";
import { BsArrowUpRight, BsEye, BsGoogle, BsEyeSlash } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  // -------------------------NAVIGATION-----------------------------------------

  const navigate = useNavigate();

  // -------------------------STATES-----------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preference, setPreference] = useState("");
  const [newUser, setNewUser] = useState({});

  // -------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = (formData) => {
    setNewUser(formData);
    setShowPreferences(true);
  };

  const submitUser = () => {
    const user = { ...newUser };

    if (preference && isSubmitSuccessful) {
      user.preference = preference;
      navigate("/");
      reset();
    }
  };

  // -------------------------FORM VALIDATION-----------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  // ================================================================================================
  return (
    <section>
      {showPreferences && (
        <div className="prev_container">
          <button
            type="button"
            className="prev_btn"
            onClick={() => setShowPreferences(false)}
          >
            <AiOutlineArrowLeft /> Previous
          </button>
        </div>
      )}

      <div className="register-page">
        {/* -------------------LEFT CONTAINER---------------------------- */}
        <div className="left-container">
          <div className="left-container_top">
            <p className="left-container_top__heading">Create account</p>
          </div>
          <div className="left-container_bottom">
            <p>
              Already have an account?
              <button type="button" className="login_link">
                <Link to="/login">Log in </Link>
                <BsArrowUpRight />
              </button>
            </p>
          </div>
        </div>

        {/* -------------------RIGHT CONTAINER---------------------------- */}
        <div className="right-container">
          <form
            method="post"
            className="right-container_form"
            onSubmit={handleSubmit(submitHandler)}
          >
            {!showPreferences && (
              <>
                <div className={`input-group ${errors.firstname && "error"}`}>
                  <label htmlFor="firstname">First name</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    autoComplete="on"
                    placeholder="Enter your first name"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <span>
                      <BiErrorCircle /> {errors.firstname?.message}
                    </span>
                  )}
                </div>
                <div className={`input-group ${errors.lastname && "error"}`}>
                  <label htmlFor="lastname">Last name</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    autoComplete="on"
                    placeholder="Enter your last name"
                    {...register("lastname")}
                  />
                  {errors.lastname && (
                    <span>
                      <BiErrorCircle /> {errors.lastname?.message}
                    </span>
                  )}
                </div>
                <div className={`input-group ${errors.email && "error"}`}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="on"
                    placeholder="Enter your email address"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span>
                      <BiErrorCircle /> {errors.email?.message}
                    </span>
                  )}
                </div>

                <div className={`input-group ${errors.password && "error"}`}>
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Choose your preferred password"
                    {...register("password")}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-icon"
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </span>

                  {errors.password && (
                    <span>
                      <BiErrorCircle /> {errors.password?.message}
                    </span>
                  )}
                </div>

                <div className="right-container_form__submit--btns">
                  <button type="submit" className="register_btn">
                    Proceed to create an account
                  </button>
                  <button type="button" className="google_btn">
                    <BsGoogle /> <span>Sign in with Google</span>
                  </button>
                </div>
              </>
            )}

            {showPreferences && (
              <>
                <div className="preference_heading">
                  <p className="preference_title">Clothing preference</p>
                  <p className="preference_subtitle">
                    This will help us make relevant recommendations to match
                    your taste.
                  </p>
                </div>
                <div className="preference_container">
                  {/* {!preference && <p>Select one please</p>} */}
                  <div
                    className={`preference_box ${showOptions && "open"}`}
                    onClick={() => setShowOptions((prev) => !prev)}
                  >
                    <p>Select your clothing preference</p> <FaChevronDown />
                  </div>
                  {showOptions && (
                    <div className="preference_select">
                      <div className="radio-group">
                        <label>
                          Minimal
                          <input
                            type="radio"
                            name="preference"
                            value="minimal"
                            onChange={(e) => setPreference(e.target.value)}
                            checked={preference === "minimal"}
                          />
                          <span></span>
                        </label>
                      </div>
                      <div className="radio-group">
                        <label>
                          Alte
                          <input
                            type="radio"
                            name="preference"
                            value="alte"
                            onChange={(e) => setPreference(e.target.value)}
                            checked={preference === "alte"}
                          />
                          <span></span>
                        </label>
                      </div>
                      <div className="radio-group">
                        <label>
                          Modern/Chic
                          <input
                            type="radio"
                            name="preference"
                            value="modern"
                            onChange={(e) => setPreference(e.target.value)}
                            checked={preference === "modern"}
                          />
                          <span></span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="submit_btn"
                  onClick={submitUser}
                >
                  Finish
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
