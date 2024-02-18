import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addTodo,getList, resetTodoState } from "../features/todoList/todoSlice";
import Skeleton from "react-loading-skeleton";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TododCard from "../Components/TododCard";
import {motion} from 'framer-motion'
import Snackbar from '@mui/joy/Snackbar';
import Alert from "../Components/Alert";
const TodoCreate = () => {
  const source = axios.CancelToken.source();
  let cancelToken;
  const defaultList = [];
  for (let i = 0; i < 5; i++) {
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
  const { isError, isLoading, list, message } = useSelector(
    (state) => state.todo
  );
  let filterDataList=list;
  const createdState = useSelector((state) => state.todo.create);
  const deleteState=useSelector((state)=>state.todo.delete);
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
      const res=await dispatch(addTodo(values));
      if(res?.meta?.requestStatus === "fulfilled"){
        await dispatch(addItem());
        formik.resetForm();
      }
      
    },
  });
   const [open ,setOpen]=useState(false)
  const handleClose = () => {
    setOpen(!open)
  };
  useEffect(() => {
    cancelToken = source.token;
    dispatch(resetTodoState())
    dispatch(getList(cancelToken));
    setTimeout(() => {
      source.cancel("Something Went Wrong");
    }, 1000 * 20);
  }, []);
  const dataList = filterDataList?.map((val, i) => {
      return(
      <TododCard data={val}/>
      )
    
  });
  return (
    <div>
      {isError ? <p className="error-info">{message?.message}</p> : null}
      {createdState.isError ? (
        <p className="error-info">{createdState?.message?.message}</p>
      ) : null}
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
          <div key={1}>
            <h1 className="mb-3">Lists</h1>
            {isLoading ? <h4 >Loading.....</h4> : null}
          </div>
          <motion.div key={2} layout className="list-show row g-3 py-3 px-2">
            {isLoading ? defaultList2 : dataList}
          </motion.div>
        </div>
      </div>
      {
        (deleteState.isSuccess) ? <Alert message="Deleted Successfully" type="success"/>:null
      }
      {
        (deleteState.isError)? <Alert message="Something went wrong" type="danger"/> :null
      }
      {
        (createdState.isSuccess) ? <Alert message="Added Successfully" type="success"/>:null
      }
      {
        (createdState.isError)? <Alert message="Something went wrong" type="danger"/> :null
      }
    </div>
  );
};

export default TodoCreate;
