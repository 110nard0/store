import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitListSchema } from "@schemas";
import { AiFillHeart } from "react-icons/ai";
import { newWaitUser } from "../../services";
import InputGroup from "@components/InputGroup";

const WaitListForm = () => {
  // HDR: INIIALISERS -------------------------STATE FOR THE SUCCESS CONTENT-----------------------------------------
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // HDR: ACTIONS -------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const onSubmit = async (formData) => {
    try {
      await newWaitUser(formData);
      setShowSuccess(true);
      reset();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.error);
      }
    }
  };

  //SUB: ------CLEAR ERROR MESSAGE--------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormError("");
    }, 8000);

    return () => clearTimeout(timer);
  }, [formError]);

  //SUB: ------FORM VALIDATION--------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(waitListSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  //HDR: JSX ================================================================================================
  return (
    <form
      name="access-form"
      aria-label="access form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* ================================================================================================ */}
      {!showSuccess && (
        <div className="register_form">
          <p>
            To gain access to our clothing on launch day, fill the form and get
            up to 10% discount on your first purchase
          </p>
          <InputGroup
            type="text"
            id="name"
            name="name"
            autoComplete="on"
            placeholder="Enter your name"
            title="Name"
            error={errors.name}
            errormessage={errors.name?.message}
            {...register("name")}
          />
          <InputGroup
            type="email"
            id="email"
            name="email"
            autoComplete="on"
            placeholder="Enter your email address"
            title="Email Address"
            error={errors.email || formError}
            errormessage={errors.email?.message}
            {...register("email")}
          />
          {formError && <em className="form_error">{formError}</em>}
          <button className="waitlist_form-btn" type="submit">
            Get Password
          </button>
        </div>
      )}

      {/* ================================================================================================ */}

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
