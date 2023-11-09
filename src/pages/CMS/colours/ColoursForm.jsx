import React, { useId, useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import InputGroup from "@components/InputGroup";
import "@asset/pages/cms/SizesForm.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cmsContext } from "@store/context.jsx";
import { newColourSchema } from "../../../schemas";

const ColourForm = () => {
  // HDR: INITIALIZER

  // SUB: Generate different Id
  const id = useId();

  // SUB: Nagivation
  const navigate = useNavigate();

  // SUB: Useform and zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newColourSchema),
    defaultValues: {
      colour: "",
      hex: "",
    },
  });

  // SUB: Cms context
  const { dispatch } = cmsContext();

  // HDR: ACTIONS

  // SUB: clickHandler
  const clickHandler = () => {
    navigate(-1);
  };

  const submitHandler = (formData) => {
    let data = { key: id, ...formData };
    dispatch({
      type: "ADD_COLOUR",
      payload: data,
    });

    navigate(-1);
  };

  // HDR : JSX
  return (
    <div>
      <CmsHeader
        heading="Add new colours"
        subheading="Fill the form below with relevant details"
      >
        <CmsBtn name="back" onClick={clickHandler} />
      </CmsHeader>
      <form
        className="form"
        method="post"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="form_inputs">
          <InputGroup
            type="text"
            autoComplete="on"
            placeholder="Enter the value of the colour"
            title="Name"
            id="colour"
            admin="cms"
            name="colour"
            error={errors.colour}
            errormessage={errors.colour?.message}
            {...register("colour")}
          />
          <InputGroup
            type="text"
            autoComplete="on"
            placeholder="Enter the hexcode of the colour e.g #ffffff"
            title="Value"
            id="hex"
            admin="cms"
            name="hex"
            error={errors.hex}
            errormessage={errors.hex?.message}
            {...register("hex")}
          />
        </div>
        <button type="submit" className="form_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default ColourForm;
