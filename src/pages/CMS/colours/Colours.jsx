import React, { useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Table, App, Modal } from "antd";
import "@asset/pages/cms/Colours.scss";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { cmsContext } from "@store/context";
import InputGroup from "@components/InputGroup";
import { newColourSchema } from "@schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const swatchStyle = {
  display: "inline-block",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
};

TODO: "Don't forget to add loading state, loading to the table to the table when fetching api";

const Colours = () => {
  // HDR: INITIALISER

  const [edit, setEdit] = useState({
    item: {},
    show: false,
  });

  // SUB: Useform and zodResolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newColourSchema),
    defaultValues: {
      colour: "",
      hex: "",
      stock: edit.item.stock,
      key: edit.item.key,
      id: edit.item.id,
    },
  });

  // SUB: Cms context
  const {
    state: { colours: data, products, searchValue },
    dispatch,
  } = cmsContext();

  const navigate = useNavigate();
  const { message } = App.useApp();

  // HDR:=====================ACTIONS HANDLER======================
  const clickHandler = () => {
    navigate("add new colour");
  };

  const deleteHandler = (record) => {
    dispatch({
      type: "DELETE_COLOUR",
      payload: record,
    });

    message.success({
      content:
        `${record.colour} deleted successfully, Remember to update products using the previous colour`.toUpperCase(),
      duration: 6,
    });
  };

  const valueToEdit = (value) => {
    reset({ ...value });
    setEdit({ item: { ...value }, show: true });
  };

  // NOTE: This will be in promise, and the data wil be sent back to the backend

  const updateEditHandler = (formData) => {
    dispatch({
      type: "EDIT_COLOUR",
      payload: formData,
    });
    message.success({
      content:
        `${edit.item.colour} edited successfully, Remember to update products using the previous colour`.toUpperCase(),
      duration: 6,
    });
    setEdit({ item: {}, show: false });
  };

  //HDR: =====================COLUMNS======================
  const columns = [
    {
      key: 1,
      title: "COLOUR NAME",
      width: 250,
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return (
          String(record.colour).toLowerCase().includes(value.toLowerCase()) ||
          String(record.hex).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (record) => {
        return record.colour;
      },
    },
    {
      key: 2,
      title: "HEXCODE & SWATCH",
      width: 300,
      render: (record) => {
        return (
          <div className="colour">
            {record.hex}

            <span style={{ ...swatchStyle, background: record.hex }}></span>
          </div>
        );
      },
    },
    {
      key: 2,
      title: "STOCK",
      width: 400,
      render: (record) => {
        let colour = record.colour;
        let count = products.filter((product) =>
          product.colour.includes(colour)
        ).length;
        return count;
      },
    },

    {
      key: "action",
      align: "right",
      render: (record) => {
        return (
          <div className="icons">
            <MdOutlineModeEdit
              className="icon"
              onClick={() => valueToEdit(record)}
            />

            <Popconfirm
              title="Sure to delete?"
              okText="Yes"
              onConfirm={() => deleteHandler(record)}
            >
              <MdDeleteOutline className="icon delete_icon" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // HDR: JSX

  return (
    <div>
      <CmsHeader
        heading={`Colours(${data.length})`}
        subheading="Clothing colours for all products"
      >
        <CmsBtn name="add new" onClick={clickHandler} />
      </CmsHeader>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
      />

      <Modal
        open={edit.show}
        okText="Save changes"
        width={600}
        onCancel={() => setEdit((prev) => ({ ...prev, show: false }))}
        onOk={handleSubmit(updateEditHandler)}
      >
        <h3 className="edit_heading">Edit</h3>
        <div className="edit_container">
          <InputGroup
            type="text"
            name="colour"
            title="Colour Name :"
            id="colour"
            admin="cms"
            error={errors.colour}
            errormessage={errors.colour?.message}
            {...register("colour")}
          />
          <InputGroup
            type="text"
            name="hex"
            title="Colour Value :"
            id="hex"
            admin="cms"
            error={errors.hex}
            errormessage={errors.hex?.message}
            {...register("hex")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Colours;
