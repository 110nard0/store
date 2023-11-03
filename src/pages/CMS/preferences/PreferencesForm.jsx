import React, { useId, useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import InputGroup from "@components/InputGroup";
import "@asset/pages/cms/PreferencesForm.scss";
import { preferencesSchema } from "@schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cmsContext } from "@store/context";

const PreferencesForm = () => {
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
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      preference: "",
    },
  });

  // SUB: Cms context
  const { dispatch } = cmsContext();

  // HDR: ACTIONS

  const clickHandler = () => {
    navigate(-1);
  };

  const submitHandler = (formData) => {
    let data = { key: id, ...formData };
    dispatch({
      type: "ADD_PREFERENCE",
      payload: data,
    });

    navigate(-1);
  };

  return (
    <div>
      <CmsHeader
        heading="Add new Preference"
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
            placeholder="Enter name of preference "
            title="Name"
            id="preference"
            admin="cms"
            name="preference"
            error={errors.preference}
            errormessage={errors.preference?.message}
            {...register("preference")}
          />
        </div>
        <button type="submit" className="form_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default PreferencesForm;
