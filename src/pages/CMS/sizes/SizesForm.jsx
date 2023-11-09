import React, { useState, useId } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import InputGroup from "@components/InputGroup";
import "@asset/pages/cms/SizesForm.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cmsContext } from "@store/context.jsx";
import { addSizeSchema } from "../../../schemas";

const SizesForm = () => {
  // HDR: INITIALIZER

  // SUB: Generates differerent id
  const id = useId();

  // SUB: Nagivation
  const navigate = useNavigate();

  // SUB: Useform and zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addSizeSchema),
    defaultValues: {
      sizename: "",
      sizevalue: "",
    },
  });

  // SUB: Cms context
  const { dispatch } = cmsContext();

  // HDR: ACTIONS

  // SUB: clickHandler
  const clickHandler = () => {
    navigate(-1);
  };

  // SUB: SubmitHandler

  const submitHandler = (formData) => {
    let data = { key: id, ...formData };
    dispatch({
      type: "ADD_SIZE",
      payload: data,
    });

    navigate(-1);
  };

  // HDR: JSX
  return (
    <div>
      <CmsHeader
        heading="Add new size"
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
            placeholder="Enter the name of the size"
            title="Name"
            id="sizename"
            admin="cms"
            name="sizename"
            error={errors.sizename}
            errormessage={errors.sizename?.message}
            {...register("sizename")}
          />
          <InputGroup
            type="text"
            autoComplete="on"
            placeholder="Enter the value of the size e.g M, 2XL, etc."
            title="Value"
            id="sizevalue"
            admin="cms"
            name="sizevalue"
            error={errors.sizevalue}
            errormessage={errors.sizevalue?.message}
            {...register("sizevalue")}
          />
        </div>
        <button type="submit" className="form_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default SizesForm;
