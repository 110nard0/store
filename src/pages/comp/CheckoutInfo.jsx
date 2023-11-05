import React, { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personInfoSchema } from "@schemas";

import "@asset/pages/CheckoutInfo.scss";

import InputGroup from "@components/InputGroup.jsx";
import SelectInput from "@components/SelectInput.jsx";
import { cartContext } from "@store/context.jsx";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import useClickOutiside from "@hooks/use-clickOutside.js";
import RadioBtn from "@components/RadioBtn.jsx";

import states from "@data/states-data.js";
import OptionDropDown from "../../components/OptionDropDown";
const impacts = [
  { name: "Alt School - Tech" },
  { name: "MANI - Mental Health" },
  { name: "NIKE - Creative Arts" },
];

const CheckoutInfo = () => {
  // HDR: INITIALISER
  const {
    state: { info },
    dispatch,
  } = cartContext();

  const navigate = useNavigate();

  const {
    visible: showOptions,
    setVisible: setShowOptions,
    ref: dropdownref,
  } = useClickOutiside(false);

  const {
    visible: showImpact,
    setVisible: setShowImpact,
    ref: impactRef,
  } = useClickOutiside(false);

  const {
    visible: showLga,
    setVisible: setShowLga,
    ref: Lgaref,
  } = useClickOutiside(false);

  // HDR:------------------------- STATES -----------------------------------------

  const [searchValue, setSearchValue] = useState("");
  const [searchLgaValue, setSearchLgaValue] = useState("");
  const [lgas, setLgas] = useState([]);

  const searchHandler = (e) => {
    let value = e.target.value;

    if (value.trim() === " ") {
      return;
    }
    setSearchValue(value);
  };

  const searchLgaHandler = (e) => {
    let value = e.target.value;

    if (value.trim() === " ") {
      return;
    }
    setSearchLgaValue(value);
  };

  // HDR:-------------------------FORM VALIDATION-----------------------------------------
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm({
    resolver: zodResolver(personInfoSchema),
    defaultValues: {
      email: `${info.email ? info.email : ""}`,
      name: `${info.name ? info.name : ""}`,
      phone_number: `${info.phone_number ? info.phone_number : ""}`,
      address: `${info.address ? info.address : ""}`,
      state: `${info.state ? info.state : ""}`,
      impact: `${info.impact ? info.impact : ""}`,
      lga: `${info.lga ? info.lga : ""}`,
    },
  });

  // -------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = (formData) => {
    dispatch({
      type: "ADD_INFO",
      payload: formData,
    });

    navigate("/checkout/order confirmation");

    // console.log(formData);
  };

  const selectValue = watch(["state", "impact", "lga"]);

  useMemo(() => {
    if (selectValue[0]) {
      setShowOptions(false);
    }

    if (selectValue[1]) {
      setShowImpact(false);
    }

    if (selectValue[2]) {
      setShowLga(false);
    }
  }, [selectValue[0], selectValue[1], selectValue[2]]);

  const state = getValues("state");

  // SUB: to set the lgas list
  useMemo(() => {
    const lga = states.filter((s) => s.name === state);
    setLgas(lga[0]?.lgas);
  }, [state]);

  // HDR: JSX
  return (
    <div className="checkout_info">
      <p className="heading">STEP 1 OF 3 - PERSONAL INFORMATION</p>
      <form
        method="post"
        className="checkout_info-form"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/*SUB: =============== EMAIL ================ */}
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

        {/*SUB: =============== NAME ================ */}
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

        {/* SUB:=============== PHONE NUMBER ================ */}
        <InputGroup
          type="text"
          id="phone_number"
          name="phone_number"
          autoComplete="on"
          placeholder="Enter your phone number"
          title="Phone Number"
          error={errors.phone_number}
          errormessage={errors.phone_number?.message}
          {...register("phone_number")}
        />

        {/*SUB: =============== STATE ================ */}
        <div className="state_container" ref={dropdownref}>
          <label htmlFor="state" className="label">
            State
          </label>
          <div onClick={() => setShowOptions((prev) => !prev)}>
            <SelectInput
              error={errors.state}
              id="state"
              value={
                selectValue[0]
                  ? selectValue[0]
                  : "Select your state" || (info.state && info.state)
              }
              open={showOptions}
            />
          </div>
          {showOptions && (
            <OptionDropDown>
              <div className="preference_select">
                <div className="search_container">
                  <BsSearch size={20} />
                  <input
                    type="text"
                    name="search_state"
                    className="search_input"
                    placeholder="search"
                    value={searchValue}
                    onChange={searchHandler}
                  />
                </div>
                <div className="states_option">
                  {states
                    .filter((state) => {
                      if (
                        state.name
                          .toLowerCase()
                          .startsWith(searchValue.toLowerCase())
                      ) {
                        return state;
                      }
                    })
                    .map((sta) => (
                      <RadioBtn
                        name="state"
                        value={sta.name}
                        title={sta.name}
                        key={sta.name}
                        {...register("state")}
                      />
                    ))}
                </div>
              </div>
            </OptionDropDown>
          )}
          {errors.state && (
            <span className="error_field">
              <BiErrorCircle /> {errors.state?.message}
            </span>
          )}
        </div>

        {/* SUB: =============== LGA ================ */}
        <div className="select_container" ref={Lgaref}>
          <label htmlFor="state" className="label">
            LGA
          </label>
          <div onClick={() => setShowLga((prev) => !prev)}>
            <SelectInput
              error={errors.lga}
              id="state"
              value={
                selectValue?.[2]
                  ? selectValue?.[2]
                  : "Select LGA" || (info?.lga && info?.lga)
              }
              open={showLga}
            />
          </div>
          {showLga && (
            <OptionDropDown>
              <div className="preference_select">
                <div className="search_container">
                  <BsSearch size={20} />
                  <input
                    type="text"
                    name="search_state"
                    className="search_input"
                    placeholder="search"
                    value={searchLgaValue}
                    onChange={searchLgaHandler}
                  />
                </div>
                <div className="states_option">
                  {lgas
                    ?.filter((lga) => {
                      if (
                        lga
                          .toLowerCase()
                          .startsWith(searchLgaValue?.toLowerCase())
                      ) {
                        return lga;
                      }
                    })
                    .map((lg) => (
                      <RadioBtn
                        name="state"
                        value={lg}
                        title={lg}
                        key={lg}
                        {...register("lga")}
                      />
                    ))}
                </div>
              </div>
            </OptionDropDown>
          )}
          {errors?.lga && (
            <span className="error_field">
              <BiErrorCircle /> {errors.lga?.message}
            </span>
          )}
        </div>

        {/* SUB:=============== ADDRESS ================ */}
        <InputGroup
          type="text"
          id="address"
          name="address"
          autoComplete="on"
          placeholder="Enter your address for delivery"
          title="Address"
          error={errors.address}
          errormessage={errors.address?.message}
          {...register("address")}
        />

        {/* SUB:=============== IMPACT ================ */}
        <div className="impact_container" ref={impactRef}>
          <label htmlFor="impact" className="label">
            Impact project
            <div className="sublabel">
              We will donate 2% of your total purchase to a social impact
              project of your choice.{" "}
              <Link to="/features" className="social_link">
                Learn more
              </Link>
            </div>
          </label>
          <div className="wrap">
            <div onClick={() => setShowImpact((prev) => !prev)}>
              <SelectInput
                error={errors.impact}
                id="impact"
                value={
                  selectValue[1]
                    ? selectValue[1]
                    : "Select your impact project" ||
                      (info.impact && info.impact)
                }
                open={showImpact}
              />
            </div>
            {showImpact && (
              <OptionDropDown>
                <div className="option_items">
                  {impacts.map((impact) => (
                    <RadioBtn
                      name="impact"
                      value={impact.name}
                      title={impact.name}
                      key={impact.name}
                      {...register("impact")}
                    />
                  ))}
                </div>
              </OptionDropDown>
            )}
          </div>
          {errors.impact && (
            <span className="error_field">
              <BiErrorCircle /> {errors.impact.message}
            </span>
          )}
        </div>

        {/* SUB:=============== SUBMIT ================ */}
        <button type="submit" className="submit_btn">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default CheckoutInfo;
