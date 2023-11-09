import React, { useEffect, useMemo, useState } from "react";

import "@asset/pages/RegisterPage.scss";
import { BsArrowUpRight, BsEye, BsGoogle, BsEyeSlash } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@schemas";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { createNewUser } from "@services";
import { toCapitalise } from "@utils/helpers";

import InputGroup from "@components/InputGroup";

const RegisterPage = () => {
  // HDR:-------------------------STATES-----------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preference, setPreference] = useState("");
  const [newUser, setNewUser] = useState({});
  const [formError, setFormError] = useState("");
  const [showSucess, setShowSuccess] = useState(false);

  // HDR:-------------------------FORM VALIDATION-----------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  // HDR:-------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = (formData) => {
    setNewUser(formData);
    setShowPreferences(true);
  };

  // SUB: Sending data to backend
  const submitUser = async () => {
    const user = { ...newUser };

    if (preference && isSubmitSuccessful) {
      user.preference = preference;
    }
    try {
      await createNewUser(user);
      // CMT: A successfully register link is shown, and they are directed to login
      setShowSuccess(true);
      reset();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.email[0]);
        console.log(err.response.data.email);
      }
    }
  };

  // HDR: UseMemo and UseEffect

  useMemo(() => {
    setShowOptions(false);
  }, [preference]);

  const emailChange = watch("email");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (emailChange && formError) {
        setFormError("");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [formError]);

  // HDR:================================================================================================
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
        {/* SUB:------------------LEFT CONTAINER---------------------------- */}
        <div className="left-container">
          <div className="left-container_top">
            <h2 className="left-container_top__heading">Create account</h2>
          </div>
          <div className="left-container_bottom">
            <h4>
              Already have an account?
              <button type="button" className="login_link">
                <Link to="/login">Log in </Link>
                <BsArrowUpRight />
              </button>
            </h4>
          </div>
        </div>

        {/* SUB:-------------------RIGHT CONTAINER---------------------------- */}
        <div className="right-container">
          <form
            method="post"
            className="right-container_form"
            onSubmit={handleSubmit(submitHandler)}
          >
            {!showPreferences && (
              <>
                <InputGroup
                  type="text"
                  id="firstname"
                  name="first_name"
                  autoComplete="on"
                  placeholder="Enter your First name"
                  title="First name"
                  error={errors["first_name"]}
                  errormessage={errors["first_name"]?.message}
                  {...register("first_name")}
                />
                <InputGroup
                  type="text"
                  id="lastname"
                  name="last_name"
                  autoComplete="on"
                  placeholder="Enter your last name"
                  title="Last name"
                  error={errors["last_name"]}
                  errormessage={errors["last_name"]?.message}
                  {...register("last_name")}
                />

                <InputGroup
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="on"
                  placeholder="Enter your email address"
                  title="Email Address"
                  error={errors.email}
                  errormessage={errors.email?.message}
                  {...register("email")}
                />

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
            {/* SUB: Preferences */}
            {showPreferences && (
              <>
                <div className="preference_heading">
                  <h2 className="preference_title">Clothing preference</h2>
                  <h4 className="preference_subtitle">
                    This will help us make relevant recommendations to match
                    your taste.
                  </h4>
                </div>

                {/* SUB: SUCESS REG */}
                {showSucess && (
                  <div className="success_reg">
                    <em className="sucess">Registered sucessfully, please </em>
                    <Link to="/login"> click to login</Link>
                  </div>
                )}
                <div className="preference_container">
                  {/* {!preference && <p>Select one please</p>} */}
                  <div
                    className={`preference_box ${showOptions && "open"}`}
                    onClick={() => setShowOptions((prev) => !prev)}
                  >
                    <h4>
                      {preference
                        ? toCapitalise(preference)
                        : "Select your clothing preference"}
                    </h4>{" "}
                    <FaChevronDown />
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

                {formError && <em className="form_error">{formError}</em>}
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
