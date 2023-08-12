import './Signin.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = (props) => {

    const navigate=useNavigate();
    const [errorSignIn,setErrorSignIn]=useState("");

    useEffect(()=>{

      if(props.authorization!="")
      {
        navigate('/');
      }

    },[props.authorization])

    const formik=useFormik({
        initialValues:{
            email:"",password:""
        },
        onSubmit:(values,SubmitProps)=>{

          fetch("http://127.0.0.1:3003/login", { method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          
          body: JSON.stringify({
              user: { email: values.email, password: values.password }
            })
          })
.then(response => {
  const authorizationHeader = response.headers.get('Authorization');
   localStorage.Authorization=authorizationHeader;
   props.setAuthorization(authorizationHeader);
  return response.json()} )
.then(data => {
  console.log(data);
  SubmitProps.resetForm();
  
  setErrorSignIn("");
  
  
  
  
})
.catch(error => {
  console.error('Error:', error);
  setErrorSignIn("Email or Password is not correct!");
});

           
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
        <label htmlFor="email">Email</label>
          <input type="text" placeholder="Enter your Email" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}  />
          {formik.touched.email && formik.errors.email?<div className='error'>{formik.errors.email}</div>:null}
          </div>

<div className='field'>
          <label htmlFor="password">Password</label>
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
