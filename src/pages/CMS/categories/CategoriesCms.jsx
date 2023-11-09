import React, { useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Table, App, Modal } from "antd";
import "@asset/pages/cms/Sizes.scss";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { categorySchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cmsContext } from "../../../store/context";
import InputGroup from "@components/InputGroup";

TODO: "Don't forget to add loading state, loading to the table to the table when fetching api";

const CategoriesCms = () => {
  // HDR: INITIALISER
  const [loading, setLoading] = useState(false);

  const {
    state: { categories: data, products, searchValue },
    dispatch,
  } = cmsContext();

  // SUB: State for the item to edit
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
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: "",
      stock: edit.item.stock,
      key: edit.item.key,
      id: edit.item.id,
    },
  });

  const navigate = useNavigate();
  const { message } = App.useApp();

  //
  // HDR:=====================ACTIONS HANDLER======================
  const clickHandler = () => {
    navigate("add new category");
  };

  const deleteHandler = (record) => {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: record,
    });

    message.success({
      content:
        `${record.category} deleted successfully, Remember to update products using the previous category`.toUpperCase(),
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
      type: "EDIT_CATEGORY",
      payload: formData,
    });
    setEdit((prev) => ({ ...prev, show: false }));
    message.success({
      content:
        `${edit.item.category} edited successfully, Remember to update products using the previous category`.toUpperCase(),
      duration: 10,
    });
  };

  //HDR: =====================COLUMNS======================
  const columns = [
    {
      key: 1,
      title: "CATEGORY NAME",
      width: 250,
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return String(record.category)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      render: (record) => {
        return record.category;
      },
    },
    {
      key: 2,
      title: "STOCK",
      width: 400,
      render: (record) => {
        let category = record.category;
        let count = products.filter(
          (product) => product.category === category
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
        heading={`Categories(${data.length})`}
        subheading="Clothing categories for all products"
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
            name="category"
            title="Category Name :"
            id="category"
            admin="cms"
            error={errors.category}
            errormessage={errors.category?.message}
            {...register("category")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesCms;
