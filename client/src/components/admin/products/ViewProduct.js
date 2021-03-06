
import axios from "axios"
import React, { useState} from "react"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";


const ViewProduct = () => {

    const [loading,setLoading] = useState(true);
    const [productList, setProductList] = useState([]);



     useEffect( () => {
          document.title = 'View Product';
        async function fetchMyAPI() {
           const response = await axios.get(`/api/view-product`);
           if(response.status === 200){
            setProductList(response.data.products)
           }
           setLoading(false)
        }
        fetchMyAPI()
    },[]);


    const deleteCategory = (e, id) => {
        e.preventDefault();
        // const whenthisClick = e.currentTarget;
        // whenthisClick.innerText = 'Deleting...';

        // axios.delete(`/api/delete-category/${id}`).then( response => {

        //     if(response.data.status === 200){
        //         swal('Success',response.data.message,'success');
        //         whenthisClick.closest("tr").remove();
        //     }else{
        //         swal('Can\'t Delete Category',response.data.message,'error');
        //     }
        // });


    }



    var td = '';
    if(loading){
        return <h3>Loading Product...</h3>
    }else{
        var no = 0;
        var productStatus = '';
        td = 
        productList.map((item) => {
            console.log(item);
            if(item.status === 0){
                productStatus = 'Shown';
            }else{
                productStatus = 'Hidden';
            }   
            return (
                <tr key={item.id}>
                    <td>{++no}</td>
                    <td>{item.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td> <img src={`http://localhost:8000/${item.image}`} alt={item.name} width='50' /> </td>
                    <td> {productStatus}  </td>
                    <td><Link to={`edit-product/${item.id}`} className="btn btn-primary btn-sm" >Edit</Link></td>
                   
                </tr>
            )   
        });
    }



   return (
       <div className="container">
        <div className="card">
            <div className="card-header mt-2">
                <h4>Product List
                <Link to='/admin/add-product' className="btn btn-info btn-sm float-end">Add Product</Link>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Product Name</th>
                            <th>Selling Price</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Edit</th>
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


export default ViewProduct