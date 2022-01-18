
import axios from "axios"
import React, { useState} from "react"
import swal from "sweetalert";

const Dashboard = () => {

    const [category,setCategory] = useState({
        slug : '',
        description : '',
        name : '',
        status : false,
        meta_keyword : '',
        meta_description : '',
        meta_title :'',
        errors : []
    });

    const inputChange = (e) => {
        e.persist()

        setCategory({...category , [e.target.name] : e.target.value  })

    }

    const submitCategory = async  (e) => {
        e.preventDefault();
      const response = await axios.post(`/api/store-category`,category);
      console.log(response)
      if(response.data.status === 200){
        alert(response.data.messages)
        swal('Success',response.data.messages,'success');
        document.getElementById('category_form').reset();
        setCategory('');
      }else if(response.data.status === 400){
          setCategory({errors : response.data.validation_errors});
      }
    }


   return (
       <div className="container-fluid px-4 p-2">
         <h3 className="mt-4">Category</h3>
         <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo" type="button" role="tab" aria-controls="seo" aria-selected="false">SEO-TAGS</button>
            </li>
            
            </ul>
                <div className="tab-content" id="myTabContent">
                    {/* HOME */}
            <form onSubmit={submitCategory} id="category_form">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="col-md-4 offset-md-4 pt-4">
                    <div className="form-group mb-3">
                        <label>SLUG</label>
                        <input type='text' name="slug" onChange={inputChange} value={category.slug} className="form-control" />
                        <span className="text-danger" > { category.errors ? category.errors.slug : ''} </span>
                    
                    </div>
                    <div className="form-group mb-3">
                        <label>NAME</label>
                        <input type='text' name="name" onChange={inputChange} value={category.name} className="form-control" />
                        <span className="text-danger" > { category.errors ? category.errors.name : ''} </span>
                    </div>
                    <div className="form-group mb-3">
                        <label>DESCRIPTION</label>
                        <textarea name="description"  onChange={inputChange} value={category.description} className="form-control">
                       
                        </textarea>
                        <span className="text-danger" > { category.errors ? category.errors.description : ''} </span>
                    </div>
                    <div className="form-group mb-3">
                        <label>STATUS</label><br/>
                        <input type='checkbox' name="status" onChange={inputChange} checked={category.status} />hide/Shown
                    </div>


                    </div>
                </div>


                {/* SEO */}
                <div className="tab-pane fade" id="seo" role="tabpanel" aria-labelledby="seo-tab">
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
               
                <button type="submit" className="btn btn-primary btn-sm">SAVE</button>
               
                </form>
            </div>

       </div>
   )
}


export default Dashboard