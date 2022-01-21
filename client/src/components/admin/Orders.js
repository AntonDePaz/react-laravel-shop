
import axios from "axios"
import React, { useState} from "react"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";


const Orders = () => {

    const [loading,setLoading] = useState(true);
    const [orders, setOrders] = useState([]);



     useEffect( () => {
          document.title = 'View Orders';
        async function fetchMyAPI() {
           const response = await axios.get(`/api/orders`);

           console.log(response)
           if(response.status === 200){
            setOrders(response.data.orders)
           }
           setLoading(false)
        }
        fetchMyAPI()
    },[]);


   
    var td = '';
    if(loading){
        return <h3>Loading Category...</h3>
    }else{
        var no = 0;
        td = 
        orders.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{++no}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td><Link to={`/view-orders/${item.id}`} className="btn btn-primary btn-sm" >View</Link></td>
                   
                </tr>
            )   
        });
    }



   return (
       <div className="container">
        <div className="card">
            <div className="card-header mt-2">
                <h4>Orders List
                <Link to='/admin/add-product' className="btn btn-info btn-sm float-end">Add Product</Link>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tracking No</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>View</th>
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


export default Orders