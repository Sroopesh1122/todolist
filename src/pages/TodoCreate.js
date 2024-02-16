import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getList } from "../features/todoList/todoSlice";
import Skeleton from "react-loading-skeleton";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const TodoCreate = () => {
  const source = axios.CancelToken.source();
  const defaultList = [];
  for (let i = 0; i < 10; i++) {
    defaultList.push({
      val: i,
    });
  }
  const defaultList2 = defaultList.map((val, i) => {
    return (
      <div key={i} className=" col-12 col-md-6 col-xl-4 ">
        <Skeleton className="list-wrapper p-4 text-wrap"></Skeleton>
      </div>
    );
  });
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, list, message } = useSelector(
    (state) => state.todo
  );
  const createdState = useSelector((state) => state.todo.create);
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
      const cancelToken = axios.CancelToken.source().token;
      // alert(JSON.stringify(values, null, 2));
      await dispatch(addTodo(values));
      await dispatch(getList(cancelToken));
      formik.resetForm();
    },
  });
  useEffect(() => {
    const cancelToken = source.token;
    dispatch(getList(cancelToken));
    setTimeout(() => {
      source.cancel("Something Went Wrong");
    }, 1000 * 20);
  }, []);

  const dataList = list?.map((val, i) => {
    return (
      <div key={i} className=" col-12 col-md-6 col-xl-4 ">
        <div className="list-wrapper p-4 text-wrap">
          <div className="todo-title">{val.title}</div>
          <div className="todo-desc text-wrap"><p className="text-wrap">{val.description}</p></div>
        </div>
      </div>
    );
  });
  return (
    <div>
      {isError ? <p className="error-info">{message?.message}</p> : null}
      {
        createdState.isError ? <p className="error-info">{createdState?.message?.message}</p>:null
      }
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
          {createdState?.isLoading ? (
            <svg class="spinner ms-2 mt-2" viewBox="0 0 50 50">
              <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="3"
              ></circle>
            </svg>
          ) : (
            <button className="submit mt-3 btn " type="submit">
              Add
            </button>
          )}
          
        </form>
        <div className="d-flex flex-column gap-3 mt-5">
          <div>
            <h1 className="mb-3">Lists</h1>
            {isLoading ? <h4>Loading.....</h4> : null}
          </div>
          <div className="list-show row g-3 py-3 px-2">
            {isLoading ? defaultList2 : dataList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCreate;
