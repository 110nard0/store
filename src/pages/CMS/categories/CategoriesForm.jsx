import React, { useId, useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import InputGroup from "@components/InputGroup";
import "@asset/pages/cms/PreferencesForm.scss";
import { categorySchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cmsContext } from "../../../store/context";

const CategoriesForm = () => {
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
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: "",
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
      type: "ADD_CATEGORY",
      payload: data,
    });

    navigate(-1);
  };

  return (
    <div>
      <CmsHeader
        heading="Add a new category"
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
            placeholder="Enter name of category "
            title="Name"
            id="category"
            admin="cms"
            name="category"
            error={errors.category}
            errormessage={errors.category?.message}
            {...register("category")}
          />
        </div>
        <button type="submit" className="form_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default CategoriesForm;
