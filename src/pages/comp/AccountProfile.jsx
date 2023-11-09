import React, { useEffect, useMemo, useState } from "react";

import "@asset/pages/AccountProfile.scss";

import InputGroup from "@components/InputGroup";
import { BsSearch } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import useClickOutiside from "@hooks/use-clickOutside.js";
import RadioBtn from "@components/RadioBtn.jsx";
import OptionDropDown from "../../components/OptionDropDown";
import SelectInput from "@components/SelectInput.jsx";

import states from "@data/states-data.js";

import { AiOutlinePlus } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountUpdateSchema } from "../../schemas";
import { authContext } from "../../store/context";

const AccountProfile = () => {
  // HDR: INITIALISER
  const [searchValue, setSearchValue] = useState("");
  const [searchLgaValue, setSearchLgaValue] = useState("");
  const [lgas, setLgas] = useState([]);

  const { user } = authContext();

  //   console.log(user);

  const {
    visible: showOptions,
    setVisible: setShowOptions,
    ref: dropdownref,
  } = useClickOutiside(false);
  const {
    visible: showLga,
    setVisible: setShowLga,
    ref: Lgaref,
  } = useClickOutiside(false);

  //  HDR: ACTIONS HANDLER
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

  //   HDR: FORM SUBMISION HANDLER
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm({
    resolver: zodResolver(accountUpdateSchema),
    defaultValues: {
      email: `${user.email ? user.email : ""}`,
      first_name: `${user?.["first_name"] ? user?.["first_name"] : ""}`,
      last_name: `${user?.["last_name"] ? user?.["last_name"] : ""}`,
      phone_number: `${user.phone_number ? user.phone_number : ""}`,
      address: `${user.address ? user.address : ""}`,
      state: `${user.state ? user.state : ""}`,
      lga: `${user.lga ? user.lga : ""}`,
    },
  });

  const submitHandler = (data) => {
    console.log(data);
  };

  const selectValue = watch(["state", "lga"]);

  //  SUB: to close the dropdown
  useMemo(() => {
    if (selectValue[0]) {
      setShowOptions(false);
    }

    if (selectValue[1]) {
      setShowLga(false);
    }
  }, [selectValue[0], selectValue[1]]);

  const state = getValues("state");

  // SUB: to set the lgas list
  useMemo(() => {
    const lga = states.filter((s) => s.name === state);
    setLgas(lga[0]?.lgas);
  }, [state]);

  // HDR: JSX
  return (
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

      {/* =============== PHONE NUMBER ================ */}
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

      {/* =============== STATE ================ */}
      <div className="select_container" ref={dropdownref}>
        <label htmlFor="state" className="label">
          State
        </label>
        <div onClick={() => setShowOptions((prev) => !prev)}>
          <SelectInput
            error={errors.state}
            id="state"
            value={
              selectValue?.[0]
                ? selectValue?.[0]
                : "Select your state" || (user?.state && user?.state)
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
                        .startsWith(searchValue?.toLowerCase())
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
        {errors?.state && (
          <span className="error_field">
            <BiErrorCircle /> {errors.state?.message}
          </span>
        )}
      </div>
      {/* =============== LGA ================ */}
      <div className="select_container" ref={Lgaref}>
        <label htmlFor="state" className="label">
          LGA
        </label>
        <div onClick={() => setShowLga((prev) => !prev)}>
          <SelectInput
            error={errors.lga}
            id="state"
            value={
              selectValue?.[1]
                ? selectValue?.[1]
                : "Select LGA" || (user?.lga && user?.lga)
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

      {/* =============== ADDRESS ================ */}
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

      <div className="new_address">
        <button type="button" className="new_address-btn">
          <AiOutlinePlus />
          Add new address
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubmit(submitHandler)}
        className="save_btn"
      >
        Save changes
      </button>

      <button
        type="button"
        // onClick={handleSubmit(submitHandler)}
        className="delete_btn"
      >
        Delete account
      </button>
    </>
  );
};

export default AccountProfile;
