import React, { useState, useId, useMemo } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import InputGroup from "@components/InputGroup";
import "@asset/pages/cms/ProductForm.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cmsContext } from "@store/context.jsx";
import { newProductSchema } from "@schemas";
import CmsSelectDropDown from "@components/CmsSelectDropDown";
import ColourRadioBtn from "@components/ColourRadioBtn.jsx";
import useClickOutiside from "@hooks/use-clickOutside.js";
import RadioBtn from "@components/RadioBtn.jsx";
import TextAreaGroup from "../../../components/TextAreaGroup";

const ProductForm = () => {
  // HDR: INITIALIZER

  // SUB: Generates differerent id
  const id = useId();

  // SUB: Nagivation
  const navigate = useNavigate();

  // SUB: Hooks to close drop down
  const {
    visible: showPreference,
    setVisible: setShowPreference,
    ref: prefRef,
  } = useClickOutiside(false);
  const {
    visible: showCategory,
    setVisible: setShowCategory,
    ref: catRef,
  } = useClickOutiside(false);
  const {
    visible: showSizes,
    setVisible: setShowSizes,
    ref: sizeRef,
  } = useClickOutiside(false);
  const {
    visible: showColour,
    setVisible: setShowColour,
    ref: colRef,
  } = useClickOutiside(false);

  // SUB: Useform and zodResolver
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newProductSchema),
  });

  // SUB: Cms context

  const {
    state: { preferences, colours, sizes, categories },
    dispatch,
  } = cmsContext();

  // SUB: watching for the dropdown for selection

  const selectValue = watch(["colour", "category", "preference", "size"]);

  useMemo(() => {
    if (selectValue[0]) {
      setShowColour(false);
    }

    if (selectValue[1]) {
      setShowCategory(false);
    }

    if (selectValue[2]) {
      setShowPreference(false);
    }
    if (selectValue[3]) {
      setShowSizes(false);
    }
  }, [selectValue[0], selectValue[1], selectValue[2], selectValue[3]]);

  //   HDR: LIST OF OPTIONS

  // SUB: TO fetch all the options, so selection can be made from the dropdown
  const allPreferences = preferences.map((item) => ({
    value: item.preference,
    label: item.preference,
  }));
  const allSizes = sizes.map((item) => ({
    value: item.sizevalue,
    label: item.sizevalue,
  }));
  const allCategory = categories.map((item) => ({
    value: item.category,
    label: item.category,
  }));
  const allColours = colours.map((item) => ({
    value: `${item.colour}: ${item.hex}`,
    label: item.colour,
  }));

  // HDR: ACTIONS

  // SUB: clickHandler
  const clickHandler = () => {
    navigate(-1);
  };

  // SUB: SubmitHandler

  const submitHandler = (formData) => {
    const data = {
      key: id,
      show: true,
      ...formData,
    };
    dispatch({
      type: "ADD_PRODUCT",
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
        {/* HDR: Product Name */}
        <div className="form_content">
          <InputGroup
            type="text"
            autoComplete="on"
            placeholder="Enter the name of the product"
            title="Name"
            id="product"
            admin="cms"
            name="product"
            error={errors.product}
            errormessage={errors.product?.message}
            {...register("product")}
          />
          {/* HDR: Prefernces */}
          <div className="select_dropdown">
            <p className="cms_label">Preference</p>

            <div ref={prefRef}>
              <CmsSelectDropDown
                onclick={() => setShowPreference(!showPreference)}
                open={showPreference}
                selected={
                  selectValue[2] ? (
                    selectValue[2]
                  ) : (
                    <span>Select a clothing preference</span>
                  )
                }
                error={errors.preference}
              >
                <div className="list_options">
                  {allPreferences.map((p) => (
                    <RadioBtn
                      key={p.label}
                      title={p.label}
                      value={p.value}
                      name="preference"
                      {...register("preference")}
                    />
                  ))}
                </div>
              </CmsSelectDropDown>
            </div>
          </div>

          {/* HDR: Category */}
          <div className="select_dropdown">
            <p className="cms_label">Category</p>

            <div ref={catRef}>
              <CmsSelectDropDown
                onclick={() => setShowCategory(!showCategory)}
                open={showCategory}
                selected={
                  selectValue[1] ? (
                    selectValue[1]
                  ) : (
                    <span>Select clothing category</span>
                  )
                }
                error={errors.category}
              >
                <div className="list_options">
                  {allCategory.map((c) => (
                    <RadioBtn
                      key={c.label}
                      title={c.label}
                      value={c.value}
                      name="category"
                      {...register("category")}
                    />
                  ))}
                </div>
              </CmsSelectDropDown>
            </div>
          </div>
          {/* HDR: Sizes */}
          <div className="select_dropdown">
            <p className="cms_label">Sizes</p>

            <div ref={sizeRef}>
              <CmsSelectDropDown
                onclick={() => setShowSizes(!showSizes)}
                open={showSizes}
                selected={
                  selectValue[3] ? (
                    selectValue[3]
                  ) : (
                    <span>Select clothing sizes</span>
                  )
                }
                error={errors.size}
              >
                <div className="option_content">
                  {allSizes.map((s) => (
                    <RadioBtn
                      key={s.label}
                      title={s.label}
                      value={s.value}
                      name="size"
                      {...register("size")}
                    />
                  ))}
                </div>
              </CmsSelectDropDown>
            </div>
          </div>

          {/* HDR: Colour */}
          <div className="select_dropdown">
            <p className="cms_label">Colour</p>

            <div ref={colRef}>
              <CmsSelectDropDown
                onclick={() => setShowColour(!showColour)}
                open={showColour}
                selected={
                  selectValue[0] ? (
                    selectValue[0].split(":")[0]
                  ) : (
                    <span>Select clothing colour</span>
                  )
                }
                error={errors.colour}
              >
                <div className="option_content">
                  {allColours.map((c) => (
                    <ColourRadioBtn
                      key={c.label}
                      colour={c.value.split(":")[1]}
                      value={c.value}
                      name="colour"
                      //   onChange={() => setSelectedColour("#eb7829")}
                      // checked={selectedColour === "#eb7829"}
                      label={c.label}
                      textclr="white"
                      {...register("colour")}
                    />
                  ))}
                </div>
              </CmsSelectDropDown>
            </div>
          </div>

          {/* HDR: Price */}
          <InputGroup
            type="number"
            autoComplete="on"
            placeholder="Enter the price of the clothing"
            title="Price"
            id="price"
            admin="cms"
            name="price"
            error={errors.price}
            errormessage={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
          />

          {/* HDR: Stock */}
          <InputGroup
            type="number"
            autoComplete="on"
            placeholder="Enter number of items in stock"
            title="Available stock"
            id="stock"
            admin="cms"
            name="stock"
            error={errors.stock}
            errormessage={errors.stock?.message}
            {...register("stock", { valueAsNumber: true })}
          />

          {/* HDR: description */}
          <TextAreaGroup
            type="text"
            autoComplete="on"
            placeholder="Enter the product description"
            title="Product description (max 200 characters)"
            id="description"
            admin="cms"
            name="description"
            error={errors.description}
            errormessage={errors.description?.message}
            {...register("description")}
          />
        </div>

        {/* HDR: Submit btn */}
        <button type="submit" className="form_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
