import React, { useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Table, App, Modal } from "antd";
import "@asset/pages/cms/Sizes.scss";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { cmsContext } from "@store/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addSizeSchema } from "../../../schemas";
import InputGroup from "../../../components/InputGroup";

TODO: "Don't forget to add loading state, loading to the table to the table when fetching api";

const Sizes = () => {
  // HDR: INITIALISER

  const [loading, setLoading] = useState(false);

  const {
    state: { sizes: data, products, searchValue },
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
    resolver: zodResolver(addSizeSchema),
    defaultValues: {
      sizename: "",
      sizevalue: "",
      stock: edit.item.stock,
      key: edit.item.key,
      id: edit.item?.id,
    },
  });

  const navigate = useNavigate();
  const { message } = App.useApp();

  // HDR: ACTION HANDLER
  const clickHandler = () => {
    navigate("add new size");
  };

  const deleteHandler = (record) => {
    dispatch({
      type: "DELETE_SIZE",
      payload: record,
    });

    message.success({
      content:
        `${record.sizename} deleted successfully, Remember to update products using the previous size`.toUpperCase(),
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
      type: "EDIT_SIZE",
      payload: formData,
    });
    message.success({
      content:
        `${edit.item.sizename} edited successfully, Remember to update products using the previous size`.toUpperCase(),
      duration: 10,
    });
    setEdit({ item: {}, show: false });
  };

  //HDR: =====================COLUMNS======================
  const columns = [
    {
      key: 1,
      title: "SIZE NAME",
      width: 200,
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return (
          String(record.sizename).toLowerCase().includes(value.toLowerCase()) ||
          String(record.sizevalue).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (record) => {
        return record.sizename;
      },
    },
    { key: 2, title: "VALUE", dataIndex: "sizevalue", width: 10 },
    {
      key: 3,
      title: "STOCK",
      width: 10,
      render: (record) => {
        let stock = record.sizevalue;
        let count = products.filter((product) => product.size === stock).length;
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
              title="Confirm delete?"
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
        heading={`Sizes(${data.length})`}
        subheading="Clothing sizes for all products"
      >
        <CmsBtn name="add new" onClick={clickHandler} />
      </CmsHeader>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        loading={loading}
      />
      <Modal
        open={edit.show}
        okText="Save changes"
        width={550}
        onCancel={() => setEdit((prev) => ({ ...prev, show: false }))}
        onOk={handleSubmit(updateEditHandler)}
      >
        <h3 className="edit_heading">Edit</h3>
        <div className="edit_container">
          <InputGroup
            type="text"
            name="sizename"
            title="Size Name :"
            id="sizename"
            admin="cms"
            error={errors.sizename}
            errormessage={errors.sizename?.message}
            {...register("sizename")}
          />
          <InputGroup
            type="text"
            name="sizevalue"
            title="Size Value :"
            id="sizevalue"
            admin="cms"
            error={errors.sizevalue}
            errormessage={errors.sizevalue?.message}
            {...register("sizevalue")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Sizes;
