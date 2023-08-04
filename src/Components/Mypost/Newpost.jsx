import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import './post.css'

const Newpost=(props)=>{


  

const navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            title:"",author:"",text:"",topic:"",image:''
        },
        onSubmit:(values,SubmitProps)=>{
 
          const imageInput = document.getElementById('image_input');
          const file = imageInput.files[0];
          // console.log(file);
          //  props.setMypost([...props.mypost,values]);
          //  props.setCreate(false);
          const formData = new FormData();
          formData.append('image', file);
          formData.append('title',values.title);
          formData.append('author',values.author);
          formData.append('text',values.text);
          formData.append('topic',values.topic);
          console.log(values,localStorage.Authorization);
          fetch("http://127.0.0.1:3003/create", { method: "POST",
          headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization':localStorage.Authorization
            },
          body : formData
          // body: JSON.stringify({
          //   title:values.title,
          //   author:values.author,
          //   text:values.author,
          //   image:file,
          //   topic:values.topic
          // })
          })
.then(response => {
  return response.json()} )
.then(data => {
  console.log(data);
  SubmitProps.resetForm();
  props.setCreate(false);
  // navigate('/mypost');

})
.catch(error => {
  console.error('Error:', error);
});


        },
        validationSchema:Yup.object({
            topic:Yup.string().required("Required"),
            title:Yup.string().required("Required"),
            // image:Yup.string().required("Required"),
            author:Yup.string().required("Required"),
            text:Yup.string().required("Required")
            
        })
    })



    return (
        <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='newpost'>





          <div className='field'>
          <label for="title">Title</label>
          <input type="text" placeholder="Enter the title" name="title" onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange}  />
          {formik.touched.title && formik.errors.title?<div className='error'>{formik.errors.title}</div>:null}
          </div>

          <div className='field'>
          <label for="topic">Topic</label>
          <input type="text" placeholder="Enter the topic" name="topic" onBlur={formik.handleBlur} value={formik.values.topic} onChange={formik.handleChange} />
            {formik.touched.topic && formik.errors.topic?<div className='error'>{formik.errors.topic}</div>:null}
            </div>

            <div className='field'>
            <label for="author">Author</label>
          <input type="text" placeholder="Enter the tuthor name" name="author" onBlur={formik.handleBlur} value={formik.values.author} onChange={formik.handleChange} />
            {formik.touched.author && formik.errors.author?<div className='error'>{formik.errors.author}</div>:null}
            </div>

            <div className='field'>
          <label for="image">Image</label>
          <input type="file" accept="image/*" id='image_input' placeholder="Enter the image url" name="image" onBlur={formik.handleBlur}   />
          </div>

          <div className='field'>
          <label for="text">Text</label>
          <textarea rows="10" cols="100" type="text" placeholder="Enter the text" name="text" onBlur={formik.handleBlur} value={formik.values.text} onChange={formik.handleChange}  />
          {formik.touched.text && formik.errors.text?<div className='error'>{formik.errors.text}</div>:null}
          </div>

          <button type="submit">Create</button>
          </div>
        </form>
      </div>
    )

}
export default Newpost;