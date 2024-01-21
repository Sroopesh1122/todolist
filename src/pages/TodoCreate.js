import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getList } from "../features/todoList/todoSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
const TodoCreate = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, list } = useSelector(
    (state) => state.todo
  );
  const addSchema = Yup.object().shape({
    title: Yup.string().required("Required !"),
    description: Yup.string().required("Required !"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: addSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      await dispatch(addTodo(values));
      await dispatch(getList());
      formik.resetForm();
    },
  });
  useEffect(() => {
    dispatch(getList());
  }, []);
  return (
    <div>
      <div className="theme">
        <h1 className="dash-title mb-0">TODO List</h1>
      </div>
      <div className="dash-inner-wrapper d-flex flex-column justify-content-between">
        <form className="create-list" onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-column gap-2">
            <div>
              <label for="exampleInputEmail1">Title</label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Title?"
                tabIndex={1}
                required
              />
            </div>
            <div>
              <label for="exampleInputEmail2">Description </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail2"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                placeholder="What do you like to do ?"
                tabIndex={1}
                required
              />
            </div>
          </div>
          <button className="submit mt-3 btn " type="submit">
            Add
          </button>
        </form>
        <div className="d-flex flex-column gap-3 mt-5">
          <div>
            <h1 className="mb-3">Lists</h1>
            {isLoading ? <h4>Loading.....</h4> : null}
          </div>
          <div className="list-show row g-3 py-3 px-2">
            {list?.map((val, i) => {
              return (
                <div key={i} className=" col-12 col-md-6 col-xl-4 ">
                  <div className="list-wrapper p-4 text-wrap">
                    <div className="todo-title">{val.title}</div>
                    <div className="todo-desc">{val.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCreate;
