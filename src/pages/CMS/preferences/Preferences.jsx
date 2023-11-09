import React, { useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Table, App, Modal } from "antd";
import "@asset/pages/cms/Sizes.scss";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { preferencesSchema } from "@schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cmsContext } from "@store/context";
import InputGroup from "@components/InputGroup";

TODO: "Don't forget to add loading state, loading to the table to the table when fetching api";

const Preferences = () => {
  // HDR: INITIALISER
  const [loading, setLoading] = useState(false);

  const {
    state: { preferences: data, products, searchValue },
    dispatch,
  } = cmsContext();

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
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      preference: "",
      stock: edit.item.stock,
      key: edit.item.key,
      id: edit.item.id,
    },
  });

  const navigate = useNavigate();
  const { message } = App.useApp();

  //
  //HDR: =====================ACTIONS HANDLER======================
  const clickHandler = () => {
    navigate("add new preference");
  };

  const deleteHandler = (record) => {
    dispatch({
      type: "DELETE_PREFERENCE",
      payload: record,
    });

    message.success({
      content:
        `${record.preference} deleted successfully, Remember to update products using the previous preference`.toUpperCase(),
      duration: 10,
    });
  };

  const valueToEdit = (value) => {
    reset({ ...value });
    setEdit({ item: { ...value }, show: true });
  };

  // NOTE: This will be in promise, and the data wil be sent back to the backend

  const updateEditHandler = (formData) => {
    dispatch({
      type: "EDIT_PREFERENCE",
      payload: formData,
    });

    message.success({
      content:
        `${edit.item.preference} edited successfully, Remember to update products using the previous preference`.toUpperCase(),
      duration: 10,
    });
    setEdit({ item: {}, show: false });
  };

  //HDR: =====================COLUMNS======================
  const columns = [
    {
      key: 1,
      title: "NAME",
      width: 250,
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return String(record.preference)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      render: (record) => {
        return record.preference;
      },
    },
    {
      key: 2,
      title: "STOCK",
      width: 400,
      render: (record) => {
        let preference = record.preference;
        let count = products.filter(
          (product) => product.preference === preference
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
        heading={`Preferences(${data?.length})`}
        subheading="Clothing preferences for all products"
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
        onCancel={() => setEdit((prev) => ({ ...prev, show: false }))}
        onOk={handleSubmit(updateEditHandler)}
      >
        <h3 className="edit_heading">Edit</h3>
        <div className="edit_container">
          <InputGroup
            type="text"
            name="preference"
            title="Prefernce Name :"
            id="preference"
            admin="cms"
            error={errors.preference}
            errormessage={errors.preference?.message}
            {...register("preference")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Preferences;
