import '../Signin/Signin.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup=(props)=>{

    const navigate=useNavigate();
const [errorSignUp,setErrorSignUp]=useState("");

    const formik=useFormik({
        initialValues:{
            name:"",email:"",password:"",password_repeat:""
        },
        onSubmit:(values,SubmitProps)=>{

           
            let success=true;
            if(localStorage.getItem(values.email))
            success=false;
            console.log(success);
            if(success)
            {
                
                SubmitProps.resetForm();
                setErrorSignUp("");
                localStorage[values.email]=JSON.stringify(values);
                props.setUser(values.email);
                navigate('/home');
            }
            else
            {
                setErrorSignUp("Email is already in use! Please Signin!");
            }
            
        },
        validationSchema:Yup.object({
            name:Yup.string().required("Required"),
            email:Yup.string().email("Invalid email format").required("Required"),
            password:Yup.string().required("Password Cann't be empty"),
            password_repeat:Yup.string().required("Required").oneOf([Yup.ref('password')], 'Your passwords do not match.')
        })
    })


    useEffect(()=>{
        setErrorSignUp("");
    },[formik.values])

    return (
        <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='signin'>

        
        <div className='field'>
          <label for="name">Name</label>
          <input type="text" placeholder="Enter your Name" name="name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
            {formik.touched.name && formik.errors.name?<div className='error'>{formik.errors.name}</div>:null}
            </div>

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

          <div className='field'>
          <label for="password_repeat">Repeat Password</label>
          <input type="text" placeholder="Repeat Password" name="password_repeat" onBlur={formik.handleBlur} value={formik.values.password_repeat} onChange={formik.handleChange}  />
          {formik.touched.password_repeat && formik.errors.password_repeat?<div className='error'>{formik.errors.password_repeat}</div>:null}
          </div>

          <button type="submit">SignUp</button>
          {errorSignUp?<div className='error'>{errorSignUp}</div>:null}
          </div>
        </form>
      </div>
    )

}

export default Signup;