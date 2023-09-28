import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitListShema } from "../../schemas";

import { BiErrorCircle } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";

const WaitListForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = (formData) => {
    console.log(formData);
  };

  // const isSubmitSuccessful = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(waitListShema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowSuccess(true);
    }
  }, [isSubmitSuccessful]);

  return (
    <form
      className="landing_form"
      name="access-form"
      aria-label="access form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!showSuccess && (
        <div className="register_form">
          <p>
            To gain access to our clothing on launch day, fill the form to
            receive your password.
          </p>
          <div className={`input-group ${errors.name && "error"}`}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              {...register("name")}
              autoComplete="on"
            />

            {errors.name && (
              <span>
                <BiErrorCircle /> {errors.name?.message}
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

          <button className="landing_form-btn" type="submit">
            Get Password
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="success_container">
          <div className="success_icon">
            <AiFillHeart />
          </div>

          <h3 className="success_title">You are on the list</h3>
          <p className="success_subtitle">
            Thank you for joining us. You will receive your password on launch
            day.
          </p>
        </div>
      )}
    </form>
  );
};

export default WaitListForm;
