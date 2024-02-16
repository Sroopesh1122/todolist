import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login, resetUserState } from "../features/user/userSlice";
import { getUserData } from "../utils/config";
import React, { useEffect } from "react";
const LOgin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Required !"),
    password: Yup.string().required("Required !"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(login(values));
    },
  });
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const token = getUserData();
    // console.log(userData);
    if (token?.token || isSuccess) {
      navigate("/dashboard");
    } else {
      navigate("");
    }
    // return(()=>{
    //   dispatch(resetUserState())
    // })
  }, [isSuccess, isLoading, isError]);
  return (
    <div className="login-wrapper">
      <div className="login-inner-wrapper p-3">
        {isError ? <p className="error-info small">{message}</p> : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <h1 className="text-center login-title">Login</h1>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              tabIndex={1}
            />
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              tabIndex={3}
              value={formik.values.password}
              onChange={formik.handleChange("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="d-flex justify-content-center">
          {
            isLoading ? <svg class="spinner ms-2 mt-2" viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
          ></circle>
          </svg> : <button className="mt-2 submit btn btn-primary" type="submit">
              Login
            </button>
          }
          
            
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <Link to={"/signup"} className="link">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LOgin;
