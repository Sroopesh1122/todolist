import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getProfileData,
  profileUpdate,
  resetUserState,
} from "../features/user/userSlice";

const Profile = () => {
  const profileSchema = Yup.object().shape({
    name: Yup.string().required("Required !"),
    mobile: Yup.number().required("Required !"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(profileUpdate(values));
    },
  });

  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const { isSuccess, isError, isLoading ,message } = useSelector((state) => state.user);
  const profileData = useSelector((state) => state?.user?.user);
  useEffect(() => {
    dispatch(getProfileData());
    formik.values.name = profileData?.name;
    formik.values.mobile = profileData?.mobile;
    return () => {
      dispatch(resetUserState());
    };
  }, []);

  return (
    <div className="profile-wrapper">
      {/* {isSuccess || (
        <div className="alert alert-success" role="alert">
          Profile Updated successfully !
        </div>
      )} */}
      {
        isError ? <p>{message}</p>:null
      }

      {isLoading ? (    
        <svg class="spinner ms-2" viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="7"
          ></circle>
        </svg>
      ) : null}
      <div className="profile-inner-wrapper p-3">
        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-2">
            <h1 className="text-start login-title">Profile</h1>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">User Id</label>
            {isLoading ? (
              <Skeleton className="form-control" />
            ) : (
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="User Id"
                tabIndex={3}
                value={profileData?._id}
                readOnly
                disabled
              />
            )}
          </div>
          <div className="form-group">
            <label for="exampleInputEmail3">Name</label>
            {isLoading ? (
              <Skeleton className="form-control" />
            ) : (
              <input
                type="text"
                className="form-control"
                name="name"
                id="exampleInputEmail3"
                placeholder="Enter Name"
                tabIndex={3}
                value={formik.values.name || profileData?.name}
                onChange={formik.handleChange("name")}
                required
              />
            )}
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            {isLoading ? (
              <Skeleton className="form-control" />
            ) : (
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                tabIndex={1}
                value={profileData?.email}
                readOnly
                disabled
              />
            )}
          </div>
          <div className="form-group">
            <label for="exampleInputEmail4">Mobile</label>
            {isLoading ? (
              <Skeleton className="form-control" />
            ) : (
              <input
                type="tel"
                className="form-control"
                id="exampleInputEmail4"
                aria-describedby="emailHelp"
                placeholder="Enter Mobile"
                value={formik.values.mobile || profileData?.mobile}
                name="mobile"
                onChange={formik.handleChange("mobile")}
                tabIndex={1}
                required
              />
            )}

            {formik.touched.mobile && formik.errors.mobile ? (
              <p>{formik.errors.mobile}</p>
            ) : null}
          </div>

          <div className="d-flex justify-content-center">
            {
              isLoading ? <button disabled className="mt-2 submit btn ">
              Save Changes
            </button>: <button className="mt-2 submit btn btn-primary">
              Save Changes
            </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
