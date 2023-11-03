import React, { useMemo, useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Switch, Table, Modal, Tooltip, App } from "antd";
import "@asset/pages/cms/ProductsCms.scss";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { clothSizeToNum } from "@utils/helpers";
import { cmsContext } from "@store/context";
import { newProductSchema } from "@schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useClickOutiside from "@hooks/use-clickOutside.js";
import CmsSelectDropDown from "@components/CmsSelectDropDown";
import ColourRadioBtn from "@components/ColourRadioBtn.jsx";
import RadioBtn from "@components/RadioBtn.jsx";
import InputGroup from "@components/InputGroup";
import TextAreaGroup from "@components/TextAreaGroup";

const ProductsCms = () => {
  const swatchStyle = {
    display: "inline-block",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  };
  // HDR:=====================INITIALISER======================

  // SUB: Cms context
  const {
    state: {
      products: data,
      preferences,
      colours,
      sizes,
      categories,
      searchValue,
    },
    dispatch,
  } = cmsContext();

  // HINT; What to do, add Description, to also be updated and remember schema as well

  // TODO: "Don't forget to add loading state, loading to the table when fetching api"
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState({
    item: {},
    show: false,
  });

  const navigate = useNavigate();

  const { message } = App.useApp();

  // SUB: Useform and zodResolver
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      product: "",
      stock: null,
      colour: "",
      category: "",
      preference: "",
      size: "",
      description: "",
      price: null,
      key: edit.item.key,
      id: edit.item?.id,
    },
  });

  // console.log(edit);

  //HDR: ================= EDIT SECTION HANDLER ===========================

  // SUB: TO fetch all the options, so selection can be made from the dropdown
  const allPreferences = preferences.map((item) => ({
    value: item.preference,
    label: item.preference,
  }));
  const allSizes = sizes.map((item) => ({
    value: item.sizevalue,
    label: item.sizevalue,
    key: item.key,
  }));
  const allCategory = categories.map((item) => ({
    value: item.category,
    label: item.category,
  }));
  const allColours = colours.map((item) => ({
    value: `${item.colour} : ${item.hex}`,
    val: item.colour,
    label: item.colour,
  }));

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

  // HDR:=====================ACTIONS HANDLER======================
  const navigateHandler = () => {
    navigate("add new product");
  };

  const valueToEdit = (value) => {
    reset({ ...value });
    setEdit({ item: { ...value }, show: true });

    console.log(value);
  };

  // NOTE: This will be in promise, and the data wil be sent back to the backend

  const updateEditHandler = (formData) => {
    const data = {
      show: edit.item.show,
      ...formData,
    };

    console.log(formData);

    dispatch({
      type: "EDIT_PRODUCT",
      payload: data,
    });
    message.success({
      content: `${edit.item.product} edited successfully`.toUpperCase(),
      duration: 6,
    });
    setEdit({ item: {}, show: false });
    // setLoading(false);
  };

  // NOTE: This will be in promise, and the data wil be sent back to the backend

  // SUB: Delete Handler
  const deleteHandler = (record) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: record,
    });

    message.success({
      content: `${record.product} deleted successfully`.toUpperCase(),
      duration: 6,
    });
  };

  // NOTE: This will be in promise, and the data wil be sent back to the backend
  const changeShowHandler = (record) => {
    dispatch({
      type: "EDIT_SHOW",
      payload: record,
    });
  };

  // SUB: Handling selection dropdown

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

  // HDR: COLUMNS
  const columns = [
    // SUB: product
    {
      key: 1,
      title: "PRODUCT NAME",
      filteredValue: [searchValue],
      fixed: "left",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      onFilter: (value, record) => {
        //  CMT: To filter the entire columns
        let val = value.toLowerCase();
        return (
          String(record.product).toLowerCase().includes(val) ||
          String(record.preference).toLowerCase().includes(val) ||
          String(record.category).toLowerCase().includes(val) ||
          String(record.size).toLowerCase().includes(val) ||
          String(record.colour).toLowerCase().includes(val) ||
          String(record.price).toLowerCase().includes(val) ||
          String(record.stock).toLowerCase().includes(val)
        );
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record.product}>
          {record.product}
        </Tooltip>
      ),
    },
    // SUB: preference
    {
      key: 2,
      title: "PREFERENCE",
      dataIndex: "preference",
      align: "center",
      width: 160,
    },
    // SUB: category
    {
      key: 3,
      title: "CATEGORY",
      dataIndex: "category",
      align: "center",
      width: 123,
    },
    // SUB: size
    {
      key: 4,
      title: "SIZE",
      dataIndex: "size",
      align: "center",
      width: 80,
      sorter: (a, b) => clothSizeToNum(a.size) - clothSizeToNum(b.size),
    },
    // SUB: colours
    {
      key: 5,
      title: "COLOUR",
      align: "center",
      width: 150,
      render: (record) => {
        let splitted = record.colour.split(":");
        let name = splitted[0];
        let value = splitted[1];
        return (
          <div className="colour center-align ">
            <span style={{ color: "#A0ABBB" }}>{name}</span>
            <span style={{ ...swatchStyle, background: value }} />
          </div>
        );
      },
    },
    // SUB: price
    {
      key: 6,
      title: "PRICE",
      align: "center",
      width: 120,
      sorter: (a, b) => a.price - b.price,

      render: (record) => {
        return <span style={{ color: "#A0ABBB" }}>₦{record.price}</span>;
      },
    },
    // SUB: description
    {
      key: 7,
      title: "DESCRIPTION",
      dataIndex: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    // SUB: stock
    {
      key: 8,
      title: "STOCK",
      dataIndex: "stock",
      align: "center",
      width: 80,
      render: (record) => {
        return <span style={{ color: "#A0ABBB" }}>{record}</span>;
      },
      sorter: (a, b) => a.stock - b.stock,
    },
    // SUB: show
    {
      key: 9,
      title: "SHOW",
      align: "center",
      width: 90,
      sorter: (a, b) => a.show - b.show,
      render: (record) => {
        // NOTE: Changing the show status
        return (
          <Switch
            checked={record.show}
            onChange={() => changeShowHandler(record)}
          />
        );
      },
    },
    // SUB: actions
    {
      key: "action",
      width: 120,
      fixed: "right",
      render: (record) => {
        return (
          <div
            className="icons"
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "flex-end",
            }}
          >
            <MdOutlineModeEdit
              className="icon"
              style={{ color: "#323A46", fontSize: 23, cursor: "pointer" }}
              onClick={() => valueToEdit(record)}
            />

            <Popconfirm
              title="Sure to delete?"
              okText="Yes"
              onConfirm={() => deleteHandler(record)}
            >
              <MdDeleteOutline
                className="icon delete_icon"
                style={{ color: "#991b1b", fontSize: 23, cursor: "pointer" }}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // HDR=================== JSX=================

  return (
    <div>
      <CmsHeader
        heading={`Products(${data.length})`}
        subheading="All Products for available"
      >
        <CmsBtn name="add new" onClick={navigateHandler} />
      </CmsHeader>

      {/* HDR: Table */}
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 400, x: 1280 }}
        pagination={{ position: ["bottomCenter"] }}
        loading={loading}
      />

      {/* HDR: EDITING MODAL */}
      <Modal
        open={edit.show}
        width={800}
        okText="Save changes"
        onOk={handleSubmit(updateEditHandler)}
        onCancel={() => setEdit({ item: {}, show: false })}
      >
        <h3 className="edit_heading">Edit</h3>

        {/* HDR: Product */}
        <div className="edit_container">
          <div className="edit_item">
            <InputGroup
              type="text"
              autoComplete="on"
              title="Product Name :"
              id="product"
              admin="cms"
              name="product"
              error={errors.product}
              errormessage={errors.product?.message}
              {...register("product")}
            />
          </div>

          {/* HDR: Description */}
          <div className="edit_item">
            <TextAreaGroup
              type="text"
              autoComplete="on"
              title="Description :"
              id="description"
              admin="cms"
              name="description"
              error={errors.description}
              errormessage={errors.description?.message}
              {...register("description")}
            />
          </div>

          {/* SUB: Select element to choose from  */}

          {/* HDR: Prefernces */}
          <div className="select_dropdown">
            <p className="cms_label">Preference :</p>

            <div ref={prefRef}>
              <CmsSelectDropDown
                onclick={() => setShowPreference(!showPreference)}
                open={showPreference}
                mode="light"
                selected={
                  selectValue[2] ? selectValue[2] : edit?.item?.preference
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
            <p className="cms_label">Category :</p>

            <div ref={catRef}>
              <CmsSelectDropDown
                onclick={() => setShowCategory(!showCategory)}
                open={showCategory}
                mode="light"
                selected={
                  selectValue[1] ? selectValue[1] : edit?.item?.category
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
            <p className="cms_label">Sizes :</p>

            <div ref={sizeRef}>
              <CmsSelectDropDown
                onclick={() => setShowSizes(!showSizes)}
                open={showSizes}
                mode="light"
                selected={selectValue[3] ? selectValue[3] : edit?.item?.size}
                error={errors.size}
              >
                <div className="list_options">
                  {allSizes.map((s) => (
                    <RadioBtn
                      key={s.key}
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
            <p className="cms_label">Colour :</p>

            <div ref={colRef}>
              <CmsSelectDropDown
                onclick={() => setShowColour(!showColour)}
                open={showColour}
                mode="light"
                selected={
                  selectValue[0]
                    ? selectValue[0].split(":")[0]
                    : edit?.item?.colour?.split(":")[0]
                }
                error={errors.colour}
              >
                <div className="option_cont">
                  {allColours.map((c) => (
                    <ColourRadioBtn
                      key={c.label}
                      colour={c.value.split(":")[1]}
                      value={c.value}
                      name="colour"
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
            type="text"
            autoComplete="on"
            title="Price :"
            id="price"
            admin="cms"
            name="price"
            error={errors.price}
            errormessage={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
          />

          {/* HDR: Stock */}
          <InputGroup
            type="text"
            autoComplete="on"
            title="Stock :"
            id="stock"
            admin="cms"
            name="stock"
            error={errors.stock}
            errormessage={errors.stock?.message}
            {...register("stock", { valueAsNumber: true })}
          />
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(ProductsCms);

TODO: "Remember to add scroll: {{ y: 500 }} to table, to make the header fixed";
