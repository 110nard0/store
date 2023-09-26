import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitListShema } from "../../schemas";

import { BiErrorCircle } from "react-icons/bi";

const WaitListForm = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  };

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
    }
  }, [isSubmitSuccessful]);

  return (
    <form
      className="landing_form"
      name="access-form"
      aria-label="access form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p>
        To gain access to our clothing on launch day, fill the form to receive
        your password.
      </p>
      <div className={`input-group ${errors.name && "error"}`}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          {...register("name")}
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
    </form>
  );
};

export default WaitListForm;
