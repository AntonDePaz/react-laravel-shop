
import axios from "axios"
import React, { useEffect, useState} from "react"
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const EditCategory = (props) => {

    const history = useHistory()
    const [loading,setLoading] = useState(true);

    const [category,setCategory]  = useState([]);
    const [error, setError] = useState();

    const inputChange = (e) => {
        e.persist();
        setCategory({...category , [e.target.name] : e.target.value  })

    }
   
    useEffect(() =>{
        const category_id = props.match.params.id; 
        axios.get(`/api/edit-category/${category_id}`).then(response =>{
            if(response.data.status === 200){
                setCategory(response.data.category);
            }else{
                swal('error',response.data.message,'error')
                history.push('/admin/view-category');
            }
            setLoading(false)
        })
    },[]);

    const updateCategory = async  (e) => {
        e.preventDefault();
       const category_id = props.match.params.id; 
      const response = await axios.put(`/api/update-category/${category_id}`,category);
      console.log(response)
      if(response.data.status === 200){
        swal('Success',response.data.message,'success');
        document.getElementById('category_form').reset();
        setCategory([]);
        history.push('/admin/view-category');
      }else if(response.data.status === 400){
        setError(response.data.validation_errors);
      }else{
          swal('error',response.data.message,'error');
          history.push('/admin/view-category');
      }
    }

    if(loading){
        return <h5>Loading...</h5>
    }


   return (
       <div className="container m-3">
         <h3 className="mt-4">Edit Category</h3>
           <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">HOME</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">META</button>
            </div>
            </nav>
            <form onSubmit={updateCategory} id="category_form">
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="col-md-4 offset-md-4 pt-4">
                        <div className="form-group mb-3">
                            <label>SLUG</label>
                            <input type='text' name="slug" onChange={inputChange} value={category.slug} className="form-control" />
                            <span className="text-danger" > { error ? error.slug : ''} </span>
                        
                        </div>
                        <div className="form-group mb-3">
                            <label>NAME</label>
                            <input type='text' name="name" onChange={inputChange} value={category.name} className="form-control" />
                            <span className="text-danger" > { error ? error.name : ''} </span>
                        </div>
                        <div className="form-group mb-3">
                            <label>DESCRIPTION</label>
                            <textarea name="description"  onChange={inputChange} value={category.description} className="form-control">
                        
                            </textarea>
                            <span className="text-danger" > { error ? error.description : ''} </span>
                        </div>
                        <div className="form-group mb-3">
                            <label>STATUS</label><br/>
                            <input type='checkbox' name="status" onChange={inputChange} checked={category.status} />hide/Shown
                        </div>


                        </div>
                </div>

                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div className="col-md-4 offset-md-4 pt-4">
                        <div className="form-group mb-3">
                            <label>META-TITLE</label>
                            <input type='text' name="meta_title" className="form-control" onChange={inputChange} value={category.meta_title}/>
                           
                        </div>
                        <div className="form-group mb-3">
                            <label>META-KEYWORD</label>
                            <textarea name="meta_keyword" className="form-control" onChange={inputChange} value={category.meta_keyword}>
                            </textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>META-DESCRIPTION</label>
                            <textarea name="meta_description" className="form-control" onChange={inputChange} value={category.meta_description}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 offset-md-4 pt-4">
            <button type="submit" className="btn btn-info btn-block">UPDATE</button>
            </div>
            </form>
       </div>
   )
}


export default EditCategory