import React, { useEffect } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { getUserData } from '../utils/config';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resetUserState } from '../features/user/userSlice';
import Alert from '../Components/Alert';

const Signup = () => {
  const navigate = useNavigate();
  const loacation = useLocation();
  const dispatch = useDispatch();
  const signupSchema = Yup.object().shape({
    name:Yup.string().required("Required !").min(3,"Too short!"),
    email: Yup.string().email("Invalid email!").required("Required !"),
    mobile:Yup.number().required("Required!"),
    password: Yup.string().required("Required !").min(4,"Too short !"),
  });
  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      mobile:"",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit:async (values) => {
      // alert(JSON.stringify(values, null, 2));
      await dispatch(createUser(values))  
    },
  });
  const {isLoading,isError,message,isSuccess}=useSelector((state)=>state.user)

  useEffect(()=>{
    if(isSuccess)
    {
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetUserState())
        navigate("/")
      },2000)
    }
 
  },[isSuccess])

  useEffect(()=>{
    const token = getUserData()?.token;
    if (!token) {
      navigate("");
    } else {
      navigate("/dashboard");
    }
    return(()=>{
      dispatch(resetUserState())
    })
  },[])

  return (
    <div className="signup-wrapper">
    {
      isSuccess ? <Alert message={"User created Successfully !!"} type={"success"}/>:null
    }
    {
      isError ? <Alert message={"Something went wrong"}  type={"danger"}/> :null
     }
      <div className="signup-inner-wrapper p-3" >
      {
        isError ? <p className='error-info ms-2 mt-2 small'>{message}</p>:null
      }
        <form className='d-flex flex-column gap-3' onSubmit={formik.handleSubmit}>
          <div className='mb-2'>
             <h1 className='text-center login-title'>SignUp</h1>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail3">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail3"
              placeholder="Enter Name"
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange('name')}
             tabIndex={3}
             required
            />
            {
              formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p>:null
            }
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange('email')}
             tabIndex={1}
             required
            />
            {
              formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p>:null
            }
          </div>
          <div className="form-group">
            <label for="exampleInputEmail4">Mobile</label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputEmail4"
              aria-describedby="emailHelp"
              placeholder="Enter Mobile"
             tabIndex={1}
             name='mobile'
              value={formik.values.mobile}
              onChange={formik.handleChange('mobile')}
             required
            />
            {
              formik.touched.mobile && formik.errors.mobile ? <p>{formik.errors.mobile}</p>:null
            }
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              tabIndex={3}
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              required
            />
            {
              formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p>:null
            }
          </div>
          <div className='d-flex justify-content-center'>
          {
            isLoading ?<svg class="spinner ms-2 mt-2" viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
          ></circle>
          </svg> :<button  className="mt-2 submit btn btn-primary" type='submit'>
            Create Account
          </button>
          }
          
          </div>
          <div className='mt-3 d-flex justify-content-end'>
              <Link to={"/"} className='link'>Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
