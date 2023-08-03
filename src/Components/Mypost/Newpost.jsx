import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import './post.css'

const Newpost=(props)=>{

    
const navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            title:"",url:"",content:"",time:"",topic:"",likes:0,views:0,comments:[]
        },
        onSubmit:(values,SubmitProps)=>{

           values.time=new Date().toISOString().slice(0,10);;
           props.setMypost([...props.mypost,values]);
           props.setCreate(false);
           

        },
        validationSchema:Yup.object({
            topic:Yup.string().required("Required"),
            title:Yup.string().required("Required"),
            url:Yup.string().required("Required"),
            content:Yup.string().required("Required"),
            
        })
    })



    return (
        <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='newpost'>

        
          <label for="topic">Topic</label>
          <input type="text" placeholder="Enter the topic" name="topic" onBlur={formik.handleBlur} value={formik.values.topic} onChange={formik.handleChange} />
            {formik.touched.topic && formik.errors.topic?<div className='error'>{formik.errors.topic}</div>:null}

          <label for="title">Title</label>
          <input type="text" placeholder="Enter the Title" name="title" onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange}  />
          {formik.touched.title && formik.errors.title?<div className='error'>{formik.errors.title}</div>:null}

          <label for="url">Image</label>
          <input type="text" placeholder="Enter the image url" name="url" onBlur={formik.handleBlur} value={formik.values.url} onChange={formik.handleChange}  />
          {formik.touched.url && formik.errors.url?<div className='error'>{formik.errors.url}</div>:null}

          <label for="content">Content</label>
          <textarea rows="10" cols="100" type="text" placeholder="Enter the content" name="content" onBlur={formik.handleBlur} value={formik.values.content} onChange={formik.handleChange}  />
          {formik.touched.content && formik.errors.content?<div className='error'>{formik.errors.content}</div>:null}

          <button type="submit">Create</button>
          </div>
        </form>
      </div>
    )

}
export default Newpost;