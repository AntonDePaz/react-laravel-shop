import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import swal from "sweetalert";

function ViewCategory() {


    const [category,setCategory] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(`/api/get_category`).then((res)=>{
            if(res.data.status === 200){
                console.log(res.data.category);
                setCategory(res.data.category);
            }else{
                swal('Error','Something went wrong','error')
            }   
            setLoading(false)
        });
    },[]);

    if(loading){
       return <h5>Loading...</h5>
    }else{
        var showCategoryList = '';

        showCategoryList = category.map((item, index)=>{
            return (
                <div className="col-md-4" key={index}>
                    <div className="card">
                        <Link to=''>
                            <img src="" alt={item.name} />
                        </Link>
                        <div className="card-body">
                            <Link to={`/collections/${item.slug}`} >
                                <h5>{item.name}</h5>
                            </Link>
                       
                        </div>
                    </div>
                </div>
            )

        })
    }





    return (
        <div>
           <div className="py-3 bg-warning">
               <div className="container">
                    <h6>Category Page</h6>
               </div>
           </div>
           <div className="py-3">
               <div className="container">
                    <div className="row">
                        {showCategoryList}
                    </div>
               </div>
           </div>
        </div>
    )
}



export default ViewCategory

