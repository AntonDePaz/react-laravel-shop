
import axios from "axios"
import React, { useState} from "react"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";


const ViewCategory = () => {

    const [loading,setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);



     useEffect( () => {
        document.title = 'View Category';
        async function fetchMyAPI() {
           const response = await axios.get(`/api/view-category`);
           if(response.status === 200){
                setCategoryList(response.data.category)
           }
           setLoading(false)
        }
        fetchMyAPI()
    },[]);


    const deleteCategory = (e, id) => {
        e.preventDefault();
        const whenthisClick = e.currentTarget;
        whenthisClick.innerText = 'Deleting...';

        axios.delete(`/api/delete-category/${id}`).then( response => {

            if(response.data.status === 200){
                swal('Success',response.data.message,'success');
                whenthisClick.closest("tr").remove();
            }else{
                swal('Can\'t Delete Category',response.data.message,'error');
            }
        });


    }



    var td = '';
    if(loading){
        return <h3>Loading Category...</h3>
    }else{
        var no = 0;
        td = 
        categoryList.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{++no}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td><Link to={`edit-category/${item.id}`} className="btn btn-primary btn-sm" >Edit</Link></td>
                    <td><button type="button" className="btn btn-danger btn-sm" onClick={ (e) => deleteCategory(e,item.id)} >Delete</button></td>
                </tr>
            )   
        });
    }



   return (
       <div className="container">
        <div classNameName="card">
            <div className="card-header mt-2">
                <h4>Category List
                <Link to='/admin/category' className="btn btn-info btn-sm float-end">Add Category</Link>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {td}
                    </tbody>
                </table>
            </div>
        </div>
       </div>
   )
}


export default ViewCategory