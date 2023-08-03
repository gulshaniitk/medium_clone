import './Signin.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = (props) => {

    const navigate=useNavigate();
    const [errorSignIn,setErrorSignIn]=useState("");

    const formik=useFormik({
        initialValues:{
            email:"",password:""
        },
        onSubmit:(values,SubmitProps)=>{
            console.log(SubmitProps);
            let success=false;

            if(localStorage.getItem(values.email) && JSON.parse(localStorage.getItem(values.email)).password==values.password)
            {
                success=true;
            }

            if(success)
            {
               
                SubmitProps.resetForm();
                setErrorSignIn("");
                props.setUser(values.email);
                navigate('/');
            }
            else
            {
                setErrorSignIn("Email or Password is not correct!");
            }
        },
        validationSchema:Yup.object({
            email:Yup.string().email("Invalid email format").required("Required"),
            password:Yup.string().required("Password Cann't be empty"),
        })
    })


    useEffect(()=>{
        setErrorSignIn("");
    },[formik.values])

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='signin'>

            <div className='field'>
        <label for="email">Email</label>
          <input type="text" placeholder="Enter your Email" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}  />
          {formik.touched.email && formik.errors.email?<div className='error'>{formik.errors.email}</div>:null}
          </div>

<div className='field'>
          <label for="password">Password</label>
          <input type="text" placeholder="Enter Password" name="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}  />
          {formik.touched.password && formik.errors.password?<div className='error'>{formik.errors.password}</div>:null}

          </div>


        <button type="submit">SignIn</button>
        {errorSignIn?<div className='error'>{errorSignIn}</div>:null}
        </div>
      </form>
    </div>
  );
};

export default Signin;
